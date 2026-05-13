import React, { useState } from 'react';
import './orderManagementPage.css';

import type { RequestData } from "../types/RequestData.ts";
import type { UserRole } from "../types/UserRole.ts";
import type { ScheduledOrder } from "../types/ScheduledOrder.ts";
import type { InProgressOrder } from "../types/InProgressOrder.ts";
import type { CompletedOrder } from "../types/CompletedOrder.ts";
import type { CancelledOrder } from "../types/CancelledOrder.ts";

import OrderTabs from "../components/orderManagement/OrderTabs.tsx";
import RequestCard from "../components/orderManagement/RequestCard.tsx";
import RequestDetail from "../components/orderManagement/RequestDetail.tsx";
import { ScheduledCard } from "../components/orderManagement/ScheduledCard.tsx";
import { ScheduledDetail } from "../components/orderManagement/ScheduledDetail.tsx";
import { InProgressCard } from "../components/orderManagement/InProgressCard.tsx";
import { InProgressDetail } from "../components/orderManagement/InProgressDetail.tsx";
import { CompletedCard } from "../components/orderManagement/CompletedCard.tsx";
import { CompletedDetail } from "../components/orderManagement/CompletedDetail.tsx";
import { CancelledCard } from "../components/orderManagement/CancelledCard.tsx";

interface OrderPageProps {
    role: UserRole;
}

// ==========================================
// MOCK DATA (Dữ liệu giả lập cho 6 Tabs)
// ==========================================
const mockRequests: RequestData[] = [
    {
        id: 'REQ-8829', customerName: 'Chị Lan', technicianName: '', timeAgo: '10 phút trước',
        deviceName: 'Máy giặt cửa ngang LG', description: 'Máy giặt nhà tôi dạo này chạy không vắt được...',
        address: 'Quận 7, HCMC', estPrice: 450000, expectedTime: '14:00 - 24/05/2026', images: []
    }
];

const mockScheduled: ScheduledOrder[] = [
    {
        id: 'GU-99210', serviceName: 'Sửa máy lạnh Daikin', subService: 'Inverter 1.5 HP - Vệ sinh & Nạp gas',
        customerName: 'Anh Hoàng', technicianName: 'Nguyễn Văn Minh', time: 'Hôm nay, 14:00',
        address: '25 Bis Nguyễn Thị Minh Khai, Quận 1', statusText: 'ĐÃ XÁC NHẬN', estPrice: 450000,
    }
];

const mockInProgress: InProgressOrder[] = [
    {
        id: 'GU-99210', serviceName: 'Sửa máy lạnh Daikin', subService: 'Inverter 1.5 HP',
        technicianName: 'Nguyễn Văn Minh', startTime: '14:00', address: 'Quận 1, HCMC',
        statusText: 'ĐANG SỬA', currentPrice: 450000, isWaitingApproval: true
    }
];

const mockCompleted: CompletedOrder[] = [
    {
        id: 'GU-99200', serviceName: 'Bảo trì máy lạnh Panasonic', subService: 'Inverter',
        customerName: 'Anh Minh Khôi', technicianName: 'Nguyễn Văn Minh', completionDate: '24/05/2024',
        totalPrice: 450000, rating: 5
    }
];

const mockCancelled: CancelledOrder[] = [
    {
        id: 'GU-99100', serviceName: 'Sửa tủ lạnh Samsung', subService: 'Side-by-side',
        customerName: 'Chú Ba', technicianName: 'Nguyễn Văn Minh', cancelDate: '20/05/2024, 15:30',
        cancelledBy: 'technician',
        cancelReason: 'Tôi đang kẹt xe ở quận khác không về kịp, đã gọi điện xin lỗi khách.'
    },
    {
        id: 'GU-99105', serviceName: 'Vệ sinh máy giặt', subService: 'Cửa ngang',
        customerName: 'Chị Mai', technicianName: 'Nguyễn Văn Minh', cancelDate: '21/05/2024, 09:00',
        cancelledBy: 'customer',
        cancelReason: 'Tôi tìm được người quen sửa giúp rồi.'
    }
];

const mockWarranty: ScheduledOrder[] = [
    {
        id: 'WR-99200', serviceName: '[BẢO HÀNH] Bảo trì máy lạnh Panasonic', subService: 'Máy rỉ nước sau khi sửa',
        customerName: 'Anh Minh Khôi', technicianName: 'Nguyễn Văn Minh', time: 'Ngày mai, 09:00',
        address: 'Quận Bình Thạnh, HCMC', statusText: 'ĐANG XỬ LÝ', estPrice: 0, note: 'Khách báo máy lạnh rỉ nước lại chỗ cũ.'
    }
];

