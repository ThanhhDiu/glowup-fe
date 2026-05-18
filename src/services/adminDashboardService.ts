import { API_URL, fetchWithAuth } from './auth'
import type { DashboardTimeFilter } from '../types/DashboardTimeFilter.ts'

interface ApiResponse<T> {
  success: boolean
  data: T
  error?: {
    code?: string
    message?: string
  }
}

interface AdminMetricApi {
  value: number | string
  change: number | string
  changeDirection: 'up' | 'down' | 'neutral' | string
}

interface AdminStatsApi {
  totalRevenue: AdminMetricApi
  totalProfit: AdminMetricApi
  activeTechnicians: AdminMetricApi
  ordersToday: AdminMetricApi
}

interface RevenueItemApi {
  label: string
  value: number | string
  date: string
}

interface RevenueStatsApi {
  range: string
  items: RevenueItemApi[]
}

interface ServiceDistributionItemApi {
  name: string
  percentage: number | string
  color: string
}

interface ServiceDistributionApi {
  items: ServiceDistributionItemApi[]
}

interface RecentOrderPersonApi {
  fullName: string
}

interface RecentOrderItemApi {
  id: string
  customer: RecentOrderPersonApi
  technician: RecentOrderPersonApi
  serviceName: string
  status: string
  scheduledAt: string
  amount: number | string
}

interface RecentOrdersApi {
  items: RecentOrderItemApi[]
}

export interface DashboardStatCardData {
  title: string
  value: string
  change: string
  changeDirection: 'up' | 'down' | 'neutral'
}

export interface RevenueChartDataPoint {
  day: string
  value: number
  max: number
}

export interface ServiceDistributionDataPoint {
  name: string
  percentage: number
  color: string
}

export interface RecentOrderTableItem {
  id: string
  customer: string
  service: string
  provider: string
  status: 'Đã hoàn thành' | 'Đang xử lý' | 'Chờ xác nhận'
  date: string
  amount: string
}

export interface AdminDashboardData {
  stats: DashboardStatCardData[]
  revenue: RevenueChartDataPoint[]
  services: ServiceDistributionDataPoint[]
  recentOrders: RecentOrderTableItem[]
}

const formatCurrency = (value: number): string => {
  return `${Math.round(value).toLocaleString('vi-VN')}₫`
}

const formatPercent = (value: number): string => {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

const parseNumber = (value: number | string | null | undefined): number => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0
  }
  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

const normalizeDirection = (direction: string): 'up' | 'down' | 'neutral' => {
  if (direction === 'up' || direction === 'down' || direction === 'neutral') {
    return direction
  }
  return 'neutral'
}

const toRevenueRange = (filter: DashboardTimeFilter): string => {
  if (filter.mode === 'month') {
    const daysInMonth = new Date(filter.year, filter.month, 0).getDate()
    return `${daysInMonth}days`
  }

  if (filter.mode === 'quarter') {
    return '90days'
  }

  if (filter.mode === 'year') {
    return '90days'
  }

  return '90days'
}

const mapMetric = (title: string, metric?: AdminMetricApi): DashboardStatCardData => {
  const value = parseNumber(metric?.value)
  const change = parseNumber(metric?.change)
  const direction = normalizeDirection(metric?.changeDirection || 'neutral')

  const valueText = title === 'Số thợ hoạt động' || title === 'Đơn hàng hôm nay'
    ? Math.round(value).toLocaleString('vi-VN')
    : formatCurrency(value)

  return {
    title,
    value: valueText,
    change: formatPercent(change),
    changeDirection: direction,
  }
}

const mapStats = (stats: AdminStatsApi): DashboardStatCardData[] => {
  return [
    mapMetric('Tổng doanh thu', stats.totalRevenue),
    mapMetric('Tổng lợi nhuận', stats.totalProfit),
    mapMetric('Số thợ hoạt động', stats.activeTechnicians),
    mapMetric('Đơn hàng hôm nay', stats.ordersToday),
  ]
}

