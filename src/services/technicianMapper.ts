import type { Technician } from './providerService'

export type TechnicianBadge = 'DIAMOND' | 'PLATINUM' | 'GOLD'

export interface TechnicianBadgeInfo {
  badge: TechnicianBadge
  badgeLabel: string
}

export interface ExpertCardView {
  id: string
  name: string
  title: string
  rating: number
  experience: string
  completedJobs: string
  badge: TechnicianBadge
  badgeLabel: string
  imageUrl: string
}

export interface NormalProviderCardView {
  type: 'normal'
  id: string
  name: string
  avatar: string
  rating: number
  reviewCount: number
  location: string
  skills: string[]
  price: string
  isAvailable: boolean
  timeAvailable?: string
}

export interface PremiumProviderCardView {
  type: 'premium'
  id: string
  name: string
  avatar: string
  titleBadge: string
  description: string
  rating: number
  reviewCount: number
  location: string
  skills: string[]
  isAvailable: boolean
  timeAvailable?: string
}

export type ProviderListItemView = NormalProviderCardView | PremiumProviderCardView

const badgeLabels: Record<TechnicianBadge, string> = {
  DIAMOND: 'CHUYÊN GIA KIM CƯƠNG',
  PLATINUM: 'CHUYÊN GIA BẠCH KIM',
  GOLD: 'CHUYÊN GIA VÀNG',
}

export const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) return 'Liên hệ'
  return `${new Intl.NumberFormat('vi-VN').format(value)}đ`
}

export const determineTechnicianBadge = (technician: Technician): TechnicianBadgeInfo => {
  if (technician.type === 'premium' || technician.titleBadge) {
    return {
      badge: 'DIAMOND',
      badgeLabel: technician.titleBadge || 'CHUYÊN GIA NỔI BẬT',
    }
  }

  const rating = Number(technician.rating || 0)
  const completedJobs = Number(technician.completedJobs || 0)

  if (rating >= 4.9 && completedJobs >= 1000) {
    return {
      badge: 'DIAMOND',
      badgeLabel: badgeLabels.DIAMOND,
    }
  }

  if (rating >= 4.7 && completedJobs >= 500) {
    return {
      badge: 'PLATINUM',
      badgeLabel: badgeLabels.PLATINUM,
    }
  }

  return {
    badge: 'GOLD',
    badgeLabel: badgeLabels.GOLD,
  }
}

export const mapTechnicianToExpertCard = (technician: Technician, fallbackIndex: number): ExpertCardView => {
  const badgeInfo = determineTechnicianBadge(technician)

  return {
    id: technician.id || fallbackIndex.toString(),
    name: technician.fullName,
    title: technician.skills?.[0] || 'Kỹ thuật viên',
    rating: Number(technician.rating || 0),
    experience: `${technician.completedJobs} đơn hoàn thành`,
    completedJobs: technician.completedJobs.toString(),
    badge: badgeInfo.badge,
    badgeLabel: badgeInfo.badgeLabel,
    imageUrl: technician.avatar,
  }
}

export const mapTechnicianToProviderListItem = (technician: Technician): ProviderListItemView => {
  const location = technician.location || technician.district || 'TP. Hồ Chí Minh'
  const avatar = technician.avatar || 'https://placehold.co/150x150'
  const isPremium = technician.type === 'premium' || !!technician.titleBadge || (Number(technician.rating || 0) >= 4.8 && Number(technician.completedJobs || 0) >= 500)

  if (isPremium) {
    const badgeInfo = determineTechnicianBadge(technician)

    return {
      type: 'premium',
      id: technician.id,
      name: technician.fullName,
      avatar,
      titleBadge: badgeInfo.badgeLabel,
      description: `${technician.skills?.[0] || 'Kỹ thuật viên'} • ${technician.completedJobs.toLocaleString('vi-VN')} đơn hoàn thành`,
      rating: Number(technician.rating || 0),
      reviewCount: Number(technician.reviewCount || 0),
      location,
      skills: technician.skills || [],
      isAvailable: technician.isAvailable ?? true,
      timeAvailable: technician.timeAvailable,
    }
  }

  return {
    type: 'normal',
    id: technician.id,
    name: technician.fullName,
    avatar,
    rating: Number(technician.rating || 0),
    reviewCount: Number(technician.reviewCount || 0),
    location,
    skills: technician.skills || [],
    price: formatCurrency(technician.pricePerHour),
    isAvailable: technician.isAvailable ?? true,
    timeAvailable: technician.timeAvailable,
  }
}