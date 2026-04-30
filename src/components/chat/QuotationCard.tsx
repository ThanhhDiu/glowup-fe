import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Chat.module.css';

interface QuotationCardProps {
    serviceName?: string;
    description?: string;
    price?: number;
    isTechnician?: boolean;
    isBooked?: boolean;
    previewMode?: boolean; // New prop for static preview
    onAccept?: () => void;
    onReject?: () => void;
}

export const QuotationCard: React.FC<QuotationCardProps> = ({
    serviceName = "Dịch vụ sửa chữa",
    description = "Chưa có mô tả chi tiết.",
    price = 0,
    isTechnician = true,
    isBooked = false,
    previewMode = false,
    onAccept,
    onReject
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const [dateTime, setDateTime] = useState<Date | null>(new Date());
    const [locked, setLocked] = useState(isBooked || previewMode);

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('vi-VN').format(value);
    };

    const formatDisplay = () => {
        if (!dateTime) return "Chọn lịch";
        const time = dateTime.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
        const date = dateTime.toLocaleDateString('vi-VN');
        return `${time} - ${date}`;
    };

    const canEdit = isTechnician && !locked;

    return (
        <>
            <div className={styles.quotationCard}>
                <div className={styles.quotationHeaderLine} />

                <div className={styles.quotationBody}>

                    {/* HEADER */}
                    <div className={styles.quotationTop}>
                        <div>
                            <p className={styles.labelCaps}>BÁO GIÁ DỊCH VỤ</p>
                            <h3 className={styles.serviceTitle}>{serviceName}</h3>
                        </div>
                        <div>🛠️</div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className={styles.descriptionSection}>
                        <p className={styles.labelCaps}>MÔ TẢ TÌNH TRẠNG</p>
                        <p className={styles.descriptionText}>{description}</p>
                    </div>

                    {/* SCHEDULE */}
                    <div
                        className={`${styles.scheduleBox} ${!canEdit ? styles.disabled : ''
                            }`}
                        onClick={() => {
                            if (canEdit) setShowPicker(true);
                        }}
                    >
                        <div className={styles.scheduleIcon}></div>

                        <div className={styles.scheduleContent}>
                            <p className={styles.scheduleLabel}>
                                Lịch hẹn dự kiến
                            </p>
                            <p className={styles.scheduleValue}>
                                {formatDisplay()}
                            </p>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className={styles.quotationFooter}>
                        <div>
                            <p className={styles.labelCaps}>CHI PHÍ DỰ KIẾN</p>
                            <div>
                                <p className={styles.priceDisplay}>
                                    <span className={styles.currency}>{formatPrice(price)} VNĐ</span>
                                    <span className={styles.note}> * Đã bao gồm vật tư</span>
                                </p>
                            </div>

                        </div>

                        {!previewMode && (
                            <div className={styles.actionGroup}>
                                <button
                                    className={styles.btnSecondary}
                                    onClick={onReject}
                                    disabled={locked}
                                >
                                    Từ chối
                                </button>

                                <button
                                    className={styles.btnPrimary}
                                    onClick={() => {
                                        setLocked(true); // 🔒 LOCK
                                        onAccept?.();
                                    }}
                                    disabled={locked}
                                >
                                    Đồng ý & Đặt đơn
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 🔥 POPUP OVERLAY */}
            {showPicker && (
                <div
                    className={styles.overlay}
                    onClick={() => setShowPicker(false)}
                >
                    <div
                        className={styles.popup}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DatePicker
                            selected={dateTime}
                            onChange={(date) => setDateTime(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            dateFormat="dd/MM/yyyy HH:mm"
                            inline
                            minDate={new Date()} // ❌ không chọn ngày quá khứ
                        />

                        <div className={styles.popupActions}>
                            <button onClick={() => setShowPicker(false)}>
                                Huỷ
                            </button>
                            <button
                                className={styles.btnPrimary}
                                onClick={() => setShowPicker(false)}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};