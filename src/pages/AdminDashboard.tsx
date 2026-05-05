import React, { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar.tsx';
import { AdminHeader } from '../components/admin/AdminHeader.tsx';
import './AdminDashboard.css';
import { DashboardStatsCards } from '../components/admin/DashboardStatsCards.tsx';
import { RevenueChart } from '../components/admin/RevenueChart.tsx';
import { ServiceDistributionChart } from '../components/admin/ServiceDistributionChart.tsx';
import { RecentOrdersTable } from '../components/admin/RecentOrdersTable.tsx';

const AdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days'>('7days');

  return (
    <div className="ad-layout">
      <AdminSidebar activeItem="dashboard" />
      <div className="ad-main">
        <AdminHeader />

        {/* Page Header */}
        <div className="ad-page-header">
          <div>
            <h1 className="ad-page-title">Trang Tổng Quan Thống Kê</h1>
            <p className="ad-page-subtitle">Quản lý tổng quát hoạt động kinh doanh, doanh thu và dịch vụ</p>
          </div>
          <button className="ad-export-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Xuất báo cáo
          </button>
        </div>

        {/* Stats Cards */}
        <DashboardStatsCards />

        {/* Charts Section */}
        <div className="ad-charts-container">
          <div className="ad-chart-wrapper ad-chart-large">
            <div className="ad-chart-header">
              <h2 className="ad-chart-title">Tăng trưởng đơn hàng</h2>
              <div className="ad-time-filter">
                <button 
                  className={`ad-filter-btn ${timeRange === '7days' ? 'active' : ''}`}
                  onClick={() => setTimeRange('7days')}
                >
                  7 ngày qua
                </button>
                <button 
                  className={`ad-filter-btn ${timeRange === '30days' ? 'active' : ''}`}
                  onClick={() => setTimeRange('30days')}
                >
                  30 ngày qua
                </button>
              </div>
            </div>
            <RevenueChart timeRange={timeRange} />
          </div>

          <div className="ad-chart-wrapper ad-chart-small">
            <div className="ad-chart-header">
              <h2 className="ad-chart-title">Tỷ trọng dịch vụ</h2>
            </div>
            <ServiceDistributionChart />
          </div>
        </div>

        {/* Recent Orders Table */}
        <RecentOrdersTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