const aggregateRevenueByMonth = (items: RevenueItemApi[]): RevenueChartDataPoint[] => {
  const monthMap = new Map<string, number>()

  items.forEach((item) => {
    const date = new Date(item.date)
    if (Number.isNaN(date.getTime())) {
      return
    }
    const key = `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
    monthMap.set(key, (monthMap.get(key) || 0) + parseNumber(item.value))
  })

  const points = Array.from(monthMap.entries()).map(([label, value]) => ({ day: label, value, max: 0 }))
  const maxValue = Math.max(...points.map((point) => point.value), 1)

  return points.map((point) => ({
    ...point,
    value: Math.round((point.value / maxValue) * 100),
    max: 100,
  }))
}

const aggregateRevenueByWeekChunk = (items: RevenueItemApi[]): RevenueChartDataPoint[] => {
  if (items.length === 0) {
    return []
  }

  const chunkSize = Math.ceil(items.length / 4)
  const chunks: RevenueChartDataPoint[] = []

  for (let i = 0; i < 4; i += 1) {
    const start = i * chunkSize
    const end = start + chunkSize
    const chunk = items.slice(start, end)
    if (chunk.length === 0) {
      continue
    }

    const total = chunk.reduce((sum, item) => sum + parseNumber(item.value), 0)
    chunks.push({ day: `Tuần ${i + 1}`, value: total, max: 0 })
  }

  const maxValue = Math.max(...chunks.map((point) => point.value), 1)

  return chunks.map((point) => ({
    ...point,
    value: Math.round((point.value / maxValue) * 100),
    max: 100,
  }))
}

const mapRevenue = (revenue: RevenueStatsApi, filter: DashboardTimeFilter): RevenueChartDataPoint[] => {
  const sortedItems = [...(revenue.items || [])].sort((a, b) => a.date.localeCompare(b.date))

  if (filter.mode === 'month') {
    return aggregateRevenueByWeekChunk(sortedItems)
  }

  if (filter.mode === 'quarter') {
    const monthlyPoints = aggregateRevenueByMonth(sortedItems)
    return monthlyPoints.slice(-3)
  }

  return aggregateRevenueByMonth(sortedItems)
}

const mapServices = (services: ServiceDistributionApi): ServiceDistributionDataPoint[] => {
  return (services.items || []).map((item) => ({
    name: item.name,
    percentage: parseNumber(item.percentage),
    color: item.color || '#3b82f6',
  }))
}

const mapOrderStatus = (status: string): 'Đã hoàn thành' | 'Đang xử lý' | 'Chờ xác nhận' => {
  const normalized = (status || '').toLowerCase()

  if (['completed', 'done', 'success'].includes(normalized)) {
    return 'Đã hoàn thành'
  }

  if (['in_progress', 'processing', 'accepted'].includes(normalized)) {
    return 'Đang xử lý'
  }

  return 'Chờ xác nhận'
}

const formatOrderDate = (dateTime: string): string => {
  if (!dateTime) {
    return '--'
  }

  const date = new Date(dateTime)
  if (Number.isNaN(date.getTime())) {
    return dateTime
  }

  return date.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  })
}

const mapRecentOrders = (orders: RecentOrdersApi): RecentOrderTableItem[] => {
  return (orders.items || []).map((item) => ({
    id: item.id,
    customer: item.customer?.fullName || 'N/A',
    service: item.serviceName || 'N/A',
    provider: item.technician?.fullName || 'N/A',
    status: mapOrderStatus(item.status),
    date: formatOrderDate(item.scheduledAt),
    amount: formatCurrency(parseNumber(item.amount)),
  }))
}

const requestApi = async <T>(path: string): Promise<T> => {
  const response = await fetchWithAuth(`${API_URL}${path}`, { method: 'GET' })
  const data: ApiResponse<T> = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.error?.message || 'Không thể tải dữ liệu dashboard')
  }

  return data.data
}

export const getAdminDashboardData = async (timeFilter: DashboardTimeFilter): Promise<AdminDashboardData> => {
  const revenueRange = toRevenueRange(timeFilter)

  const [stats, revenue, services, recentOrders] = await Promise.all([
    requestApi<AdminStatsApi>('/admin/stats'),
    requestApi<RevenueStatsApi>(`/admin/stats/revenue?range=${encodeURIComponent(revenueRange)}`),
    requestApi<ServiceDistributionApi>('/admin/stats/service-distribution'),
    requestApi<RecentOrdersApi>('/admin/orders/recent?limit=5'),
  ])

  return {
    stats: mapStats(stats),
    revenue: mapRevenue(revenue, timeFilter),
    services: mapServices(services),
    recentOrders: mapRecentOrders(recentOrders),
  }
}
