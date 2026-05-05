import { useState } from 'react';
import {
  CustomerAccountDangerZone,
  CustomerAccountProfileCard,
  CustomerSettingsInsights,
  DeleteAccountModal,
  SettingsMain,
} from '../components/settings';
import type { CustomerAccountFormData } from '../components/settings';

export default function CustomerAccountSettingsPage() {
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
    <>
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

      <DeleteAccountModal
        open={deleteOpen}
        message="Bạn có chắc chắn? Toàn bộ lịch sử đơn hàng, ví và dữ liệu liên quan sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác."
        onConfirm={() => setDeleteOpen(false)}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}
