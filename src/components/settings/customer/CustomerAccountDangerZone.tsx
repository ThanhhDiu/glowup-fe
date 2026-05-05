import { Trash2 } from 'lucide-react';
import { SettingsDangerZone } from '../cards/SettingsDangerZone';

interface CustomerAccountDangerZoneProps {
  onDelete: () => void;
}

export function CustomerAccountDangerZone({ onDelete }: CustomerAccountDangerZoneProps) {
  return (
    <SettingsDangerZone
      title="Xóa tài khoản"
      text="Sau khi xóa, lịch sử đơn hàng, địa chỉ đã lưu và cài đặt cá nhân sẽ không thể khôi phục. Đây là bước xác nhận cuối cùng trước khi gửi yêu cầu xóa."
      action={
        <button type="button" className="settings-danger-button" onClick={onDelete}>
          <Trash2 size={18} />
          Xóa tài khoản
        </button>
      }
    />
  );
}
