import React from 'react';
import './PremiumBanner.css';

export const PremiumBanner: React.FC = () => {
  return (
    <section className="premium-banner-container">
      <div className="premium-banner">
        <h2 className="premium-title">Tham gia GlowUp<br/>Premium</h2>
        <p className="premium-subtitle">
          Nhận ưu đãi đặt lịch sớm, giảm giá 15% cho tất cả dịch vụ và gói bảo vệ tài sản lên tới 50 triệu đồng.
        </p>
        <div className="premium-actions">
          <button className="btn-premium-primary">Đăng ký ngay</button>
          <button className="btn-premium-secondary">Xem các đặc quyền →</button>
        </div>
      </div>
    </section>
  );
};
