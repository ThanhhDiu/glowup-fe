import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BadgeCheck,
  CreditCard,
  LogOut,
  Save,
  Shield,
  Star,
  Trash2,
  UploadCloud,
  UserRound,
} from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { HeaderLogged } from '../components/layout/HeaderLogged';
import {
  DeleteAccountModal,
  SettingsCard,
  SettingsDangerZone,
  SettingsInsightCard,
  SettingsSidebarCard,
  SettingsTextField,
  SettingsTextareaField,
} from '../components/settings/SettingsUI';
import type { SettingsNavItem } from '../components/settings/SettingsUI';

const pageMap: Record<string, string> = {
  home: '/',
  'find-provider': '/find-provider',
  'customer-settings': '/customer/settings',
  login: '/auth/login',
};

const navItems = [
  { key: 'home', label: 'Trang chủ', page: 'home' },
  { key: 'find-provider', label: 'Dịch vụ', page: 'find-provider' },
  { key: 'account', label: 'Tài khoản', page: 'customer-settings' },
];

const sidebarItems: SettingsNavItem[] = [
  { id: 'personal', label: 'Thông tin cá nhân', icon: <UserRound size={18} /> },
  { id: 'security', label: 'Đổi mật khẩu', icon: <Shield size={18} /> },
  { id: 'wallet', label: 'Ví & thanh toán', icon: <CreditCard size={18} /> },
  { id: 'logout', label: 'Đăng xuất', icon: <LogOut size={18} />, tone: 'danger' },
];

export default function CustomerAccountSettingsPage() {
  const navigate = useNavigate();
  const [activeSidebarItem, setActiveSidebarItem] = useState('personal');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: 'Trần Thị Lan',
    phone: '090 123 4567',
    email: 'lan.tran@email.com',
    address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
  });

  const onNavigate = (page: string) => {
    navigate(pageMap[page] || '/');
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="settings-page settings-page--customer">
      <HeaderLogged
        onNavigate={onNavigate}
        navItems={navItems}
        activeNavKey="account"
        profilePage="customer-settings"
        searchPlaceholder="Tìm kiếm dịch vụ..."
      />

      <main className="settings-frame">
        <SettingsSidebarCard
          avatar="https://i.pravatar.cc/160?img=47"
          name="Trần Thị Lan"
          meta="ID: KH-9921"
          items={sidebarItems}
          activeItem={activeSidebarItem}
          onSelect={(id) => {
            if (id === 'logout') {
              onNavigate('login');
              return;
            }

            setActiveSidebarItem(id);
          }}
        />

        <div className="settings-main">
          <SettingsCard
            title="Cài đặt tài khoản"
            subtitle="Quản lý bảo mật và dữ liệu cá nhân để trải nghiệm dịch vụ luôn nhất quán, rõ ràng và an tâm hơn."
            eyebrow={
              <>
                <BadgeCheck size={18} />
                Hồ sơ khách hàng
              </>
            }
            actions={
              <button type="button" className="settings-ghost-button">
                <UploadCloud size={18} />
                Tải ảnh lên
              </button>
            }
          >
            <div className="settings-grid settings-grid--two">
              <SettingsTextField
                label="Họ tên"
                value={form.fullName}
                onChange={(value) => updateField('fullName', value)}
              />
              <SettingsTextField
                label="Số điện thoại"
                value={form.phone}
                onChange={(value) => updateField('phone', value)}
              />
              <SettingsTextField
                label="Email"
                value={form.email}
                onChange={(value) => updateField('email', value)}
                fullWidth
              />
              <SettingsTextareaField
                label="Địa chỉ mặc định"
                value={form.address}
                onChange={(value) => updateField('address', value)}
                fullWidth
              />
            </div>

            <div className="settings-actions">
              <button type="button" className="settings-primary-button">
                <Save size={18} />
                Lưu thay đổi
              </button>
            </div>
          </SettingsCard>

          <SettingsDangerZone
            title="Xóa tài khoản"
            text="Sau khi xóa, lịch sử đơn hàng, địa chỉ đã lưu và cài đặt cá nhân sẽ không thể khôi phục. Đây là bước xác nhận cuối cùng trước khi gửi yêu cầu xóa."
            action={
              <button type="button" className="settings-danger-button" onClick={() => setDeleteOpen(true)}>
                <Trash2 size={18} />
                Xóa tài khoản
              </button>
            }
          />

          <div className="settings-insights">
            <SettingsInsightCard
              icon={<BadgeCheck size={22} />}
              title="Tài khoản xác minh"
              text="Hồ sơ đã được xác nhận chính chủ, giúp việc đặt thợ và hỗ trợ sau dịch vụ diễn ra nhanh hơn."
            />
            <SettingsInsightCard
              icon={<CreditCard size={22} />}
              title="Lịch sử đặt chỗ"
              text="Theo dõi các lần đặt dịch vụ gần đây và quản lý hóa đơn ngay trong một không gian tập trung."
            />
            <SettingsInsightCard
              icon={<Star size={22} />}
              title="Hạng thành viên"
              text="Bạn đang ở hạng Kim cương với ưu đãi ưu tiên hỗ trợ và gợi ý kỹ thuật viên phù hợp hơn."
            />
          </div>
        </div>
      </main>

      <DeleteAccountModal
        open={deleteOpen}
        message="Bạn có chắc chắn? Toàn bộ lịch sử đơn hàng, ví và dữ liệu liên quan sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác."
        onConfirm={() => setDeleteOpen(false)}
        onCancel={() => setDeleteOpen(false)}
      />

      <Footer />
    </div>
  );
}
