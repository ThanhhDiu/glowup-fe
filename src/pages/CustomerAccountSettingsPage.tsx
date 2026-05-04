import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { HeaderLogged } from '../components/layout/HeaderLogged';
import {
  CustomerAccountDangerZone,
  CustomerAccountProfileCard,
  CustomerSettingsInsights,
  CustomerSettingsSidebar,
  DeleteAccountModal,
  SettingsFrame,
  SettingsMain,
  customerSettingsNavItems,
  customerSettingsPageMap,
} from '../components/settings';
import type { CustomerAccountFormData } from '../components/settings';

export default function CustomerAccountSettingsPage() {
  const navigate = useNavigate();
  const [activeSidebarItem, setActiveSidebarItem] = useState('personal');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [form, setForm] = useState<CustomerAccountFormData>({
    fullName: 'Trần Thị Lan',
    phone: '090 123 4567',
    email: 'lan.tran@email.com',
    address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
  });

  const onNavigate = (page: string) => {
    navigate(customerSettingsPageMap[page] || '/');
  };

  const updateField = (field: keyof CustomerAccountFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="settings-page settings-page--customer">
      <HeaderLogged
        onNavigate={onNavigate}
        navItems={customerSettingsNavItems}
        activeNavKey="account"
        profilePage="customer-settings"
        searchPlaceholder="Tìm kiếm dịch vụ..."
      />

      <SettingsFrame>
        <CustomerSettingsSidebar
          activeItem={activeSidebarItem}
          onSelect={(id) => {
            if (id === 'logout') {
              onNavigate('login');
              return;
            }

            setActiveSidebarItem(id);
          }}
        />

        <SettingsMain>
          <CustomerAccountProfileCard
            form={form}
            onFieldChange={updateField}
            onSave={() => undefined}
            onUploadAvatar={() => undefined}
          />

          <CustomerAccountDangerZone onDelete={() => setDeleteOpen(true)} />

          <CustomerSettingsInsights />
        </SettingsMain>
      </SettingsFrame>

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
