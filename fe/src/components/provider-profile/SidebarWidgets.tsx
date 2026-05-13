import React from 'react';
import './SidebarWidgets.css';


export const RegistrationIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

export const AwardIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
);

export const ScheduleSidebar: React.FC = () => {
  return (
    <div className="pc-widget-card">
      <h3 className="widget-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        Lịch trống tuần này
      </h3>
      <div className="schedule-grid">
        <div className="schedule-box">
          <span className="sc-day">Thứ 2</span>
          <span className="sc-time">8:00 - 17:00</span>
        </div>
        <div className="schedule-box">
          <span className="sc-day">Thứ 3</span>
          <span className="sc-time">8:00 - 17:00</span>
        </div>
        <div className="schedule-box full">
          <span className="sc-day">Thứ 4</span>
          <span className="sc-time">Hết chỗ</span>
        </div>
        <div className="schedule-box">
          <span className="sc-day">Thứ 5</span>
          <span className="sc-time">8:00 - 12:00</span>
        </div>
      </div>
    </div>
  );
};

export const VerificationSidebar: React.FC = () => {
  return (
    <div className="pc-widget-card">
      <h3 className="widget-title">Chứng chỉ & Xác minh</h3>
      <ul className="verification-list">
        <li>
          <div className="icon-wrapper orange-bg">
            <RegistrationIcon size={16} className="text-orange-500" />
          </div>
          <span>Đã xác minh CMND/CCCD</span>
        </li>
        <li>
          <div className="icon-wrapper orange-bg">
            <AwardIcon size={16} className="text-orange-500" />
          </div>
          <span>Chứng chỉ Kỹ thuật điện HCMC</span>
        </li>
      </ul>
    </div>
  );
};

export const MapSidebar: React.FC = () => {
  return (
    <div className="map-widget-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80)' }}>
      <div className="map-overlay"></div>
      <div className="map-pin">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e02424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#000C33' }}>Hoạt động tại Quận 1</span>
      </div>
    </div>
  );
};
