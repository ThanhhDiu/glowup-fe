import React, { useMemo, useState } from 'react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { FaArrowUpRightDots, FaEllipsis, FaGear } from 'react-icons/fa6';
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

const technicians = [
  { id: 'wr-1', name: 'Trần Anh Tuấn', balance: 125000, status: 'normal', totalDeducted: 2450000, lastOrder: '#TXN-882910', lastOrderDate: '24/05/2024 14:20' },
  { id: 'wr-2', name: 'Lê Minh Hoàng', balance: 18000, status: 'low', totalDeducted: 1980000, lastOrder: '#TXN-882905', lastOrderDate: '24/05/2024 13:15' },
  { id: 'wr-3', name: 'Phạm Văn Đức', balance: 5000, status: 'locked', totalDeducted: 3120000, lastOrder: '#TXN-882899', lastOrderDate: '24/05/2024 12:05' },
  { id: 'wr-4', name: 'Nguyễn Thị Hằng', balance: 68000, status: 'normal', totalDeducted: 1560000, lastOrder: '#TXN-882888', lastOrderDate: '23/05/2024 16:30' },
  { id: 'wr-5', name: 'Hoàng Quốc Bảo', balance: 21000, status: 'low', totalDeducted: 1230000, lastOrder: '#TXN-882880', lastOrderDate: '23/05/2024 09:20' },
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
  const [commissionFixed, setCommissionFixed] = useState('10000');
  const [minBalance, setMinBalance] = useState('20000');
  const [txTypeFilter, setTxTypeFilter] = useState<'all' | TxType>('all');
  const [techFilter, setTechFilter] = useState<'all' | 'normal' | 'low' | 'locked'>('all');

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
          <article className="afp-card afp-commission-card">
            <header className="afp-card-head">
              <h2>
                <FaGear />
                Cài đặt phí hoa hồng
              </h2>
              <button type="button" aria-label="Settings">
                <FaEllipsis />
              </button>
            </header>

            <div className="afp-commission-inner">
              <div className="afp-commission-left">
                <label className="afp-label">PHÍ HOA HỒNG CỐ ĐỊNH</label>
                <div className="afp-input-affix">
                  <input
                    value={commissionFixed}
                    onChange={(e) => setCommissionFixed(e.target.value.replace(/\D/g, ''))}
                    inputMode="numeric"
                  />
                  <span>đ</span>
                </div>
                <small className="afp-help">Phí này sẽ được tự động trừ từ ví hoa hồng của thợ khi đơn hàng hoàn thành.</small>
                <div className="afp-commission-meta">Cập nhật lần cuối: 24/05/2024 10:30 bởi Admin</div>
              </div>
              <div className="afp-commission-right">
                <span className="afp-status-badge active">Đang áp dụng</span>
                <button className="afp-primary-btn" type="button">Lưu thay đổi</button>
              </div>
            </div>
          </article>

          <article className="afp-card afp-rules-card">
            <header className="afp-card-head">
              <h2>
                <FaArrowUpRightDots />
                Quy tắc áp dụng
              </h2>
            </header>

            <div className="afp-rules-body">
              <ul>
                <li>Phí hoa hồng được áp dụng cho tất cả đơn hàng hoàn thành.</li>
                <li>Hệ thống sẽ trừ trước từ ví hoa hồng của thợ.</li>
                <li>Nếu số dư ví hoa hồng không đủ, thợ sẽ bị khóa nhận đơn mới.</li>
              </ul>

              <label className="afp-label">QUY ĐỊNH SỐ DƯ TỐI THIỂU</label>
              <div className="afp-input-affix">
                <input value={minBalance} onChange={(e) => setMinBalance(e.target.value.replace(/\D/g, ''))} inputMode="numeric" />
                <span>đ</span>
              </div>

              <button className="afp-secondary-btn" type="button">Cập nhật</button>
            </div>
          </article>

          
        </section>

        <section className="afp-tech-status">
          <div className="afp-tech-status-head">
            <h3>Tình trạng ví hoa hồng của thợ</h3>
            <div className="afp-tech-tabs">
              <button className={techFilter === 'all' ? 'active' : ''} onClick={() => setTechFilter('all')}>Tất cả</button>
              <button className={techFilter === 'normal' ? 'active' : ''} onClick={() => setTechFilter('normal')}>Bình thường</button>
              <button className={techFilter === 'low' ? 'active' : ''} onClick={() => setTechFilter('low')}>Sắp hết</button>
              <button className={techFilter === 'locked' ? 'active' : ''} onClick={() => setTechFilter('locked')}>Đã khóa</button>
            </div>
          </div>

          <div className="afp-tech-list">
            <div className="afp-tech-row afp-tech-head">
              <span>THỢ</span>
              <span>SỐ DƯ VÍ HOA HỒNG</span>
              <span>TRẠNG THÁI</span>
              <span>TỔNG PHÍ ĐÃ TRỪ</span>
              <span>ĐƠN GẦN NHẤT</span>
              <span />
            </div>
            {technicians
              .filter((t) => techFilter === 'all' ? true : t.status === techFilter)
              .map((t) => (
                <div className="afp-tech-row" key={t.id}>
                  <span className="afp-tech-name">
                    <div className="afp-avatar small">{t.name.split(' ').map(n => n[0]).slice(-2).join('')}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <small>{t.id.toUpperCase()}</small>
                    </div>
                  </span>
                  <span className={t.balance > 0 ? 'afp-amount-in' : 'afp-amount-out'}>{t.balance.toLocaleString('vi-VN')}đ</span>
                  <span className={`afp-td-status ${t.status}`}>{t.status === 'normal' ? 'Bình thường' : t.status === 'low' ? 'Sắp hết' : 'Đã khóa'}</span>
                  <span>{t.totalDeducted.toLocaleString('vi-VN')}đ</span>
                  <span>
                    <strong>{t.lastOrder}</strong>
                    <small>{t.lastOrderDate}</small>
                  </span>
                  <span><button className="afp-more-btn">...</button></span>
                </div>
              ))}
          </div>
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