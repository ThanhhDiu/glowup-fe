import { useState } from 'react';
import {
  BadgeCheck,
  Clock3,
  MapPinned,
  Save,
  Sparkles,
  Trash2,
  Wrench,
} from 'lucide-react';
import {
  DeleteAccountModal,
  SettingsActionBar,
  SettingsCard,
  SettingsChipPicker,
  SettingsDangerZone,
  SettingsFrame,
  SettingsInsightCard,
  SettingsMain,
  SettingsSwitchRow,
  SettingsTextField,
  SettingsTopline,
  SettingsTextareaField,
} from '../components/settings';

const skillOptions = ['Máy lạnh', 'Máy giặt', 'Tủ lạnh', 'Điện dân dụng', 'Vệ sinh máy lạnh'];
const areaOptions = ['Quận Bình Thạnh', 'Quận 1', 'Quận 3', 'Quận 7', 'TP. Thủ Đức'];

export default function TechnicianProfileSettingsPage() {
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
      <SettingsFrame as="div" singleColumn className="settings-frame--technician-full">
        <SettingsMain>
          <SettingsTopline
            title="Hồ sơ & kỹ năng"
            subtitle="Bản nâng cấp này bám theo layout technician hiện có, nhưng gom thông tin cá nhân, khu vực phục vụ và trạng thái nhận việc vào cùng một flow chỉnh sửa mượt hơn."
            badge={
              <span className="settings-badge">
                <BadgeCheck size={18} />
                Hồ sơ đạt chuẩn GlowUp
              </span>
            }
          />

          <section className="tech-settings-overview">
            <article className="tech-settings-hero">
              <div className="tech-settings-hero__identity">
                <img
                  src="https://i.pravatar.cc/160?img=12"
                  alt={profile.name}
                  className="tech-settings-hero__avatar"
                />
                <div className="tech-settings-hero__copy">
                  <span className="tech-settings-hero__eyebrow">Hồ sơ kỹ thuật viên</span>
                  <h2 className="tech-settings-hero__name">{profile.name}</h2>
                  <p className="tech-settings-hero__meta">ID: TECH-8842 · Đã xác minh bởi GlowUp</p>
                  <div className="tech-settings-hero__chips">
                    <span className={`tech-settings-chip ${isAvailable ? 'is-online' : 'is-offline'}`}>
                      {isAvailable ? 'Đang nhận đơn' : 'Tạm dừng nhận đơn'}
                    </span>
                    <span className="tech-settings-chip">
                      <Wrench size={14} />
                      {skills.length} kỹ năng
                    </span>
                    <span className="tech-settings-chip">
                      <MapPinned size={14} />
                      {areas.length} khu vực
                    </span>
                  </div>
                </div>
              </div>

              <div className="tech-settings-hero__note">
                <div className="tech-settings-hero__note-icon">
                  <Sparkles size={18} />
                </div>
                <div>
                  <strong>Hồ sơ rõ ràng giúp tăng chuyển đổi</strong>
                  <p>
                    Cập nhật đầy đủ mô tả, kỹ năng và vùng phục vụ để khách hàng tin tưởng hơn trước khi đặt dịch vụ.
                  </p>
                </div>
              </div>
            </article>

            <article className="tech-settings-status">
              <div className="tech-settings-status__header">
                <span className="tech-settings-status__eyebrow">Điều phối hiện tại</span>
                <span className={`tech-settings-status__badge ${isAvailable ? 'is-active' : ''}`}>
                  {isAvailable ? 'Online' : 'Offline'}
                </span>
              </div>

              <div className="tech-settings-status__stats">
                <div className="tech-settings-status__item">
                  <span className="tech-settings-status__label">Độ hoàn thiện hồ sơ</span>
                  <strong className="tech-settings-status__value">92%</strong>
                </div>
                <div className="tech-settings-status__item">
                  <span className="tech-settings-status__label">Phản hồi trung bình</span>
                  <strong className="tech-settings-status__value">8 phút</strong>
                </div>
                <div className="tech-settings-status__item">
                  <span className="tech-settings-status__label">Tỉ lệ nhận đơn</span>
                  <strong className="tech-settings-status__value">87%</strong>
                </div>
              </div>
            </article>
          </section>

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

            <SettingsActionBar>
              <button type="button" className="settings-primary-button">
                <Save size={18} />
                Lưu thay đổi
              </button>
            </SettingsActionBar>
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
        </SettingsMain>
      </SettingsFrame>

      <DeleteAccountModal
        open={deleteOpen}
        message="Bạn có chắc chắn muốn xóa tài khoản kỹ thuật viên? Toàn bộ lịch sử nhận đơn và cấu hình hồ sơ sẽ biến mất vĩnh viễn."
        onConfirm={() => setDeleteOpen(false)}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
