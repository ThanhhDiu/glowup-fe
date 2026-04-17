import React from 'react';
import './TopExperts.css';
import { StarIcon, BadgeCheckIcon, CheckCircleIcon, ClockIcon } from '../common/Icons';

interface Expert {
  id: string;
  name: string;
  title: string;
  rating: number;
  experience: string;
  completedJobs: string;
  badge: 'DIAMOND' | 'PLATINUM' | 'GOLD';
  imageUrl: string;
}

const experts: Expert[] = [
  {
    id: '1',
    name: 'Nguyễn Văn Minh',
    title: 'Chuyên gia Máy lạnh',
    rating: 5.0,
    experience: '8 năm',
    completedJobs: '1.450 đơn',
    badge: 'DIAMOND',
    imageUrl: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '2',
    name: 'Lê Thị Tuyết',
    title: 'Chuyên gia Vệ sinh',
    rating: 4.9,
    experience: '5 năm',
    completedJobs: '900 đơn',
    badge: 'PLATINUM',
    imageUrl: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: '3',
    name: 'Phạm Hoàng Nam',
    title: 'Kỹ thuật viên Điện nước',
    rating: 5.0,
    experience: '6 năm',
    completedJobs: '1.120 đơn',
    badge: 'GOLD',
    imageUrl: 'https://i.pravatar.cc/150?img=8'
  }
];

export const TopExperts: React.FC = () => {
  return (
    <section className="experts-section">
      <div className="experts-header">
        <h2 className="section-title text-center">Chuyên gia hàng đầu</h2>
        <p className="section-subtitle text-center">
          Đội ngũ kỹ thuật viên có tay nghề cao, đã được xác minh 100% với trên 5 năm kinh nghiệm thực chiến.
        </p>
      </div>

      <div className="experts-grid">
        {experts.map(expert => (
          <div key={expert.id} className="expert-card">
            <div className={`badge-tier badge-${expert.badge.toLowerCase()}`}>
              {expert.badge}
            </div>

            <div className="expert-info-top">
              <div className="expert-avatar-wrapper">
                <img src={expert.imageUrl} alt={expert.name} className="expert-avatar" />
                <div className="verified-badge"><BadgeCheckIcon size={12} /></div>
              </div>
              <div className="expert-name-title">
                <h3 className="expert-name">{expert.name}</h3>
                <p className="expert-title">{expert.title}</p>
                <div className="expert-rating">
                  <StarIcon size={14} className="star-icon" />
                  <span className="rating-value">{expert.rating}</span>
                </div>
              </div>
            </div>

            <div className="expert-stats">
              <div className="stat-item">
                <ClockIcon size={16} className="stat-icon" />
                <span>Kinh nghiệm: {expert.experience}</span>
              </div>
              <div className="stat-item">
                <CheckCircleIcon size={16} className="stat-icon" />
                <span>Hoàn thành: {expert.completedJobs}</span>
              </div>
            </div>

            <button className="btn-request">Gửi yêu cầu →</button>
          </div>
        ))}
      </div>
    </section>
  );
};