export const OrderManagementPage: React.FC<OrderPageProps> = ({ role }) => {
    const [activeTab, setActiveTab] = useState('new');
    const [selectedReqId, setSelectedReqId] = useState<string | null>(null);

    // --- STATE QUẢN LÝ MODAL HỦY ---
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState('');

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setSelectedReqId(null);
    };

    // Hàm Mở Modal Hủy
    const handleOpenCancelModal = (id: string) => {
        setOrderToCancel(id);
        setShowCancelModal(true);
        setCancelReason(''); // Reset lý do
    };

    // Hàm Xác nhận Hủy
    const handleConfirmCancel = () => {
        if (!cancelReason.trim()) {
            alert("Vui lòng nhập lý do hủy đơn!");
            return;
        }

        console.log(`Đã hủy đơn ${orderToCancel} với lý do: ${cancelReason}`);
        // TODO: Gọi API Hủy đơn ở đây

        // Đóng modal và reset view
        setShowCancelModal(false);
        setOrderToCancel(null);
        setSelectedReqId(null);
        setActiveTab('cancelled');
    };

    return (
        <div className="layout-wrapper">
            <div className="main-content">
                <main className="page-body bg-plate-white">
                    <div className="orders-container">

                        {/* ========================================================
                            PHẦN 1: CÁC MÀN HÌNH CHI TIẾT
                            ======================================================== */}
                        {selectedReqId && activeTab === 'new' && (
                            <RequestDetail
                                data={mockRequests.find(r => r.id === selectedReqId)!}
                                role={role}
                                onBack={() => setSelectedReqId(null)}
                                onCancel={handleOpenCancelModal} // Gọi hàm mở Modal
                            />
                        )}

                        {selectedReqId && activeTab === 'scheduled' && (
                            <ScheduledDetail
                                data={mockScheduled.find(r => r.id === selectedReqId)!}
                                role={role}
                                onBack={() => setSelectedReqId(null)}
                                onCancel={handleOpenCancelModal}
                            />
                        )}

                        {selectedReqId && activeTab === 'in-progress' && role === 'customer' && (
                            <InProgressDetail role={role} onBack={() => setSelectedReqId(null)}/>
                        )}

                        {selectedReqId && activeTab === 'completed' && (
                            <CompletedDetail role={role} onBack={() => setSelectedReqId(null)}/>
                        )}

                        {selectedReqId && activeTab === 'warranty' && (
                            <ScheduledDetail data={mockWarranty.find(r => r.id === selectedReqId)!} role={role} onBack={() => setSelectedReqId(null)} />
                        )}

                        {/* ========================================================
                            PHẦN 2: DANH SÁCH TABS & THẺ
                            ======================================================== */}
                        {!selectedReqId && (
                            <>
                                <div className="page-header">
                                    <h2>Quản lý Đơn hàng</h2>
                                    <div className="search-bar">
                                        <input type="text" placeholder="Tìm kiếm mã đơn, khách hàng..."/>
                                    </div>
                                </div>

                                <OrderTabs activeTab={activeTab} onChangeTab={handleTabChange}/>

                                <div className="request-list">
                                    {activeTab === 'new' && mockRequests.map(req => (
                                        <RequestCard
                                            key={req.id}
                                            data={req}
                                            role={role}
                                            onViewDetail={setSelectedReqId}
                                            onCancel={handleOpenCancelModal} // Gọi hàm mở Modal từ thẻ
                                        />
                                    ))}

                                    {activeTab === 'scheduled' && mockScheduled.map(req => (
                                        <ScheduledCard
                                            key={req.id}
                                            data={req}
                                            role={role}
                                            onViewDetail={setSelectedReqId}
                                            onCancel={handleOpenCancelModal}
                                        />
                                    ))}

                                    {activeTab === 'completed' && mockCompleted.map(req => (
                                        <CompletedCard key={req.id} data={req} role={role} onViewDetail={setSelectedReqId}/>
                                    ))}

                                    {activeTab === 'cancelled' && mockCancelled.map(req => (
                                        <CancelledCard key={req.id} data={req} role={role} onViewDetail={setSelectedReqId} />
                                    ))}

                                    {activeTab === 'warranty' && mockWarranty.map(req => (
                                        <ScheduledCard key={req.id} data={req} role={role} onViewDetail={setSelectedReqId} />
                                    ))}

                                    {activeTab === 'in-progress' && (
                                        role === 'customer'
                                            ? mockInProgress.map(req => <InProgressCard key={req.id} data={req} onViewDetail={setSelectedReqId}/>)
                                            : <InProgressDetail role={role} onBack={() => handleTabChange('scheduled')}/>
                                    )}
                                </div>
                            </>
                        )}

                        {/* ========================================================
                            PHẦN 3: MODAL HỦY ĐƠN
                            ======================================================== */}
                        {showCancelModal && (
                            <div className="modal-overlay" style={{ zIndex: 9999 }}>
                                <div className="modal-content" style={{ width: '500px' }}>
                                    <div className="modal-header">
                                        <h2 style={{ color: '#ef4444' }}>
                                            {role === 'technician' ? 'Từ chối yêu cầu' : 'Xác nhận hủy đơn'}
                                        </h2>
                                    </div>
                                    <div className="modal-body">
                                        <p style={{ fontSize: '14px', color: 'var(--stem-grey)', marginBottom: '16px' }}>
                                            Vui lòng cho biết lý do bạn muốn {role === 'technician' ? 'từ chối' : 'hủy'} đơn hàng <strong>{orderToCancel}</strong>.
                                        </p>
                                        <textarea
                                            className="reason-input"
                                            placeholder="Nhập lý do chi tiết..."
                                            value={cancelReason}
                                            onChange={(e) => setCancelReason(e.target.value)}
                                            style={{ minHeight: '120px' }}
                                        ></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn-outline" onClick={() => setShowCancelModal(false)}>Quay lại</button>
                                        <button className="btn-solid" style={{ background: '#ef4444', color: '#fff' }} onClick={handleConfirmCancel}>
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default OrderManagementPage;