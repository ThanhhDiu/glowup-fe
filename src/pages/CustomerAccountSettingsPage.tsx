import { useState } from 'react';
import { useCustomerNavigate } from '../components/layout/useCustomerNavigate';
import {
  CustomerAccountDangerZone,
  CustomerAccountProfileCard,
  CustomerSettingsInsights,
  CustomerSettingsSidebar,
  DeleteAccountModal,
  SettingsFrame,
  SettingsMain,
} from '../components/settings';
import type { CustomerAccountFormData } from '../components/settings';

export default function CustomerAccountSettingsPage() {
  const onNavigate = useCustomerNavigate();
  const [activeSidebarItem, setActiveSidebarItem] = useState('personal');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [form, setForm] = useState<CustomerAccountFormData>({
    fullName: 'Trần Thị Lan',
    phone: '090 123 4567',
    email: 'lan.tran@email.com',
    address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
  });

  const updateField = (field: keyof CustomerAccountFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="settings-page settings-page--customer">
      <SettingsFrame>
        <CustomerSettingsSidebar
          activeItem={activeSidebarItem}
          onSelect={(id) => {
            if (id === 'logout') {
              onNavigate('login');
              return;
            }

            if (id === 'security') {
              onNavigate('change-password');
              return;
            }

            if (id === 'wallet') {
              onNavigate('order-management');
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
    </div>
  );
}
