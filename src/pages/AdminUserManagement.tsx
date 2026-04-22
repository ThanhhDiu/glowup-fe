import React, { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { UserManagementTable } from '../components/admin/UserManagementTable';
import './AdminUserManagement.css';

const AdminUserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');

  return (
    <div className="aum-layout">
      <AdminSidebar activeItem="users" />
      <div className="aum-main">
        <AdminHeader />

        {/* Page Title */}
        <div className="aum-page-header">
          <div>
            <h1 className="aum-page-title">Quản lý người dùng</h1>
            <p className="aum-page-subtitle">Quản lý danh sách kỹ thuật viên và duyệt yêu cầu đăng ký mới</p>
          </div>
          <div className="aum-header-stats">
            <div className="aum-stat-mini">
              <span className="aum-stat-mini-value">156</span>
              <span className="aum-stat-mini-label">Tổng thợ</span>
            </div>
            <div className="aum-stat-mini">
              <span className="aum-stat-mini-value aum-stat-pending">3</span>
              <span className="aum-stat-mini-label">Chờ duyệt</span>
            </div>
            <div className="aum-stat-mini">
              <span className="aum-stat-mini-value aum-stat-locked">1</span>
              <span className="aum-stat-mini-label">Bị khóa</span>
            </div>
          </div>
        </div>

        {/* User Table */}
        <UserManagementTable activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default AdminUserManagement;
