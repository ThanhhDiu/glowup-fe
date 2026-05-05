import React, { useMemo, useState } from 'react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { FaArrowUpRightDots, FaBuildingColumns, FaEllipsis, FaGear, FaMoneyBillTransfer } from 'react-icons/fa6';
import './AdminFinancePage.css';

type TxStatus = 'done' | 'pending';
type TxType = 'commission' | 'withdraw' | 'topup';

type FinanceTx = {
  id: string;
  time: string;
  date: string;
  partner: string;
  area: string;
  type: TxType;
  amount: number;
  status: TxStatus;
};

const withdrawRequests = [
  {
    id: 'wr-1',
    name: 'Trần Anh Tuấn',
    amount: 2500000,
    bank: 'Vietcombank',
    account: '0071901232***',
    avatar: 'TA',
  },
  {
    id: 'wr-2',
    name: 'Lê Minh Hoàng',
    amount: 1200000,
    bank: 'MB Bank',
    account: '190332884***',
    avatar: 'LM',
  },
];

const transactions: FinanceTx[] = [
  {
    id: '#TXN-882910',
    time: '14:20',
    date: '24/05/2024',
    partner: 'Thái Ngọc',
    area: 'HCMC, Quận 1',
    type: 'commission',
    amount: 125000,
    status: 'done',
  },
  {
    id: '#TXN-882909',
    time: '13:15',
    date: '24/05/2024',
    partner: 'Phạm Tuấn',
    area: 'HCMC, Thủ Đức',
    type: 'withdraw',
    amount: -2500000,
    status: 'pending',
  },
  {
    id: '#TXN-882908',
    time: '11:45',
    date: '24/05/2024',
    partner: 'Minh Đức',
    area: 'HCMC, Quận 7',
    type: 'topup',
    amount: 500000,
    status: 'done',
  },
];

const typeLabel: Record<TxType, string> = {
  commission: 'HOA HỒNG',
  withdraw: 'RÚT TIỀN',
  topup: 'NẠP TIỀN',
};

const statusLabel: Record<TxStatus, string> = {
  done: 'Hoàn tất',
  pending: 'Chờ duyệt',
};

const money = (value: number) => `${value > 0 ? '+' : ''}${value.toLocaleString('vi-VN')}đ`;

