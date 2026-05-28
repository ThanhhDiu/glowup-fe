import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
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
    fullName: '',
    phone: '',
    email: '',
    address: '',
  });
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getMe()
      .then((res) => {
        const u = res.data;
        setUserId(u.id?.toString() || '');
        setForm({
          fullName: u.fullName || '',
          phone: u.phone || '',
          email: u.email || '',
          address: '', // Update if backend adds address field later
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi khi tải thông tin user:', err);
        setLoading(false);
      });
  }, []);

  const updateField = (field: keyof CustomerAccountFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    if (!userId) return;
    try {
      await userService.updateUserProfile(userId, {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
      });
      alert('Cập nhật thông tin thành công!');
    } catch (err) {
      console.error(err);
      alert('Cập nhật thất bại. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải thông tin...</div>;
  }

  return (
    <>
      <SettingsMain>
        <CustomerAccountProfileCard
          form={form}
          onFieldChange={updateField}
          onSave={handleSave}
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
