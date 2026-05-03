import { useState } from 'react';
import { Bell, Landmark, RotateCcw, Save, Settings2, ShieldCheck } from 'lucide-react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import {
  SettingsCard,
  SettingsSwitchRow,
  SettingsTextField,
} from '../components/settings/SettingsUI';

export default function AdminSystemSettingsPage() {
  const [general, setGeneral] = useState({
    appName: 'GlowUp Concierge',
    hotline: '1900 8888',
    email: 'admin@glowup.vn',
  });
  const [billing, setBilling] = useState({
    platformFee: '15',
    vat: '10',
  });
  const [notifications, setNotifications] = useState({
    newOrder: true,
    customerEmail: true,
    weeklyRevenue: false,
    securityAlert: true,
  });
  const [operations, setOperations] = useState({
    requireManualReview: true,
    technicianAutoPause: false,
    incidentEscalation: true,
  });

  const setGeneralField = (field: keyof typeof general, value: string) => {
    setGeneral((current) => ({ ...current, [field]: value }));
  };

  const setBillingField = (field: keyof typeof billing, value: string) => {
    setBilling((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="settings-page settings-page--admin" style={{ display: 'flex' }}>
      <AdminSidebar activeItem="settings" />

      <div style={{ flex: 1, minWidth: 0, padding: '28px 36px' }}>
        <AdminHeader searchPlaceholder="Tìm kiếm hệ thống, thông báo, cấu hình..." />

        <div className="settings-main">
          <div className="settings-topline">
            <div>
              <h1 className="settings-topline__title">Cài đặt hệ thống</h1>
              <p className="settings-topline__subtitle">
                Màn hình này kế thừa layout admin hiện có và gom các cấu hình nền tảng, thuế phí, cảnh báo và quy
                tắc vận hành vào một nhịp thao tác ngắn gọn hơn.
              </p>
            </div>
            <span className="settings-badge">
              <Settings2 size={18} />
              Đồng bộ theo bảng màu hệ thống
            </span>
          </div>

          <div className="settings-grid settings-grid--two">
            <SettingsCard
              title="Cấu hình chung"
              subtitle="Các thông số cơ bản mà đội vận hành và khách hàng thường nhìn thấy đầu tiên trên nền tảng."
              eyebrow={
                <>
                  <Settings2 size={18} />
                  Nền tảng
                </>
              }
              compactTitle
            >
              <div className="settings-grid settings-grid--two">
                <SettingsTextField
                  label="Tên ứng dụng"
                  value={general.appName}
                  onChange={(value) => setGeneralField('appName', value)}
                />
                <SettingsTextField
                  label="Hotline hỗ trợ"
                  value={general.hotline}
                  onChange={(value) => setGeneralField('hotline', value)}
                />
                <SettingsTextField
                  label="Email liên hệ"
                  value={general.email}
                  onChange={(value) => setGeneralField('email', value)}
                  fullWidth
                />
              </div>
            </SettingsCard>

            <SettingsCard
              title="Phí & thuế"
              subtitle="Tỷ lệ áp dụng thống nhất trên các giao dịch phát sinh trong hệ thống."
              eyebrow={
                <>
                  <Landmark size={18} />
                  Tài chính
                </>
              }
              compactTitle
              highlight
            >
              <div className="settings-meter-list">
                <div className="settings-meter">
                  <div className="settings-meter__row">
                    <span className="settings-meter__label">Phí nền tảng</span>
                    <span className="settings-meter__value">{billing.platformFee}%</span>
                  </div>
                  <div className="settings-meter__track">
                    <div className="settings-meter__fill" style={{ width: `${billing.platformFee}%` }} />
                  </div>
                </div>

                <div className="settings-meter">
                  <div className="settings-meter__row">
                    <span className="settings-meter__label">VAT</span>
                    <span className="settings-meter__value">{billing.vat}%</span>
                  </div>
                  <div className="settings-meter__track">
                    <div className="settings-meter__fill" style={{ width: `${billing.vat}%` }} />
                  </div>
                </div>
              </div>

              <div className="settings-grid settings-grid--two">
                <SettingsTextField
                  label="Phí nền tảng (%)"
                  value={billing.platformFee}
                  onChange={(value) => setBillingField('platformFee', value)}
                />
                <SettingsTextField
                  label="VAT (%)"
                  value={billing.vat}
                  onChange={(value) => setBillingField('vat', value)}
                />
              </div>
            </SettingsCard>
          </div>

          <div className="settings-grid settings-grid--two">
            <SettingsCard
              title="Thông báo"
              subtitle="Những tín hiệu cần gửi ra ngoài để đội vận hành và khách hàng không bỏ lỡ trạng thái quan trọng."
              eyebrow={
                <>
                  <Bell size={18} />
                  Notification rules
                </>
              }
              compactTitle
            >
              <SettingsSwitchRow
                title="Thông báo đơn mới"
                description="Gửi cảnh báo tới admin khi phát sinh đơn hàng mới cần theo dõi."
                checked={notifications.newOrder}
                onToggle={() => setNotifications((current) => ({ ...current, newOrder: !current.newOrder }))}
              />
              <SettingsSwitchRow
                title="Email cho khách"
                description="Tự động gửi email xác nhận và nhắc lịch cho khách hàng sau khi đặt dịch vụ."
                checked={notifications.customerEmail}
                onToggle={() =>
                  setNotifications((current) => ({ ...current, customerEmail: !current.customerEmail }))
                }
              />
              <SettingsSwitchRow
                title="Báo cáo doanh thu"
                description="Gửi báo cáo tổng hợp doanh thu hàng tuần qua email cho đội vận hành."
                checked={notifications.weeklyRevenue}
                onToggle={() =>
                  setNotifications((current) => ({ ...current, weeklyRevenue: !current.weeklyRevenue }))
                }
              />
              <SettingsSwitchRow
                title="Cảnh báo bảo mật"
                description="Thông báo ngay khi phát hiện đăng nhập lạ hoặc biến động hành vi có rủi ro."
                checked={notifications.securityAlert}
                onToggle={() =>
                  setNotifications((current) => ({ ...current, securityAlert: !current.securityAlert }))
                }
              />
            </SettingsCard>

            <SettingsCard
              title="Bảo mật & vận hành"
              subtitle="Nhóm cấu hình kiểm soát chất lượng hệ thống và các nhịp can thiệp thủ công của admin."
              eyebrow={
                <>
                  <ShieldCheck size={18} />
                  Control center
                </>
              }
              compactTitle
            >
              <SettingsSwitchRow
                title="Duyệt hồ sơ thủ công"
                description="Giữ lại bước kiểm duyệt trước khi tài khoản kỹ thuật viên mới được kích hoạt."
                checked={operations.requireManualReview}
                onToggle={() =>
                  setOperations((current) => ({
                    ...current,
                    requireManualReview: !current.requireManualReview,
                  }))
                }
              />
              <SettingsSwitchRow
                title="Tự tạm dừng khi quá tải"
                description="Tạm ẩn kỹ thuật viên khi số đơn chờ vượt ngưỡng để tránh trải nghiệm nhận việc xấu."
                checked={operations.technicianAutoPause}
                onToggle={() =>
                  setOperations((current) => ({
                    ...current,
                    technicianAutoPause: !current.technicianAutoPause,
                  }))
                }
              />
              <SettingsSwitchRow
                title="Leo thang sự cố"
                description="Đẩy nhanh các ticket có dấu hiệu gian lận hoặc tranh chấp sang đội xử lý nội bộ."
                checked={operations.incidentEscalation}
                onToggle={() =>
                  setOperations((current) => ({
                    ...current,
                    incidentEscalation: !current.incidentEscalation,
                  }))
                }
              />
            </SettingsCard>
          </div>

          <div className="settings-actions">
            <button type="button" className="settings-secondary-button">
              <RotateCcw size={18} />
              Hủy thay đổi
            </button>
            <button type="button" className="settings-primary-button">
              <Save size={18} />
              Lưu cấu hình
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
