import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaArrowTrendUp, FaArrowTrendDown, FaClockRotateLeft, FaWallet } from 'react-icons/fa6';
import './TechnicianWalletPage.css';

type HistoryFilter = 'all' | 'income' | 'expense';

type HistoryRow = {
  id: string;
  date: string;
  title: string;
  category: string;
  amount: number;
  status: 'success' | 'pending';
};

const historyData: HistoryRow[] = [
  { id: 'TX-240524-01', date: '24/05/2024', title: 'Phi hoa hong don #102', category: 'DICH VU/HOA HONG', amount: -50000, status: 'success' },
  { id: 'TX-240524-02', date: '24/05/2024', title: 'Nap tien qua MoMo', category: 'NAP TIEN', amount: 500000, status: 'success' },
  { id: 'TX-230524-01', date: '23/05/2024', title: 'Rut tien ve Vietcombank', category: 'RUT TIEN', amount: -1000000, status: 'pending' },
];

const formatMoney = (amount: number) =>
  `${amount < 0 ? '-' : '+'}${Math.abs(amount).toLocaleString('vi-VN')}đ`;

const filterCounts: Record<HistoryFilter, number> = {
  all: historyData.length,
  income: historyData.filter((item) => item.amount > 0).length,
  expense: historyData.filter((item) => item.amount < 0).length,
};

export const TechnicianWalletPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>('all');

  const visibleHistory = useMemo(() => {
    if (activeFilter === 'income') {
      return historyData.filter((item) => item.amount > 0);
    }

    if (activeFilter === 'expense') {
      return historyData.filter((item) => item.amount < 0);
    }

    return historyData;
  }, [activeFilter]);

  return (
    <div className="wallet-home">
      <header className="wallet-home-header">
        <div>
          <p className="wallet-home-kicker">GlowUp Service</p>
          <h1>Ví tiền của tôi</h1>
        </div>

        {/* wallet-online-pill intentionally removed; global header shows status */}
      </header>

      <section className="wallet-balance-card">
        <div className="wallet-balance-copy">
          <span className="wallet-balance-label"><FaWallet /> Số dư hiện tại</span>
          <strong>1.500.000đ</strong>
          <p>Số dư khả dụng để rút hoặc thanh toán các dịch vụ trong hệ thống GlowUp.</p>
        </div>

        <div className="wallet-balance-art" aria-hidden="true">
          <div className="wallet-balance-wave" />
        </div>
      </section>

      <section className="wallet-actions-grid">
        <button className="wallet-action-card" onClick={() => navigate('/technician/wallet/topup')} type="button">
          <span className="wallet-action-icon"><FaArrowTrendUp /></span>
          <span>
            <strong>Nạp tiền vào ví</strong>
            <small>Hỗ trợ ngân hàng và ví điện tử</small>
          </span>
          <FaArrowRight />
        </button>

        <button className="wallet-action-card" onClick={() => navigate('/technician/wallet/withdraw')} type="button">
          <span className="wallet-action-icon light"><FaArrowTrendDown /></span>
          <span>
            <strong>Rút tiền về ngân hàng</strong>
            <small>Xử lý nhanh trong 24h</small>
          </span>
          <FaArrowRight />
        </button>
      </section>

      <section className="wallet-history-card">
        <div className="wallet-history-header">
          <div>
            <p className="wallet-section-kicker"><FaClockRotateLeft /> Lịch sử giao dịch</p>
            <h2>Giao dịch gần đây</h2>
          </div>

          <div className="wallet-filter-tabs">
            {(['all', 'income', 'expense'] as HistoryFilter[]).map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? 'active' : ''}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter === 'all' ? 'Tất cả' : filter === 'income' ? 'Thu nhập' : 'Chi phí'}
                <span>{filterCounts[filter]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="wallet-history-table">
          <div className="wallet-history-head">
            <span>Ngày giao dịch</span>
            <span>Loại giao dịch</span>
            <span>Số tiền</span>
            <span>Trạng thái</span>
          </div>

          {visibleHistory.map((item) => (
            <div className="wallet-history-row" key={item.id}>
              <span>{item.date}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.category}</small>
              </span>
              <span className={item.amount > 0 ? 'amount-in' : 'amount-out'}>{formatMoney(item.amount)}</span>
              <span>
                <b className={`wallet-status ${item.status}`}>{item.status === 'success' ? 'Thành công' : 'Đang xử lý'}</b>
              </span>
            </div>
          ))}
        </div>

        <div className="wallet-history-footer">
          <span>Hiển thị 3 giao dịch gần nhất</span>
          <button type="button">Xem tất cả lịch sử</button>
        </div>
      </section>
    </div>
  );
};

export default TechnicianWalletPage;
