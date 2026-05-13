import React from "react";
import Modal from "../common/Modal";
import "./css/reportModal.css";
import { X } from "lucide-react";

interface ReportModalProps {
    open: boolean;
    onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="report-modal">
                {/* HEADER */}
                <header className="report-header">
                    <div className="header-info">
                        <h2 className="title text-danger">BÁO CÁO SỰ CỐ / KHIẾU NẠI</h2>
                        <span className="sub">Đơn hàng #GU-99210</span>
                    </div>

                    <button
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Đóng"
                    >
                        <X size={24} />
                    </button>
                </header>

                {/* BODY */}
                <div className="report-body">
                    <div className="notice danger-notice">
                        Đội ngũ GlowUp sẽ tiếp nhận và xử lý khiếu nại của bạn trong vòng 24h làm việc.
                    </div>

                    {/* LÝ DO KHIẾU NẠI */}
                    <div className="form-group">
                        <label htmlFor="report-reason">VẤN ĐỀ BẠN GẶP PHẢI</label>
                        <select id="report-reason" className="report-select">
                            <option value="">-- Chọn lý do --</option>
                            <option value="attitude">Thợ có thái độ không tốt/bất lịch sự</option>
                            <option value="extra_fee">Thợ yêu cầu thu thêm phụ phí ngoài hệ thống</option>
                            <option value="incomplete">Thợ chưa sửa xong nhưng đã báo hoàn thành</option>
                            <option value="damage">Thợ làm hư hỏng tài sản/thiết bị</option>
                            <option value="other">Lý do khác</option>
                        </select>
                    </div>

                    {/* MÔ TẢ CHI TIẾT */}
                    <div className="form-group">
                        <label htmlFor="report-desc">MÔ TẢ CHI TIẾT</label>
                        <textarea
                            id="report-desc"
                            placeholder="Vui lòng cung cấp thêm thông tin chi tiết để GlowUp hỗ trợ bạn tốt nhất..."
                        />
                    </div>

                    {/* BẰNG CHỨNG */}
                    <div className="form-group">
                        <label>BẰNG CHỨNG (HÌNH ẢNH/VIDEO)</label>
                        <div className="upload-box" role="button" tabIndex={0}>
                            TẢI ẢNH LÊN
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <footer className="report-footer">
                    <button className="btn-text" onClick={onClose}>
                        Hủy bỏ
                    </button>
                    <button className="btn-solid-danger" onClick={() => console.log("Đã gửi khiếu nại!")}>
                        Gửi khiếu nại
                    </button>
                </footer>
            </div>
        </Modal>
    );
};

export default ReportModal;