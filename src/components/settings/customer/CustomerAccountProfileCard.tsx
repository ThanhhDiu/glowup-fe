import { BadgeCheck, Save, UploadCloud } from 'lucide-react';
import { SettingsActionBar } from '../actions/SettingsActionBar';
import { SettingsCard } from '../cards/SettingsCard';
import { SettingsTextField } from '../fields/SettingsTextField';
import { SettingsTextareaField } from '../fields/SettingsTextareaField';
import type { CustomerAccountFormData } from './types';

interface CustomerAccountProfileCardProps {
  form: CustomerAccountFormData;
  onFieldChange: (field: keyof CustomerAccountFormData, value: string) => void;
  onSave?: () => void;
  onUploadAvatar?: () => void;
}

export function CustomerAccountProfileCard({
  form,
  onFieldChange,
  onSave,
  onUploadAvatar,
}: CustomerAccountProfileCardProps) {
  return (
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
        <button type="button" className="settings-ghost-button" onClick={onUploadAvatar}>
          <UploadCloud size={18} />
          Tải ảnh lên
        </button>
      }
    >
      <div className="settings-grid settings-grid--two">
        <SettingsTextField
          label="Họ tên"
          value={form.fullName}
          onChange={(value) => onFieldChange('fullName', value)}
        />
        <SettingsTextField
          label="Số điện thoại"
          value={form.phone}
          onChange={(value) => onFieldChange('phone', value)}
        />
        <SettingsTextField
          label="Email"
          value={form.email}
          onChange={(value) => onFieldChange('email', value)}
          fullWidth
        />
        <SettingsTextareaField
          label="Địa chỉ mặc định"
          value={form.address}
          onChange={(value) => onFieldChange('address', value)}
          fullWidth
        />
      </div>

      <SettingsActionBar>
        <button type="button" className="settings-primary-button" onClick={onSave}>
          <Save size={18} />
          Lưu thay đổi
        </button>
      </SettingsActionBar>
    </SettingsCard>
  );
}
