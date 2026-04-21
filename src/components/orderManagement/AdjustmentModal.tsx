import React from 'react';
import { FaXmark, FaPlus, FaCamera } from 'react-icons/fa6';
import "./adjustmentModal.css"

interface ModalProps {
    currentPrice: number;
    onClose: () => void;
    onSubmit: (newPrice: number) => void;
}

export const AdjustmentModal: React.FC<ModalProps> = ({ currentPrice, onClose, onSubmit }) => {
    const adjustedPrice = 600000;

    const diff = adjustedPrice - currentPrice;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Điều chỉnh Chi phí Thực tế</h2>
                    <button className="icon-btn" onClick={onClose}><FaXmark /></button>
                </div>

                <div className="modal-body">
                    {/* So sánh giá */}
                    <div className="price-compare-box">
                        <div className="old-price">
                            <label>Giá dự kiến ban đầu</label>
                            <span className="strike-through">{currentPrice.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className="new-price">
                            <label>Tổng chi phí thực tế mới</label>
                            <div className="new-val-row">
                                <h1>{adjustedPrice.toLocaleString('vi-VN')}đ</h1>
                                {diff > 0 && <span className="diff-tag text-blue">Tăng +{diff.toLocaleString('vi-VN')}đ</span>}
                            </div>
                        </div>
                    </div>

                    {/* Khối chia 2 cột cho chi tiết */}
                    <div className="modal-split-row">
                        <div className="col-left">
                            <div className="section-head">
                                <h3>Danh mục Vật tư & Linh kiện</h3>
                                <button className="btn-text"><FaPlus /> Thêm linh kiện</button>
                            </div>
                            <div className="part-item-gray">
                                <div>
                                    <strong>Thay tụ quạt dàn lạnh</strong>
                                    <p>Mã: CAP-D822</p>
                                </div>
                                <span>150.000đ</span>
                            </div>

                            <div className="section-head mt-4">
                                <h3>Lý do điều chỉnh</h3>
                            </div>
                            <textarea
                                className="reason-input"
                                placeholder="Giải thích rõ nguyên nhân phát sinh (ví dụ: thay tụ điện do cháy nổ, bảo hành linh kiện...)"
                            ></textarea>
                        </div>

                        <div className="col-right">
                            <div className="section-head">
                                <h3>Hình ảnh minh chứng</h3>
                            </div>
                            <div className="photo-grid-mini">
                                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100" alt="Ev" />
                                <img src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=100" alt="Ev" />
                                <div className="upload-box-mini">
                                    <FaCamera className="icon"/>
                                    <span>Tải ảnh lên</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-outline" onClick={onClose}>Hủy bỏ</button>
                    <button className="btn-solid" onClick={() => onSubmit(adjustedPrice)}>
                        Gửi báo giá điều chỉnh
                    </button>
                </div>
            </div>
        </div>
    );
};