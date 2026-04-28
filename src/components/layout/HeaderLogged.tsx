import React from 'react';
import './HeaderLogged.css';
import { SearchIcon, BellIcon, FileTextIcon } from '../common/Icons';

export const HeaderLogged: React.FC<{ onNavigate?: (page: string, data?: any) => void }> = ({ onNavigate }) => {
  const goToProfile = () => onNavigate && onNavigate('provider-profile');
  const goToLogout = () => onNavigate && onNavigate('login');

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
            <div className="hl-profile-dropdown">
              <button className="hl-avatar-wrapper" type="button" aria-haspopup="menu" aria-label="Tài khoản của tôi">
                <img src="https://i.pravatar.cc/150?img=32" alt="User" className="hl-avatar" />
              </button>

              <div className="hl-profile-menu" role="menu" aria-label="Tùy chọn tài khoản">
                <div className="hl-profile-menu__header">
                  <img src="https://i.pravatar.cc/150?img=32" alt="User" className="hl-profile-menu__avatar" />
                  <div>
                    <p className="hl-profile-menu__name">Hồ sơ của tôi</p>
                    <p className="hl-profile-menu__sub">Quản lý tài khoản và bảo mật</p>
                  </div>
                </div>

                <button className="hl-profile-menu__item" type="button" onClick={goToProfile} role="menuitem">
                  Hồ sơ của tôi
                </button>
                <button className="hl-profile-menu__item hl-profile-menu__item--danger" type="button" onClick={goToLogout} role="menuitem">
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
