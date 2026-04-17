import React from 'react';
import './Header.css';
import { SearchIcon, BellIcon } from '../common/Icons';

export const Header: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" style={{ cursor: 'pointer' }} onClick={() => onNavigate && onNavigate('home')}>
          <span className="logo-text">GlowUp</span>
        </div>
        
        <nav className="header-nav">
          <a href="#" className="nav-item active">Trang chủ</a>
          <a href="#" className="nav-item">Dịch vụ</a>
          <a href="#" className="nav-item">Chuyên gia</a>
          <a href="#" className="nav-item">Ưu đãi</a>
        </nav>

        <div className="header-actions">
          <div className="search-box" style={{ cursor: 'pointer' }} onClick={() => onNavigate && onNavigate('find-provider')}>
            <SearchIcon className="search-icon" size={16} />
            <input type="text" placeholder="Tìm kiếm dịch vụ..." className="search-input" />
          </div>
          <div className="action-icon">
            <BellIcon size={20} />
            <span className="notification-dot"></span>
          </div>
          <div className="profile-btn">
            <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="avatar-img" />
          </div>
        </div>
      </div>
    </header>
  );
};
