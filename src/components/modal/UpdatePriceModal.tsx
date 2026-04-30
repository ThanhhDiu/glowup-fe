import React from "react";
import Modal from "../common/Modal";
import "./css/updatePriceModal.css";

interface UpdatePriceModalProps {
    open: boolean;
    onClose: () => void;
    // We could add more props here to make it dynamic
}

const UpdatePriceModal: React.FC<UpdatePriceModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="update-modal">
                {/* HEADER */}
                <header className="update-header">
                    <h2 className="update-title">
                        CẬP NHẬT CHI PHÍ THỰC TẾ
                    </h2>
                    <p className="update-sub">
                        Vui lòng kiểm tra và xác nhận thay đổi chi phí sửa chữa
                    </p>
                </header>

                {/* BODY */}
                <div className="update-body">
                    {/* PRICE BLOCK */}
                    <div className="price-section">
                        <div className="price-old">
                            <span className="label">GIÁ DỰ KIẾN BAN ĐẦU</span>
                            <div className="price-row">
                                <span className="price">450.000</span>
                                <span className="currency">VNĐ</span>
                            </div>
                            <small className="note">
                                Dựa trên khảo sát online
                            </small>
                        </div>

                        <div className="price-new">
                            <span className="label gold">GIÁ THỰC TẾ MỚI</span>
                            <div className="price-row">
                                <span className="price big">600.000</span>
                                <span className="currency">VNĐ</span>
                            </div>
                            <div className="badge">
                                TĂNG 150.000VNĐ
                            </div>
                        </div>
                    </div>

                    {/* REASON */}
                    <div className="reason-section">
                        <h3 className="section-title">LÝ DO ĐIỀU CHỈNH</h3>
                        <div className="reason-box">
                            Phát sinh thay thế tụ điện do cháy nổ linh kiện cũ
                            trong quá trình vận hành lâu ngày. Linh kiện mới là
                            hàng chính hãng Samsung, bảo hành 6 tháng.
                        </div>
                    </div>

                    {/* IMAGES */}
                    <div className="image-section">
                        <div className="image-header">
                            <h3 className="section-title">
                                HÌNH ẢNH LINH KIỆN HƯ HỎNG
                            </h3>
                            <span className="image-count">
                                3 ảnh đính kèm
                            </span>
                        </div>

                        <div className="image-list">
                            <img src="https://placehold.co/128x128" alt="Linh kiện hỏng 1" />
                            <img src="https://placehold.co/128x128" alt="Linh kiện hỏng 2" />
                            <img src="https://placehold.co/128x128" alt="Linh kiện hỏng 3" />
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <footer className="update-footer">
                    <button className="btn-outline" onClick={() => console.log("Chat with provider")}>
                        Chat với thợ
                    </button>

                    <button className="btn-primary" onClick={onClose}>
                        Xác nhận giá mới
                    </button>
                </footer>

                <div className="update-bottom-note">
                    BẢO VỆ BỞI CHÍNH SÁCH GLOWUP CARE
                </div>
            </div>
        </Modal>
    );
};

export default UpdatePriceModal;
