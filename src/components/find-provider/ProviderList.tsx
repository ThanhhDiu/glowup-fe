import React, { useState } from 'react';
import './ProviderList.css';
import { ProviderCard } from './ProviderCard';
import { PremiumProviderCard } from './PremiumProviderCard';
import { ChevronDownIcon } from '../common/Icons';

export const ProviderList: React.FC<{ onNavigate?: (page: string, data?: any) => void }> = ({ onNavigate }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('PHỔ BIẾN NHẤT');

  const providers = [
    {
      type: 'normal',
      id: '1',
      name: 'Nguyễn Minh Tuấn',
      avatar: 'https://i.pravatar.cc/150?img=13',
      rating: 4.9,
      reviewCount: 124,
      location: '25 Bis Nguyễn Thị Minh Khai, Quận 1, HCMC',
      skills: ['Sửa điện lạnh', 'Bảo trì máy lạnh', 'Hệ thống thông gió'],
      price: '250.000đ',
      isAvailable: true
    },
    {
      type: 'normal',
      id: '2',
      name: 'Phạm Hoài Nam',
      avatar: 'https://i.pravatar.cc/150?img=55',
      rating: 4.8,
      reviewCount: 98,
      location: '152 Nguyễn Lương Bằng, Quận 7, HCMC',
      skills: ['Thông tắc ống nước', 'Lắp đặt thiết bị vệ sinh'],
      price: '200.000đ',
      isAvailable: false,
      timeAvailable: '14:00'
    },
    {
      type: 'premium',
      id: 'p1',
      name: 'Trần Đại Quang',
      avatar: 'https://i.pravatar.cc/200?img=18', // Actually it's a hooded dark avatar in the design, using pravatar for now
      titleBadge: 'CHUYÊN GIA CỦA THÁNG',
      description: 'Kỹ sư trưởng với hơn 15 năm kinh nghiệm trong hệ thống điện công nghiệp và dân dụng. Được tin tưởng bởi hơn 1,200 hộ gia đình tại Quận 1.'
    },
    {
      type: 'normal',
      id: '3',
      name: 'Lê Văn Hùng',
      avatar: 'https://i.pravatar.cc/150?img=33',
      rating: 4.7,
      reviewCount: 56,
      location: 'Số 10 Kha Vạn Cân, Thủ Đức, HCMC',
      skills: ['Sửa chữa đồ gỗ', 'Lắp đặt nội thất'],
      price: '180.000đ',
      isAvailable: true
    }
  ];

  return (
    <div className="provider-list-container">
      <div className="pl-header">
        <div className="pl-header-left">
          <h1 className="pl-title">Thợ sửa chữa chuyên nghiệp</h1>
          <p className="pl-subtitle">Tìm thấy 128 chuyên gia tại khu vực TP.HCM</p>
        </div>
        <div className="pl-sort" style={{ position: 'relative' }}>
          <span className="sort-label">SẮP XẾP:</span>
          <button className="sort-btn" onClick={() => setIsSortOpen(!isSortOpen)}>
            {selectedSort} <ChevronDownIcon size={14} className="sort-icon" />
          </button>

          {isSortOpen && (
            <div className="sort-dropdown">
              {['PHỔ BIẾN NHẤT', 'ĐẾN NHANH NHẤT'].map(option => (
                <div
                  key={option}
                  className={`sort-option ${selectedSort === option ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSort(option);
                    setIsSortOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pl-cards">
        {providers.map((p) => {
          if (p.type === 'premium') {
            return <PremiumProviderCard key={p.id} provider={p as any} onNavigate={onNavigate} />;
          }
          return <ProviderCard key={p.id} provider={p as any} onNavigate={onNavigate} />;
        })}
      </div>
    </div>
  );
};
