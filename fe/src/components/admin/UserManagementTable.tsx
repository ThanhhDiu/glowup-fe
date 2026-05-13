import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserManagementTable.css';

type UserRole = 'customer' | 'technician';
type UserStatus = 'verified' | 'pending' | 'locked';

interface User {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  district: 'Quận 1' | 'Quận 3' | 'Quận 7' | 'Thủ Đức';
  role: UserRole;
  status: UserStatus;
  serviceType?: string;
  orderCount: number;
  joinedAt: string;
  isVerified: boolean;
}

const initialUsers: User[] = [
  {
    id: 'GLW-9921',
    name: 'Phạm Hoàng Nam',
    avatar: 'https://i.pravatar.cc/150?img=12',
    phone: '090 123 4567',
    district: 'Quận 1',
    role: 'technician',
    status: 'verified',
    serviceType: 'Điện lạnh',
    orderCount: 124,
    joinedAt: '12/05/2023',
    isVerified: true,
  },
  {
    id: 'GLW-8842',
    name: 'Nguyễn Minh Tú',
    avatar: 'https://i.pravatar.cc/150?img=25',
    phone: '098 765 4321',
    district: 'Quận 7',
    role: 'technician',
    status: 'pending',
    serviceType: 'Máy giặt',
    orderCount: 8,
    joinedAt: '20/03/2026',
    isVerified: false,
  },
  {
    id: 'GLW-7710',
    name: 'Trần Huy',
    avatar: 'https://i.pravatar.cc/150?img=8',
    phone: '091 445 5667',
    district: 'Quận 3',
    role: 'technician',
    status: 'locked',
    serviceType: 'Tủ lạnh',
    orderCount: 61,
    joinedAt: '11/11/2024',
    isVerified: true,
  },
  {
    id: 'CUS-1182',
    name: 'Lê Ngọc Trâm',
    avatar: 'https://i.pravatar.cc/150?img=47',
    phone: '090 774 2244',
    district: 'Thủ Đức',
    role: 'customer',
    status: 'verified',
    orderCount: 15,
    joinedAt: '01/02/2025',
    isVerified: true,
  },
  {
    id: 'CUS-5590',
    name: 'Võ Thành An',
    avatar: 'https://i.pravatar.cc/150?img=58',
    phone: '093 222 1988',
    district: 'Quận 7',
    role: 'customer',
    status: 'pending',
    orderCount: 2,
    joinedAt: '19/04/2026',
    isVerified: false,
  },
  {
    id: 'CUS-7701',
    name: 'Nguyễn Thu Hà',
    avatar: 'https://i.pravatar.cc/150?img=32',
    phone: '097 778 4412',
    district: 'Quận 1',
    role: 'customer',
    status: 'verified',
    orderCount: 31,
    joinedAt: '09/09/2024',
    isVerified: true,
  },
  {
    id: 'GLW-3351',
    name: 'Đỗ Khánh Linh',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '086 999 1234',
    district: 'Thủ Đức',
    role: 'technician',
    status: 'verified',
    serviceType: 'Vệ sinh máy lạnh',
    orderCount: 83,
    joinedAt: '16/07/2025',
    isVerified: true,
  },
  {
    id: 'GLW-4402',
    name: 'Lê Quốc Khải',
    avatar: 'https://i.pravatar.cc/150?img=14',
    phone: '090 445 3321',
    district: 'Quận 1',
    role: 'technician',
    status: 'verified',
    serviceType: 'Điện nước',
    orderCount: 138,
    joinedAt: '03/03/2024',
    isVerified: true,
  },
  {
    id: 'GLW-4420',
    name: 'Ngô Văn Khang',
    avatar: 'https://i.pravatar.cc/150?img=19',
    phone: '096 118 2233',
    district: 'Quận 3',
    role: 'technician',
    status: 'pending',
    serviceType: 'Máy lạnh âm trần',
    orderCount: 12,
    joinedAt: '18/04/2026',
    isVerified: false,
  },
  {
    id: 'GLW-4521',
    name: 'Trịnh Hải Nam',
    avatar: 'https://i.pravatar.cc/150?img=24',
    phone: '088 557 6644',
    district: 'Thủ Đức',
    role: 'technician',
    status: 'locked',
    serviceType: 'Tủ đông',
    orderCount: 44,
    joinedAt: '27/08/2024',
    isVerified: true,
  },
  {
    id: 'GLW-4618',
    name: 'Phạm Đức Phúc',
    avatar: 'https://i.pravatar.cc/150?img=31',
    phone: '085 900 7712',
    district: 'Quận 7',
    role: 'technician',
    status: 'verified',
    serviceType: 'Máy giặt sấy',
    orderCount: 95,
    joinedAt: '14/10/2025',
    isVerified: true,
  },
  {
    id: 'GLW-4724',
    name: 'Vũ Tuấn Kiệt',
    avatar: 'https://i.pravatar.cc/150?img=42',
    phone: '092 771 5544',
    district: 'Quận 1',
    role: 'technician',
    status: 'verified',
    serviceType: 'Bảo trì hệ thống lạnh',
    orderCount: 167,
    joinedAt: '21/12/2023',
    isVerified: true,
  },
  {
    id: 'CUS-9902',
    name: 'Đinh Thảo My',
    avatar: 'https://i.pravatar.cc/150?img=52',
    phone: '097 111 8765',
    district: 'Quận 3',
    role: 'customer',
    status: 'verified',
    orderCount: 28,
    joinedAt: '22/01/2025',
    isVerified: true,
  },
  {
    id: 'CUS-9911',
    name: 'Hồ Trọng Phúc',
    avatar: 'https://i.pravatar.cc/150?img=54',
    phone: '090 220 7711',
    district: 'Quận 7',
    role: 'customer',
    status: 'pending',
    orderCount: 3,
    joinedAt: '12/04/2026',
    isVerified: false,
  },
  {
    id: 'CUS-9923',
    name: 'Tạ Quỳnh Anh',
    avatar: 'https://i.pravatar.cc/150?img=56',
    phone: '084 887 4567',
    district: 'Thủ Đức',
    role: 'customer',
    status: 'verified',
    orderCount: 19,
    joinedAt: '05/06/2025',
    isVerified: true,
  },
  {
    id: 'CUS-9936',
    name: 'Lâm Quốc Minh',
    avatar: 'https://i.pravatar.cc/150?img=57',
    phone: '091 678 0099',
    district: 'Quận 1',
    role: 'customer',
    status: 'locked',
    orderCount: 7,
    joinedAt: '17/02/2024',
    isVerified: true,
  },
  {
    id: 'CUS-9947',
    name: 'Trần Hồng Nhung',
    avatar: 'https://i.pravatar.cc/150?img=60',
    phone: '093 300 2244',
    district: 'Quận 7',
    role: 'customer',
    status: 'verified',
    orderCount: 42,
    joinedAt: '29/09/2024',
    isVerified: true,
  },
  {
    id: 'CUS-9955',
    name: 'Phan Nhật Quang',
    avatar: 'https://i.pravatar.cc/150?img=64',
    phone: '095 113 7788',
    district: 'Quận 3',
    role: 'customer',
    status: 'pending',
    orderCount: 1,
    joinedAt: '25/04/2026',
    isVerified: false,
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  verified: { label: 'Đã xác minh', color: '#d97706', bg: '#fff7e8' },
  pending: { label: 'Chờ duyệt', color: '#64748b', bg: '#f1f5f9' },
  locked: { label: 'Bị khóa', color: '#dc2626', bg: '#fee2e2' },
};

interface Props {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  searchKeyword: string;
  statusFilter: 'all' | UserStatus;
  onStatusFilterChange: (value: 'all' | UserStatus) => void;
  areaFilter: 'all' | 'Quận 1' | 'Quận 3' | 'Quận 7' | 'Thủ Đức';
  onAreaFilterChange: (value: 'all' | 'Quận 1' | 'Quận 3' | 'Quận 7' | 'Thủ Đức') => void;
}

export const UserManagementTable: React.FC<Props> = ({
  activeRole,
  onRoleChange,
  searchKeyword,
  statusFilter,
  onStatusFilterChange,
  areaFilter,
  onAreaFilterChange,
}) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const roleCounts = useMemo(
    () => ({
      customer: users.filter((user) => user.role === 'customer').length,
      technician: users.filter((user) => user.role === 'technician').length,
    }),
    [users]
  );

  const filteredUsers = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    return users.filter((user) => {
      const roleMatched = user.role === activeRole;
      const statusMatched = statusFilter === 'all' ? true : user.status === statusFilter;
      const areaMatched = areaFilter === 'all' ? true : user.district === areaFilter;
      const keywordMatched =
        keyword.length === 0
          ? true
          : user.name.toLowerCase().includes(keyword) ||
            user.phone.toLowerCase().includes(keyword) ||
            user.id.toLowerCase().includes(keyword);

      return roleMatched && statusMatched && areaMatched && keywordMatched;
    });
  }, [users, activeRole, statusFilter, areaFilter, searchKeyword]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
  }, [activeRole, searchKeyword, statusFilter, areaFilter]);

  const activePageUsersIds = paginatedUsers.map((user) => user.id);
  const isAllPageSelected = activePageUsersIds.length > 0 && activePageUsersIds.every((id) => selectedIds.includes(id));

  const handleViewDetail = (user: User) => {
    navigate(`/admin/users/${user.id}`, {
      state: {
        user: {
          ...user,
          serviceType: user.serviceType || 'Khách hàng',
          completedJobs: `${user.orderCount}`,
          status: user.status,
          isVerified: user.isVerified,
        },
        tab: user.status === 'pending' ? 'pending' : 'approved',
      },
    });
  };

  const toggleSelectPage = () => {
    if (isAllPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !activePageUsersIds.includes(id)));
      return;
    }

    setSelectedIds((prev) => Array.from(new Set([...prev, ...activePageUsersIds])));
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleLockStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== id) return user;
        return { ...user, status: user.status === 'locked' ? 'verified' : 'locked' };
      })
    );
  };

  const approveUser = (id: string) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status: 'verified', isVerified: true } : user)));
  };

  const exportCsv = () => {
    const headers = ['ID', 'Tên', 'Số điện thoại', 'Quận', 'Vai trò', 'Trạng thái', 'Ngày tham gia'];
    const rows = filteredUsers.map((user) => [
      user.id,
      user.name,
      user.phone,
      user.district,
      user.role,
      user.status,
      user.joinedAt,
    ]);
    const csv = [headers, ...rows].map((row) => row.map((col) => `"${col}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'admin-users.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="umt-container">
      <div className="umt-topbar">
        <div className="umt-tabs">
          <button className={`umt-tab ${activeRole === 'customer' ? 'active' : ''}`} onClick={() => onRoleChange('customer')}>
            <span>Khách hàng</span>
            <span className="umt-tab-count">{roleCounts.customer}</span>
          </button>
          <button className={`umt-tab ${activeRole === 'technician' ? 'active' : ''}`} onClick={() => onRoleChange('technician')}>
            <span>Thợ sửa chữa</span>
            <span className="umt-tab-count umt-count-pending">{roleCounts.technician}</span>
          </button>
        </div>

        <div className="umt-controls">
          <select
            className="umt-select"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as 'all' | UserStatus)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="verified">Đã xác minh</option>
            <option value="pending">Chờ duyệt</option>
            <option value="locked">Bị khóa</option>
          </select>

          <select
            className="umt-select"
            value={areaFilter}
            onChange={(e) => onAreaFilterChange(e.target.value as 'all' | 'Quận 1' | 'Quận 3' | 'Quận 7' | 'Thủ Đức')}
          >
            <option value="all">Tất cả khu vực</option>
            <option value="Quận 1">Quận 1</option>
            <option value="Quận 3">Quận 3</option>
            <option value="Quận 7">Quận 7</option>
            <option value="Thủ Đức">Thủ Đức</option>
          </select>

          <button className="umt-btn-export" onClick={exportCsv} type="button">
            Xuất CSV
          </button>
        </div>
      </div>

      <div className="umt-table-wrapper">
        <table className="umt-table">
          <thead>
            <tr>
              <th className="umt-col-check">
                <input type="checkbox" checked={isAllPageSelected} onChange={toggleSelectPage} aria-label="Chọn tất cả" />
              </th>
              <th>Thành viên</th>
              <th>Số điện thoại</th>
              <th>Quận hoạt động</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => {
              const st = statusConfig[user.status];
              return (
                <tr key={user.id} className="umt-row">
                  <td className="umt-col-check">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => toggleSelectOne(user.id)}
                      aria-label={`Chọn ${user.name}`}
                    />
                  </td>
                  <td>
                    <div className="umt-user-cell">
                      <img src={user.avatar} alt={user.name} className="umt-user-avatar" />
                      <div className="umt-user-info">
                        <span className="umt-user-name">{user.name}</span>
                        <span className="umt-user-id">ID: {user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="umt-phone">{user.phone}</td>
                  <td>
                    <span className="umt-service-tag">{user.district}</span>
                  </td>
                  <td>
                    <span className="umt-status-badge" style={{ color: st.color, backgroundColor: st.bg }}>
                      <span className="umt-status-dot" style={{ backgroundColor: st.color }}></span>
                      {st.label}
                    </span>
                  </td>
                  <td>
                    <div className="umt-actions">
                      <button className="umt-btn-detail" onClick={() => handleViewDetail(user)}>
                        Chi tiết
                      </button>

                      {user.status === 'pending' ?
                        <button className="umt-btn-secondary" onClick={() => approveUser(user.id)} type="button">
                          Duyệt
                        </button>
                      :
                        <button className="umt-btn-secondary" onClick={() => toggleLockStatus(user.id)} type="button">
                          {user.status === 'locked' ? 'Mở khóa' : 'Khóa'}
                        </button>
                      }
                    </div>
                  </td>
                </tr>
              );
            })}

            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="umt-empty">
                  Không có dữ liệu phù hợp bộ lọc hiện tại.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="umt-footer">
        <span className="umt-footer-text">
          Hiển thị {paginatedUsers.length} trong {filteredUsers.length} {activeRole === 'technician' ? 'thợ sửa chữa' : 'khách hàng'}
        </span>

        <div className="umt-pagination">
          <button className="umt-page-btn" onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={safePage === 1}>
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`umt-page-btn ${page === safePage ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="umt-page-btn"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safePage === totalPages}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};
