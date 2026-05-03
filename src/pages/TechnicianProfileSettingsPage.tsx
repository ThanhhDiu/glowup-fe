import { useState } from 'react';
import {
  BadgeCheck,
  Clock3,
  CreditCard,
  LogOut,
  MapPinned,
  Save,
  Shield,
  Trash2,
  UserRound,
  Wrench,
} from 'lucide-react';
import {
  DeleteAccountModal,
  SettingsCard,
  SettingsChipPicker,
  SettingsDangerZone,
  SettingsInsightCard,
  SettingsSidebarCard,
  SettingsSwitchRow,
  SettingsTextField,
  SettingsTextareaField,
} from '../components/settings/SettingsUI';
import type { SettingsNavItem } from '../components/settings/SettingsUI';

const skillOptions = ['Máy lạnh', 'Máy giặt', 'Tủ lạnh', 'Điện dân dụng', 'Vệ sinh máy lạnh'];
const areaOptions = ['Quận Bình Thạnh', 'Quận 1', 'Quận 3', 'Quận 7', 'TP. Thủ Đức'];

const sidebarItems: SettingsNavItem[] = [
  { id: 'personal', label: 'Thông tin cá nhân', icon: <UserRound size={18} /> },
  { id: 'security', label: 'Đổi mật khẩu', icon: <Shield size={18} /> },
  { id: 'wallet', label: 'Ví tiền', icon: <CreditCard size={18} /> },
  { id: 'logout', label: 'Đăng xuất', icon: <LogOut size={18} />, tone: 'danger' },
];

export default function TechnicianProfileSettingsPage() {
  const [activeSidebarItem, setActiveSidebarItem] = useState('personal');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn Minh',
    phone: '098 765 4321',
    bio: 'Kỹ thuật viên hơn 10 năm kinh nghiệm trong lĩnh vực điện lạnh và thiết bị gia dụng. Chuyên sửa chữa máy điều hòa, máy giặt và tủ lạnh với quy trình minh bạch, đúng hẹn.',
  });
  const [skills, setSkills] = useState(['Máy lạnh', 'Máy giặt', 'Tủ lạnh']);
  const [areas, setAreas] = useState(['Quận Bình Thạnh', 'Quận 1', 'Quận 3']);

  const toggleSelection = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  return (
    <div className="settings-page settings-page--technician">
      <div className="settings-frame">
        <SettingsSidebarCard
          avatar="https://i.pravatar.cc/160?img=12"
          name="Nguyễn Văn Minh"
          meta="ID: TECH-8842"
          items={sidebarItems}
          activeItem={activeSidebarItem}
          onSelect={setActiveSidebarItem}
        />

        <div className="settings-main">
          <div className="settings-topline">
            <div>
              <h1 className="settings-topline__title">Hồ sơ & kỹ năng</h1>
              <p className="settings-topline__subtitle">
                Bản nâng cấp này bám theo layout technician hiện có, nhưng gom thông tin cá nhân, khu vực phục vụ
                và trạng thái nhận việc vào cùng một flow chỉnh sửa mượt hơn.
              </p>
            </div>
            <span className="settings-badge">
              <BadgeCheck size={18} />
              Hồ sơ đạt chuẩn GlowUp
            </span>
          </div>

          <SettingsCard
            title="Hồ sơ kỹ thuật viên"
            subtitle="Cập nhật thông tin công việc và khả năng phục vụ để thuật toán điều phối đơn gợi ý chính xác hơn."
            eyebrow={
              <>
                <Wrench size={18} />
                Khu vực kỹ thuật
              </>
            }
            compactTitle
          >
            <SettingsSwitchRow
              title="Sẵn sàng nhận đơn"
              description="Bật để hệ thống ưu tiên hiển thị bạn trong luồng đề xuất và điều phối đơn gần khu vực."
              checked={isAvailable}
              onToggle={() => setIsAvailable((current) => !current)}
            />

            <div className="settings-grid settings-grid--two">
              <SettingsTextField
                label="Tên đầy đủ"
                value={profile.name}
                onChange={(value) => setProfile((current) => ({ ...current, name: value }))}
              />
              <SettingsTextField
                label="Số điện thoại"
                value={profile.phone}
                onChange={(value) => setProfile((current) => ({ ...current, phone: value }))}
              />
              <SettingsChipPicker
                label="Kỹ năng chuyên môn"
                options={skillOptions}
                selected={skills}
                onToggle={(value) => toggleSelection(value, setSkills)}
              />
              <SettingsChipPicker
                label="Khu vực hoạt động"
                options={areaOptions}
                selected={areas}
                onToggle={(value) => toggleSelection(value, setAreas)}
                tone="warm"
              />
              <SettingsTextareaField
                label="Giới thiệu bản thân"
                value={profile.bio}
                onChange={(value) => setProfile((current) => ({ ...current, bio: value }))}
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
            text="Hành động này sẽ xóa vĩnh viễn dữ liệu hồ sơ, lịch sử nhận đơn và cấu hình vận hành. Chỉ dùng khi thật sự cần đóng tài khoản kỹ thuật viên."
            action={
              <button type="button" className="settings-danger-button" onClick={() => setDeleteOpen(true)}>
                <Trash2 size={18} />
                Xóa tài khoản
              </button>
            }
          />

          <div className="settings-insights">
            <SettingsInsightCard
              icon={<MapPinned size={22} />}
              title="Khu vực ưu tiên"
              text="Hệ thống sẽ ưu tiên đơn phát sinh trong các quận đã chọn để tăng tốc độ nhận việc và giảm thời gian di chuyển."
            />
            <SettingsInsightCard
              icon={<Clock3 size={22} />}
              title="Nhịp nhận đơn"
              text="Trạng thái sẵn sàng giúp đội điều phối thấy đúng khả năng hiện tại của bạn thay vì phải xác nhận thủ công."
            />
            <SettingsInsightCard
              icon={<BadgeCheck size={22} />}
              title="Độ tin cậy hồ sơ"
              text="Thông tin rõ ràng về kỹ năng và mô tả chuyên môn giúp khách hàng tin tưởng hơn trước khi đặt dịch vụ."
            />
          </div>
        </div>
      </div>

      <DeleteAccountModal
        open={deleteOpen}
        message="Bạn có chắc chắn muốn xóa tài khoản kỹ thuật viên? Toàn bộ lịch sử nhận đơn và cấu hình hồ sơ sẽ biến mất vĩnh viễn."
        onConfirm={() => setDeleteOpen(false)}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
