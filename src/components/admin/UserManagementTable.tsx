import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserManagementTable.css';

interface User {
  id: string;
  name: string;
  avatar: string;
  serviceType: string;
  registeredDate: string;
  status: 'approved' | 'pending' | 'locked';
  rating?: number;
  completedJobs?: string;
  phone?: string;
}

const approvedUsers: User[] = [
  { id: 'TECH-7821-VN', name: 'Nguyễn Văn Hùng', avatar: 'https://i.pravatar.cc/150?img=33', serviceType: 'Sửa chữa điện lạnh', registeredDate: '12/05/2021', status: 'approved', rating: 4.9, completedJobs: '1,500+', phone: '090****89' },
  { id: 'TECH-3412-VN', name: 'Trần Thị Mai', avatar: 'https://i.pravatar.cc/150?img=5', serviceType: 'Vệ sinh công nghiệp', registeredDate: '08/11/2022', status: 'approved', rating: 4.8, completedJobs: '920', phone: '091****45' },
  { id: 'TECH-5590-VN', name: 'Lê Hoàng Nam', avatar: 'https://i.pravatar.cc/150?img=12', serviceType: 'Sửa chữa điện nước', registeredDate: '21/03/2023', status: 'approved', rating: 4.7, completedJobs: '680', phone: '037****12' },
  { id: 'TECH-8801-VN', name: 'Phạm Đức Minh', avatar: 'https://i.pravatar.cc/150?img=8', serviceType: 'Lắp đặt máy lạnh', registeredDate: '15/01/2022', status: 'locked', rating: 3.2, completedJobs: '350', phone: '098****67' },
  { id: 'TECH-6623-VN', name: 'Võ Thanh Tùng', avatar: 'https://i.pravatar.cc/150?img=14', serviceType: 'Bảo trì hệ thống VRV', registeredDate: '02/09/2023', status: 'approved', rating: 5.0, completedJobs: '410', phone: '070****33' },
];

const pendingUsers: User[] = [
  { id: 'TECH-9901-VN', name: 'Đỗ Quang Huy', avatar: 'https://i.pravatar.cc/150?img=51', serviceType: 'Sửa chữa tủ lạnh', registeredDate: '10/04/2026', status: 'pending', phone: '093****21' },
  { id: 'TECH-9902-VN', name: 'Bùi Thị Hạnh', avatar: 'https://i.pravatar.cc/150?img=25', serviceType: 'Vệ sinh máy lạnh', registeredDate: '14/04/2026', status: 'pending', phone: '086****55' },
  { id: 'TECH-9903-VN', name: 'Ngô Văn Long', avatar: 'https://i.pravatar.cc/150?img=18', serviceType: 'Sửa chữa máy giặt', registeredDate: '16/04/2026', status: 'pending', phone: '097****78' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  approved: { label: 'Đã duyệt', color: '#10b981', bg: '#ecfdf5' },
  pending: { label: 'Đang chờ', color: '#f59e0b', bg: '#fffbeb' },
  locked: { label: 'Bị khóa', color: '#ef4444', bg: '#fef2f2' },
};

interface Props {
  activeTab: 'approved' | 'pending';
  onTabChange: (tab: 'approved' | 'pending') => void;
}

export const UserManagementTable: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const users = activeTab === 'approved' ? approvedUsers : pendingUsers;

  const handleViewDetail = (user: User) => {
    navigate(`/admin/users/${user.id}`, {
      state: { user, tab: activeTab }
    });
  };

  return (
    <div className="umt-container">
      {/* Tabs */}
      <div className="umt-tabs">
        <button className={`umt-tab ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => onTabChange('approved')}>
          <span>Danh sách thợ</span>
          <span className="umt-tab-count">{approvedUsers.length}</span>
        </button>
        <button className={`umt-tab ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => onTabChange('pending')}>
          <span>Yêu cầu chờ phê duyệt</span>
          <span className="umt-tab-count umt-count-pending">{pendingUsers.length}</span>
        </button>
      </div>

      {/* Table */}
      <div className="umt-table-wrapper">
        <table className="umt-table">
          <thead>
            <tr>
              <th>Kỹ thuật viên</th>
              <th>Loại dịch vụ</th>
              <th>Ngày đăng ký</th>
              <th>Trạng thái</th>
              {activeTab === 'approved' && <th>Đánh giá</th>}
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const st = statusConfig[user.status];
              return (
                <tr key={user.id} className="umt-row">
                  <td>
                    <div className="umt-user-cell">
                      <img src={user.avatar} alt={user.name} className="umt-user-avatar" />
                      <div className="umt-user-info">
                        <span className="umt-user-name">{user.name}</span>
                        <span className="umt-user-id">{user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="umt-service-tag">{user.serviceType}</span></td>
                  <td className="umt-date">{user.registeredDate}</td>
                  <td>
                    <span className="umt-status-badge" style={{ color: st.color, backgroundColor: st.bg }}>
                      <span className="umt-status-dot" style={{ backgroundColor: st.color }}></span>
                      {st.label}
                    </span>
                  </td>
                  {activeTab === 'approved' && (
                    <td>
                      <div className="umt-rating">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <span>{user.rating}</span>
                      </div>
                    </td>
                  )}
                  <td>
                    <button className="umt-btn-detail" onClick={() => handleViewDetail(user)}>
                      Chi tiết
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="umt-footer">
        <span className="umt-footer-text">Hiển thị {users.length} kết quả</span>
      </div>
    </div>
  );
};