const AdminFinancePage: React.FC = () => {
  const [commissionPercent, setCommissionPercent] = useState('15');
  const [txTypeFilter, setTxTypeFilter] = useState<'all' | TxType>('all');

  const feePreview = useMemo(() => {
    const input = Number(commissionPercent.replace(/\D/g, '')) || 0;
    const sampleOrder = 1000000;
    const fee = Math.round((sampleOrder * input) / 100);

    return {
      fee,
      remaining: sampleOrder - fee,
    };
  }, [commissionPercent]);

  const filteredTransactions = useMemo(() => {
    if (txTypeFilter === 'all') return transactions;
    return transactions.filter((item) => item.type === txTypeFilter);
  }, [txTypeFilter]);

  return (
    <div className="afp-layout">
      <AdminSidebar activeItem="finance" />
      <main className="afp-main">
        <AdminHeader />

        <section className="afp-title-row">
          <div>
            <h1>Quản lý Ví & Hoa hồng</h1>
            <p>Theo dõi nguồn thu tài chính và duyệt toàn bộ giao dịch thu/rút.</p>
          </div>
          <div className="afp-total-chip">
            <span>Tổng quát hệ thống</span>
            <strong>1.450.000.000đ</strong>
          </div>
        </section>

        <section className="afp-card-grid">
          <article className="afp-card">
            <header className="afp-card-head">
              <h2>
                <FaGear />
                Cấu hình hoa hồng
              </h2>
              <button type="button" aria-label="Settings">
                <FaEllipsis />
              </button>
            </header>

            <label className="afp-label" htmlFor="commission-percent">Chiết khấu hệ thống (%)</label>
            <div className="afp-input-affix">
              <input
                id="commission-percent"
                value={commissionPercent}
                onChange={(event) => setCommissionPercent(event.target.value.replace(/\D/g, ''))}
                inputMode="numeric"
              />
              <span>%</span>
            </div>

            <div className="afp-preview-box">
              <p>Xem trước trên đơn 1.000.000đ</p>
              <div>
                <span>Hoa hồng GlowUp ({commissionPercent || 0}%)</span>
                <strong>{feePreview.fee.toLocaleString('vi-VN')}đ</strong>
              </div>
              <div>
                <span>Thợ nhận được</span>
                <strong>{feePreview.remaining.toLocaleString('vi-VN')}đ</strong>
              </div>
            </div>

            <button className="afp-primary-btn" type="button">Cập nhật cấu hình</button>
          </article>

          <article className="afp-card">
            <header className="afp-card-head">
              <h2>
                <FaArrowUpRightDots />
                Điều chỉnh thủ công
              </h2>
            </header>

            <div className="afp-form-grid">
              <label>
                <span>Mã/tên thợ</span>
                <input type="text" placeholder="Nhập ID hoặc họ tên..." />
              </label>
              <label>
                <span>Số tiền (VND)</span>
                <input type="text" placeholder="0" inputMode="numeric" />
              </label>
              <label>
                <span>Loại</span>
                <select defaultValue="commission-minus">
                  <option value="commission-plus">Cộng tiền (+)</option>
                  <option value="commission-minus">Trừ tiền (-)</option>
                </select>
              </label>
            </div>

            <label className="afp-note-area">
              <span>Lý do điều chỉnh</span>
              <textarea placeholder="Nhập lý do chi tiết..." rows={4} />
            </label>

            <button className="afp-secondary-btn" type="button">Xác nhận điều chỉnh</button>
          </article>

          <article className="afp-card">
            <header className="afp-card-head">
              <h2>
                <FaMoneyBillTransfer />
                Yêu cầu rút tiền
              </h2>
              <span className="afp-badge">3 chờ duyệt</span>
            </header>

            <div className="afp-request-list">
              {withdrawRequests.map((item) => (
                <div className="afp-request-item" key={item.id}>
                  <div className="afp-request-top">
                    <div className="afp-avatar">{item.avatar}</div>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.id.toUpperCase()}</small>
                    </div>
                    <b>{item.amount.toLocaleString('vi-VN')}đ</b>
                  </div>
                  <div className="afp-bank-row">
                    <FaBuildingColumns />
                    <span>{item.bank}</span>
                    <small>{item.account}</small>
                  </div>
                  <button type="button">Xác nhận đã chuyển khoản</button>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="afp-table-wrap">
          <div className="afp-table-head-row">
            <h3>Lịch sử giao dịch hệ thống</h3>
            <div className="afp-table-filters">
              <select value={txTypeFilter} onChange={(event) => setTxTypeFilter(event.target.value as 'all' | TxType)}>
                <option value="all">Tất cả loại giao dịch</option>
                <option value="commission">Hoa hồng</option>
                <option value="withdraw">Rút tiền</option>
                <option value="topup">Nạp tiền</option>
              </select>
              <input type="date" />
            </div>
          </div>

          <div className="afp-table">
            <div className="afp-table-head">
              <span>Mã giao dịch</span>
              <span>Thời gian</span>
              <span>Đối tác/Người dùng</span>
              <span>Loại</span>
              <span>Số tiền</span>
              <span>Trạng thái</span>
              <span>Thao tác</span>
            </div>

            {filteredTransactions.map((item) => (
              <div className="afp-table-row" key={item.id}>
                <span>{item.id}</span>
                <span>
                  <strong>{item.time}</strong>
                  <small>{item.date}</small>
                </span>
                <span>
                  <strong>{item.partner}</strong>
                  <small>{item.area}</small>
                </span>
                <span>
                  <b className={`afp-pill ${item.type}`}>{typeLabel[item.type]}</b>
                </span>
                <span className={item.amount < 0 ? 'afp-amount-out' : 'afp-amount-in'}>{money(item.amount)}</span>
                <span className={`afp-status ${item.status}`}>{statusLabel[item.status]}</span>
                <span>
                  <button className="afp-more-btn" type="button" aria-label="More actions">
                    <FaEllipsis />
                  </button>
                </span>
              </div>
            ))}
          </div>

          <footer className="afp-table-footer">
            <p>Hiển thị 3 trên tổng số 1.240 giao dịch</p>
            <div>
              <button type="button">&lt;</button>
              <button type="button" className="active">1</button>
              <button type="button">2</button>
              <button type="button">&gt;</button>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default AdminFinancePage;