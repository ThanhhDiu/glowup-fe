import React, { useState } from 'react';
import './RecentOrdersTable.css';

interface Order {
  id: number;
  customer: string;
  service: string;
  provider: string;
  status: 'Đã hoàn thành' | 'Đang xử lý' | 'Chờ xác nhận';
  date: string;
  amount: string;
}

export const RecentOrdersTable: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      service: 'Sửa Mãy lạnh',
      provider: 'Trần Minh Tâm',
      status: 'Đã hoàn thành',
      date: '10:30, 24/05',
      amount: '₫450k',
    },
    {
      id: 2,
      customer: 'Lê Thị B',
      service: 'Sửa Mãy giặt LG',
      provider: 'Hoàng Văn Dũng',
      status: 'Đã hoàn thành',
      date: '11:15, 24/05',
      amount: '₫600k',
    },
    {
      id: 3,
      customer: 'Phạm Hùng',
      service: 'Bảo trì lạnh',
      provider: 'Lý Gia Thành',
      status: 'Đang xử lý',
      date: '12:05, 24/05',
      amount: '₫350k',
    },
    {
      id: 4,
      customer: 'Ế ơ Hoàng',
      service: 'Sửa bình nóng lạnh',
      provider: 'Vũ Ức Nam',
      status: 'Chờ xác nhận',
      date: '12:30, 24/05',
      amount: '₫280k',
    },
    {
      id: 5,
      customer: 'Trần Anh',
      service: 'Sửa Tủ lạnh',
      provider: 'Bùi Văn Tuấn',
      status: 'Đã hoàn thành',
      date: '13:00, 24/05',
      amount: '₫520k',
    },
  ]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Đã hoàn thành':
        return 'rot-status-completed';
      case 'Đang xử lý':
        return 'rot-status-processing';
      case 'Chờ xác nhận':
        return 'rot-status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="rot-container">
      <div className="rot-header">
        <h2 className="rot-title">Đơn hàng gần đây</h2>
        <a href="#" className="rot-view-all">
          Xem tất cả
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      </div>

      <div className="rot-table-wrapper">
        <table className="rot-table">
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Thợ thực hiện</th>
              <th>Dịch vụ</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
              <th>Tiền thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="rot-table-row">
                <td>
                  <div className="rot-customer-info">
                    <div className="rot-avatar">{order.customer.charAt(0)}</div>
                    <div className="rot-customer-details">
                      <div className="rot-customer-name">{order.customer}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="rot-provider-info">
                    <div className="rot-provider-avatar">{order.provider.charAt(0)}</div>
                    <div className="rot-provider-name">{order.provider}</div>
                  </div>
                </td>
                <td>
                  <div className="rot-service">{order.service}</div>
                </td>
                <td>
                  <span className={`rot-status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="rot-date">{order.date}</div>
                </td>
                <td>
                  <div className="rot-amount">{order.amount}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
