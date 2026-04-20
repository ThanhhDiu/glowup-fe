import React from 'react';
import './HeaderLogged.css';
import { SearchIcon, BellIcon, FileTextIcon } from '../common/Icons';

export const HeaderLogged: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <header className="header-logged">
      <div className="hl-container">
        <div className="hl-left">
          <div className="hl-logo" style={{ cursor: 'pointer' }} onClick={() => onNavigate && onNavigate('home')}>
            <span className="hl-logo-text">GlowUp</span>
          </div>

          <nav className="hl-nav-menu">
            <a href="#" className="hl-nav-item">Dịch vụ</a>
            <a href="#" className="hl-nav-item active">Danh sách thợ</a>
            <a href="#" className="hl-nav-item">Ưu đãi</a>
          </nav>
        </div>

        <div className="hl-right">
          <div className="hl-search-bar">
            <SearchIcon size={16} className="hl-search-icon" />
            <input type="text" placeholder="Tìm kiếm thợ..." className="hl-search-input" />
          </div>

          <div className="hl-actions">
            <button className="hl-icon-btn">
              <BellIcon size={20} />
            </button>
            <button className="hl-icon-btn">
              <FileTextIcon size={20} />
            </button>
            <div className="hl-avatar-wrapper">
              <img src="https://i.pravatar.cc/150?img=32" alt="User" className="hl-avatar" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
