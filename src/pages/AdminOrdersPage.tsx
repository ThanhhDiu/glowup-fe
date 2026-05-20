import React, { useEffect, useMemo, useState } from 'react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { OrderTable, type OrderTableItem } from '../components/orderManagement/OrderTable';
import AdminOrderDetailDrawer from '../components/orderManagement/AdminOrderDetailDrawer';
import {
  getAdminOrders,
  getOrderDetail,
  getOrderStats,
  type OrderDetailViewModel,
  type OrderStatsSummary,
  type OrderTableRow,
  type OrderTableItem as OrderTableItemFromService,
} from '../services/orderService';
import './AdminOrdersPage.css';

const STATUS_TABS = ['Tất cả', 'NEW', 'ASSIGNED', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const;
type StatusTab = (typeof STATUS_TABS)[number];

const DEFAULT_STATS: OrderStatsSummary = {
  totalOrders: 0,
  processing: 0,
  completed: 0,
  cancelled: 0,
  disputes: 0,
  pendingPriceReview: 0,
};

const formatDateForFilter = (value?: string | null): Date | null => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const parsePrice = (value?: string | null): number => {
  if (!value) return 0;
  const normalized = value.replace(/[^\d]/g, '');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const isWithinTimeFilter = (order: OrderTableRow, filter: string): boolean => {
  if (filter === 'Tất cả') return true;

  const baseDate = formatDateForFilter(order.rawScheduledAt || order.rawCreatedAt);
  if (!baseDate) return true;

  const now = new Date();
  const diffMs = now.getTime() - baseDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (filter === 'Hôm nay') {
    return now.toDateString() === baseDate.toDateString();
  }

  if (filter === '7 ngày') {
    return diffDays >= 0 && diffDays <= 7;
  }

  if (filter === '30 ngày') {
    return diffDays >= 0 && diffDays <= 30;
  }

  return true;
};

const isWithinPriceFilter = (order: OrderTableRow, filter: string): boolean => {
  if (filter === 'Tất cả') return true;

  const price = order.rawPrice ?? parsePrice(order.price);
  if (filter === 'Dưới 300k') return price < 300000;
  if (filter === '300k - 500k') return price >= 300000 && price <= 500000;
  if (filter === 'Trên 500k') return price > 500000;

  return true;
};

const AdminOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StatusTab>('Tất cả');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [timeFilter, setTimeFilter] = useState('Tất cả');
  const [paymentFilter, setPaymentFilter] = useState('Tất cả');
  const [technicianFilter, setTechnicianFilter] = useState('Tất cả');
  const [areaFilter, setAreaFilter] = useState('Tất cả');
  const [priceFilter, setPriceFilter] = useState('Tất cả');
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [orders, setOrders] = useState<OrderTableRow[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const [stats, setStats] = useState<OrderStatsSummary>(DEFAULT_STATS);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<OrderDetailViewModel | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchText.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      try {
        setStatsLoading(true);
        setStatsError(null);
        const nextStats = await getOrderStats();
        if (!active) return;
        setStats(nextStats);
      } catch (error: any) {
        if (!active) return;
        setStats(DEFAULT_STATS);
        setStatsError(error?.message || 'Không thể tải thống kê đơn hàng');
      } finally {
        if (active) {
          setStatsLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadOrders = async () => {
      try {
        setOrdersLoading(true);
        setOrdersError(null);

        const serverStatus = activeTab !== 'Tất cả'
          ? activeTab
          : statusFilter !== 'Tất cả'
            ? statusFilter
            : undefined;

        const result = await getAdminOrders({
          status: serverStatus as any,
          keyword: debouncedSearch || undefined,
          page: currentPage,
          limit: itemsPerPage,
        });

        if (!active) return;

        setTotalItems(result.totalElements);
        const nextOrders = result.items.filter((order) => {
          if (!isWithinTimeFilter(order, timeFilter)) return false;
          if (paymentFilter !== 'Tất cả' && order.rawPaymentMethod?.toUpperCase() !== paymentFilter.toUpperCase()) return false;
          if (technicianFilter !== 'Tất cả' && order.rawTechnician !== technicianFilter) return false;
          if (areaFilter !== 'Tất cả' && order.rawArea !== areaFilter) return false;
          if (!isWithinPriceFilter(order, priceFilter)) return false;
          return true;
        });

        setOrders(nextOrders);
        setSelectedIds((current) => current.filter((id) => nextOrders.some((order) => order.id === id)));
      } catch (error: any) {
        if (!active) return;
        setOrders([]);
        setOrdersError(error?.message || 'Không thể tải danh sách đơn hàng');
      } finally {
        if (active) {
          setOrdersLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      active = false;
    };
  }, [activeTab, areaFilter, debouncedSearch, paymentFilter, priceFilter, statusFilter, technicianFilter, timeFilter, currentPage, itemsPerPage]);

  const filteredTechnicians = useMemo(() => {
    return ['Tất cả', ...Array.from(new Set(orders.map((order) => order.rawTechnician).filter(Boolean) as string[]))];
  }, [orders]);

  const filteredAreas = useMemo(() => {
    return ['Tất cả', ...Array.from(new Set(orders.map((order) => order.rawArea).filter(Boolean) as string[]))];
  }, [orders]);

  const paymentOptions = useMemo(() => {
    return ['Tất cả', ...Array.from(new Set(orders.map((order) => order.rawPaymentMethod).filter(Boolean) as string[]))];
  }, [orders]);

  const visibleOrders = orders;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const openOrderDetail = async (order: OrderTableRow) => {
    setSelectedCode(order.id);
    setSelectedDetail(null);
    setDetailError(null);
    setDetailLoading(true);

    try {
      const detail = await getOrderDetail(order.id);
      setSelectedDetail(detail);
    } catch (error: any) {
      setDetailError(error?.message || 'Không thể tải chi tiết đơn hàng');
      setSelectedDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const reloadSelectedDetail = async () => {
    if (!selectedCode) return;

    setSelectedDetail(null);
    setDetailError(null);
    setDetailLoading(true);

    try {
      const detail = await getOrderDetail(selectedCode);
      setSelectedDetail(detail);
    } catch (error: any) {
      setDetailError(error?.message || 'Không thể tải chi tiết đơn hàng');
      setSelectedDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDrawer = () => {
    setSelectedCode(null);
    setSelectedDetail(null);
    setDetailLoading(false);
    setDetailError(null);
  };

  const retryOrderList = async () => {
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const serverStatus = activeTab !== 'Tất cả'
        ? activeTab
        : statusFilter !== 'Tất cả'
          ? statusFilter
          : undefined;

      const result = await getAdminOrders({
        status: serverStatus as any,
        keyword: debouncedSearch || undefined,
        page: currentPage,
        limit: itemsPerPage,
      });

      setTotalItems(result.totalElements);

      const nextOrders = result.items.filter((order) => {
        if (!isWithinTimeFilter(order, timeFilter)) return false;
        if (paymentFilter !== 'Tất cả' && order.rawPaymentMethod?.toUpperCase() !== paymentFilter.toUpperCase()) return false;
        if (technicianFilter !== 'Tất cả' && order.rawTechnician !== technicianFilter) return false;
        if (areaFilter !== 'Tất cả' && order.rawArea !== areaFilter) return false;
        if (!isWithinPriceFilter(order, priceFilter)) return false;
        return true;
      });

      setOrders(nextOrders);
    } catch (error: any) {
      setOrdersError(error?.message || 'Không thể tải danh sách đơn hàng');
    } finally {
      setOrdersLoading(false);
    }
  };

  const totalOrders = statsLoading ? '...' : stats.totalOrders.toLocaleString('vi-VN');
  const processingOrders = statsLoading ? '...' : stats.processing.toLocaleString('vi-VN');
  const completedOrders = statsLoading ? '...' : stats.completed.toLocaleString('vi-VN');
  const cancelledOrders = statsLoading ? '...' : stats.cancelled.toLocaleString('vi-VN');
  const disputesOrders = statsLoading ? '...' : stats.disputes.toLocaleString('vi-VN');
  const pendingPriceReviewOrders = statsLoading ? '...' : stats.pendingPriceReview.toLocaleString('vi-VN');

  const statSkeleton = <div style={{ height: 22, width: '55%', borderRadius: 8, background: 'linear-gradient(90deg, #e2e8f0 25%, #f8fafc 37%, #e2e8f0 63%)' }} />;

  const renderOrderTable = () => {
    if (ordersLoading) {
      return (
        <div className="order-table-shell" aria-busy="true">
          <table className="order-table">
            <thead>
              <tr>
                <th className="order-table__checkbox-cell" />
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Dịch vụ</th>
                <th>Thợ kỹ thuật</th>
                <th>Trạng thái</th>
                <th>Giá</th>
                <th>Lịch hẹn</th>
                <th>Tạo lúc</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={`order-skeleton-${index}`}>
                  <td className="order-table__checkbox-cell"><div style={{ width: 14, height: 14, borderRadius: 4, background: '#e2e8f0' }} /></td>
                  {Array.from({ length: 9 }).map((__, cellIndex) => (
                    <td key={cellIndex}>
                      <div style={{ height: 16, width: cellIndex === 5 ? 92 : '75%', borderRadius: 8, background: '#e2e8f0' }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <OrderTable
        orders={visibleOrders}
        selectedIds={selectedIds}
        onToggleAll={(checked) => setSelectedIds(checked ? visibleOrders.map((order) => order.id) : [])}
        onToggleRow={(id, checked) => {
          setSelectedIds((current) => (checked ? Array.from(new Set([...current, id])) : current.filter((item) => item !== id)));
        }}
        onView={openOrderDetail}
      />
    );
  };

  return (
    <div className="acp-layout">
      <AdminSidebar activeItem="orders" />
      <main className="acp-main">
        <AdminHeader />

        <div className="acp-header-row">
          <div>
            <h1>Quản lý đơn hàng</h1>
          </div>
        </div>

        {(ordersError || statsError) && (
          <div style={{ marginBottom: 16, padding: '12px 14px', borderRadius: 10, background: '#fee2e2', color: '#991b1b' }}>
            {ordersError || statsError}
            <button type="button" onClick={retryOrderList} style={{ marginLeft: 12, border: 'none', background: 'transparent', color: '#991b1b', fontWeight: 700, cursor: 'pointer' }}>
              Thử lại
            </button>
          </div>
        )}

        <section className="orders-stats-row">
          {statsLoading
            ? Array.from({ length: 6 }).map((_, index) => (
              <div key={`stat-skeleton-${index}`} className="stat-card" style={{ minHeight: 74, position: 'relative', overflow: 'hidden' }}>
                <div className="stat-title" style={{ opacity: 0.5 }}>Đang tải...</div>
                {statSkeleton}
              </div>
            ))
            : (
              <>
                <div className="stat-card"><div className="stat-title">Tổng đơn hàng</div><div className="stat-value">{totalOrders}</div></div>
                <div className="stat-card"><div className="stat-title">Đang xử lý</div><div className="stat-value">{processingOrders}</div></div>
                <div className="stat-card"><div className="stat-title">Hoàn thành</div><div className="stat-value">{completedOrders}</div></div>
                <div className="stat-card"><div className="stat-title">Đã hủy</div><div className="stat-value">{cancelledOrders}</div></div>
                <div className="stat-card"><div className="stat-title">Tranh chấp</div><div className="stat-value">{disputesOrders}</div></div>
                <div className="stat-card"><div className="stat-title">Chờ duyệt giá</div><div className="stat-value">{pendingPriceReviewOrders}</div></div>
              </>
            )}
        </section>

        <section className="orders-controls">
          

          <div className="filters-row">
            <div className="filter-item">
              <label>Trạng thái</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>Tất cả</option>
                <option>NEW</option>
                <option>ASSIGNED</option>
                <option>SCHEDULED</option>
                <option>IN_PROGRESS</option>
                <option>COMPLETED</option>
                <option>CANCELLED</option>
              </select>
            </div>
            <div className="filter-item">
              <label>Thời gian</label>
              <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}><option>Tất cả</option><option>Hôm nay</option><option>7 ngày</option><option>30 ngày</option></select>
            </div>
            <div className="filter-item">
              <label>Thanh toán</label>
              <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
                {paymentOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>Thợ kỹ thuật</label>
              <select value={technicianFilter} onChange={(e) => setTechnicianFilter(e.target.value)}>
                {filteredTechnicians.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>Khu vực</label>
              <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)}>
                {filteredAreas.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>Mức giá</label>
              <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}><option>Tất cả</option><option>Dưới 300k</option><option>300k - 500k</option><option>Trên 500k</option></select>
            </div>
            <div className="orders-search-wrap">
              <input
                className="orders-search"
                placeholder="Tìm kiếm đơn hàng..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="orders-main">
          <div className="orders-left">
            {renderOrderTable()}
            {!ordersLoading && orders.length > 0 && (
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: 6,
                    background: currentPage === 1 ? '#f1f5f9' : '#fff',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  ← Trước
                </button>
                <span style={{ padding: '0 8px', color: '#64748b', fontSize: 14 }}>
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: 6,
                    background: currentPage >= totalPages ? '#f1f5f9' : '#fff',
                    cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage >= totalPages ? 0.5 : 1,
                  }}
                >
                  Sau →
                </button>
              </div>
            )}
          </div>

          {/* <div className="orders-right" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
            <AdminOrderDetailDrawer
              detail={selectedDetail}
              loading={detailLoading}
              error={detailError}
              onClose={closeDrawer}
              onRetry={reloadSelectedDetail}
            />
          </div> */}
        </section>
      </main>
    </div>
  );
};

export default AdminOrdersPage;
