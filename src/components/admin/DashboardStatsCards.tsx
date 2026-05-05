import React from 'react';
import './DashboardStatsCards.css';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeDirection: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

export const DashboardStatsCards: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Tổng doanh thu',
      value: '3.240.000.000₫',
      change: '+15.3%',
      changeDirection: 'up',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
      ),
    },
    {
      title: 'Tổng lợi nhuận',
      value: '486.000.000₫',
      change: '+8.2%',
      changeDirection: 'up',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
    {
      title: 'Số thợ hoạt động',
      value: '1,204',
      change: '0% lần',
      changeDirection: 'neutral',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: 'Đơn hàng hôm nay',
      value: '42',
      change: '-2.5%',
      changeDirection: 'down',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      ),
    },
  ];

  return (
    <div className="dsc-container">
      {stats.map((stat, index) => (
        <div key={index} className="dsc-card">
          <div className="dsc-card-header">
            <h3 className="dsc-card-title">{stat.title}</h3>
            <div className={`dsc-card-icon dsc-icon-${stat.changeDirection}`}>
              {stat.icon}
            </div>
          </div>

          <div className="dsc-card-value">{stat.value}</div>

          <div className={`dsc-card-change dsc-change-${stat.changeDirection}`}>
            {stat.changeDirection === 'up' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l9.5 16h-19z"></path>
              </svg>
            )}
            {stat.changeDirection === 'down' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22l-9.5-16h19z"></path>
              </svg>
            )}
            <span>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
