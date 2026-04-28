import React, { useMemo, useState } from 'react';
import { FaCheck, FaCircleCheck } from 'react-icons/fa6';
import './TechnicianWalletPage.css';

type MethodId = 'momo' | 'zalopay' | 'vietqr';

const quickAmounts = [100000, 200000, 500000, 1000000];

const paymentMethods: Array<{
  id: MethodId;
  name: string;
  description: string;
  badgeClass: string;
  iconText: string;
}> = [
  {
    id: 'momo',
    name: 'Vi MoMo',
    description: 'Thanh toan nhanh qua ung dung MoMo',
    badgeClass: 'wallet-badge momo',
    iconText: 'M',
  },
  {
    id: 'zalopay',
    name: 'ZaloPay',
    description: 'Vi dien tu ZaloPay an toan tien loi',
    badgeClass: 'wallet-badge zalo',
    iconText: 'Z',
  },
  {
    id: 'vietqr',
    name: 'Chuyen khoan VietQR',
    description: 'Xu ly tu dong trong 30 giay',
    badgeClass: 'wallet-badge bank',
    iconText: 'B',
  },
];

const formatMoney = (amount: number) => `${amount.toLocaleString('vi-VN')}d`;

export const TechnicianWalletPage: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(quickAmounts[0]);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<MethodId>('vietqr');

  const finalAmount = useMemo(() => {
    const parsed = Number(customAmount.replace(/\D/g, ''));
    return parsed > 0 ? parsed : selectedAmount;
  }, [customAmount, selectedAmount]);

  return (
    <div className="wallet-page">
      <header className="wallet-page-header">
        <h1>Nap tien vao vi</h1>
      </header>

      <section className="wallet-panel">
        <div className="wallet-grid">
          <div className="wallet-step">
            <span className="step-label">Buoc 1</span>
            <h2>Chon so tien</h2>

            <div className="amount-grid">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  className={`amount-card ${customAmount ? '' : selectedAmount === amount ? 'active' : ''}`}
                  onClick={() => {
                    setCustomAmount('');
                    setSelectedAmount(amount);
                  }}
                  type="button"
                >
                  <span className="amount-card-note">Goi nap</span>
                  <strong>{formatMoney(amount)}</strong>
                </button>
              ))}
            </div>

            <div className="custom-amount-wrap">
              <label htmlFor="custom-amount">So tien khac</label>
              <div className="custom-input-box">
                <input
                  id="custom-amount"
                  placeholder="Nhap so tien..."
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value.replace(/\D/g, ''))}
                  inputMode="numeric"
                />
                <span>VND</span>
              </div>
            </div>
          </div>

          <div className="wallet-step">
            <span className="step-label">Buoc 2</span>
            <h2>Phuong thuc thanh toan</h2>

            <div className="methods-wrap">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className={`method-item ${selectedMethod === method.id ? 'active' : ''}`}
                  onClick={() => setSelectedMethod(method.id)}
                  type="button"
                >
                  <span className={method.badgeClass}>{method.iconText}</span>
                  <span className="method-copy">
                    <strong>{method.name}</strong>
                    <small>{method.description}</small>
                  </span>
                  <span className={`method-radio ${selectedMethod === method.id ? 'active' : ''}`} aria-hidden="true" />
                </button>
              ))}

              {selectedMethod === 'vietqr' && (
                <div className="bank-card">
                  <div className="bank-avatar" aria-hidden="true" />
                  <div className="bank-info">
                    <p>Ten tai khoan</p>
                    <h3>GLOWUP SERVICE</h3>
                    <p>So tai khoan</p>
                    <h3>123456789</h3>
                    <p>Ngan hang</p>
                    <h3>Techcombank</h3>
                  </div>
                </div>
              )}
            </div>

            <button className="confirm-btn" type="button">
              <FaCheck />
              Xac nhan da chuyen khoan
            </button>

            <p className="hint">* Vui long kiem tra ky so tien va noi dung chuyen khoan truoc khi xac nhan.</p>
          </div>
        </div>
      </section>

      <div className="wallet-footer-note">
        <span className="safe-icon"><FaCircleCheck /></span>
        <div>
          <strong>Ket noi bao mat</strong>
          <p>Giao dich duoc ma hoa 256-bit</p>
        </div>
      </div>

      <aside className="wallet-help-box">
        <span>Ho tro 24/7</span>
        <button type="button">Lien he ngay</button>
      </aside>

      <div className="wallet-total-chip">So tien nap: {formatMoney(finalAmount)}</div>
    </div>
  );
};

export default TechnicianWalletPage;
