import React from "react";
import Modal from "../common/Modal";
import "./css/warrantyModal.css";
import { X } from "lucide-react";

interface WarrantyModalProps {
    open: boolean;
    onClose: () => void;
}

const WarrantyModal: React.FC<WarrantyModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="warranty-modal">
                {/* HEADER */}
                <header className="warranty-header">
                    <div className="header-info">
                        <h2 className="title">YÊU CẦU BẢO HÀNH</h2>
                        <span className="sub">Đơn hàng #GU-99210</span>
                    </div>

                    <button
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </header>

                {/* BODY */}
                <div className="warranty-body">
                    <div className="notice">
                        Bảo hành miễn phí theo chính sách của GlowUp
                    </div>

                    {/* DESCRIPTION */}
                    <div className="form-group">
                        <label htmlFor="warranty-desc">MÔ TẢ SỰ CỐ TÁI PHÁT</label>
                        <textarea
                            id="warranty-desc"
                            placeholder="Vui lòng mô tả chi tiết vấn đề bạn đang gặp phải..."
                        />
                    </div>

                    {/* IMAGE */}
                    <div className="form-group">
                        <label>ẢNH CHỤP BẰNG CHỨNG (1-2 ẢNH)</label>
                        <div className="upload-box" role="button" tabIndex={0}>
                            TẢI ẢNH LÊN
                        </div>
                    </div>

                    {/* DATE */}
                    <div className="form-group">
                        <label>LỊCH HẸN KIỂM TRA</label>
                        <div className="datetime-row">
                            <input type="date" className="date-input" />
                            <input type="time" className="time-input" />
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <footer className="warranty-footer">
                    <button className="btn-primary" onClick={() => console.log("Submitting warranty claim")}>
                        Gửi yêu cầu bảo hành
                    </button>

                    <button className="btn-text" onClick={onClose}>
                        Quay lại
                    </button>
                </footer>
            </div>
        </Modal>
    );
};

export default WarrantyModal;
