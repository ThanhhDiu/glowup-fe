import React from 'react';

export const ScheduleTab: React.FC = () => {
  return (
    <div className="profile-card">
      <h2 className="pc-title">Lịch trình làm việc chi tiết</h2>
      <p className="pc-text">Tôi linh hoạt nhận việc trong khu vực nội thành. Dưới đây là các khung giờ còn trống trong những ngày tới.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { date: 'Thứ 2, 24/10', hours: '08:00 - 17:00 (Còn trống)', status: 'available' },
          { date: 'Thứ 3, 25/10', hours: '08:00 - 17:00 (Còn trống)', status: 'available' },
          { date: 'Thứ 4, 26/10', hours: 'Đã kín lịch', status: 'full' },
          { date: 'Thứ 5, 27/10', hours: '08:00 - 12:00 (Sáng rảnh)', status: 'partial' },
          { date: 'Thứ 6, 28/10', hours: 'Nghỉ phép', status: 'off' },
        ].map(sh => (
          <div key={sh.date} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
            <span style={{ fontWeight: '600', color: '#000C33' }}>{sh.date}</span>
            <span style={{ 
              color: sh.status === 'full' ? '#ef4444' : sh.status === 'available' ? '#10b981' : '#f59e0b',
              fontWeight: '500'
            }}>{sh.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
