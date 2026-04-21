import React from 'react';
import type {RequestData} from "../../types/RequestData.ts";
import type {UserRole} from "../../types/UserRole.ts";
import "./requestCard.css"

import { FaLocationDot, FaCreditCard } from 'react-icons/fa6';

interface RequestCardProps {
    data: RequestData;
    role: UserRole;
    onViewDetail: (id: string) => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({ data, role, onViewDetail }) => {
    return (
        <div className="request-card" onClick={() => onViewDetail(data.id)}>

            <div className="card-content">
                <div className="card-header">
                    <h3 className="person-name">
                        {role === 'technician' ? data.customerName : (data.technicianName || 'Chưa có thợ nhận')}
                    </h3>
                    <span className="time-badge">{data.timeAgo}</span>
                </div>
                <p className="device-name">{data.deviceName}</p>
                <p className="description-snippet">{data.description}</p>

                <div className="card-meta">
                    <span><FaLocationDot /> {data.address}</span>
                    <span><FaCreditCard /> Ước tính: {data.estPrice.toLocaleString('vi-VN')} VND</span>
                </div>
            </div>

            <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                {role === 'technician' ? (
                    <>
                        <button className="btn-primary">Chat & Báo giá</button>
                        <button className="btn-secondary">Từ chối</button>
                    </>
                ) : (
                    <>
                        <button className="btn-secondary">Hủy yêu cầu</button>
                        <button className="btn-primary" onClick={() => onViewDetail(data.id)}>Xem chi tiết</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RequestCard;