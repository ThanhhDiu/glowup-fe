import React, { useState } from 'react';
import './ChangePasswordTab.css';

export const ChangePasswordTab: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage('Vui lòng nhập đầy đủ mật khẩu mới và xác nhận.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Mật khẩu xác nhận chưa khớp.');
      return;
    }

    setMessage('Đổi mật khẩu thành công.');
  };

  return (
    <section className="cp-tab-card">
      <div className="cp-tab-header">
        <h2>Đổi mật khẩu</h2>
        <p>Cập nhật mật khẩu ngay trong hồ sơ của bạn.</p>
      </div>

      <form className="cp-form" onSubmit={onSubmit}>
        <label className="cp-field">
          <span>Mật khẩu mới *</span>
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="Nhập mật khẩu mới"
          />
        </label>

        <label className="cp-field">
          <span>Xác nhận mật khẩu mới *</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Nhập lại mật khẩu mới"
          />
        </label>

        {message ? <div className="cp-message">{message}</div> : null}

        <button className="cp-submit" type="submit">Xác nhận đổi mật khẩu</button>
      </form>
    </section>
  );
};

export default ChangePasswordTab;