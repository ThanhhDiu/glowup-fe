import {
  BadgeCheck,
  ClipboardList,
  CreditCard,
  LogOut,
  Shield,
  Star,
  UserRound,
} from 'lucide-react';
import type { SettingsNavItem } from '../types';

export const customerSettingsPageMap: Record<string, string> = {
  home: '/',
  'find-provider': '/find-provider',
  'customer-settings': '/customer/account-settings',
  login: '/auth/login',
};

export const customerSettingsNavItems = [
  { key: 'home', label: 'Trang chủ', page: 'home' },
  { key: 'find-provider', label: 'Dịch vụ', page: 'find-provider' },
  { key: 'account', label: 'Tài khoản', page: 'customer-settings' },
];

export const customerSettingsSidebarItems: SettingsNavItem[] = [
  { id: 'personal', label: 'Thông tin cá nhân', icon: <UserRound size={18} /> },
  { id: 'security', label: 'Đổi mật khẩu', icon: <Shield size={18} /> },
  { id: 'wallet', label: 'Đơn hàng', icon: <ClipboardList size={18} /> },
  { id: 'logout', label: 'Đăng xuất', icon: <LogOut size={18} />, tone: 'danger' },
];

export const customerSettingsInsightItems = [
  {
    id: 'verified-account',
    icon: <BadgeCheck size={22} />,
    title: 'Tài khoản xác minh',
    text: 'Hồ sơ đã được xác nhận chính chủ, giúp việc đặt thợ và hỗ trợ sau dịch vụ diễn ra nhanh hơn.',
  },
  {
    id: 'booking-history',
    icon: <CreditCard size={22} />,
    title: 'Lịch sử đặt chỗ',
    text: 'Theo dõi các lần đặt dịch vụ gần đây và quản lý hóa đơn ngay trong một không gian tập trung.',
  },
  {
    id: 'member-tier',
    icon: <Star size={22} />,
    title: 'Hạng thành viên',
    text: 'Bạn đang ở hạng Kim cương với ưu đãi ưu tiên hỗ trợ và gợi ý kỹ thuật viên phù hợp hơn.',
  },
];
