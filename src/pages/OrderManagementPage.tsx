import React, {useState} from 'react';
import './orderManagementPage.css';

import type {RequestData} from "../types/RequestData.ts";
import type {UserRole} from "../types/UserRole.ts";

import OrderTabs from "../components/orderManagement/OrderTabs.tsx";

import RequestCard from "../components/orderManagement/RequestCard.tsx";
import RequestDetail from "../components/orderManagement/RequestDetail.tsx";

import {ScheduledCard} from "../components/orderManagement/ScheduledCard.tsx";
import {ScheduledDetail} from "../components/orderManagement/ScheduledDetail.tsx";

import {InProgressCard} from "../components/orderManagement/InProgressCard.tsx";
import {InProgressDetail} from "../components/orderManagement/InProgressDetail.tsx";

import {CompletedCard} from "../components/orderManagement/CompletedCard.tsx";
import {CompletedDetail} from "../components/orderManagement/CompletedDetail.tsx";
import type {ScheduledOrder} from "../types/ScheduledOrder.ts";
import type {InProgressOrder} from "../types/InProgressOrder.ts";
import type {CompletedOrder} from "../types/CompletedOrder.ts";

interface OrderPageProps {
    role: UserRole;
}

// ==========================================
// MOCK DATA (Dữ liệu giả lập cho 4 Tabs)
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
        id: 'GU-99210',
        serviceName: 'Sửa máy lạnh Daikin',
        subService: 'Inverter 1.5 HP - Vệ sinh & Nạp gas',
        customerName: 'Anh Hoàng',
        technicianName: 'Nguyễn Văn Minh',
        time: 'Hôm nay, 14:00',
        address: '25 Bis Nguyễn Thị Minh Khai, Quận 1',
        statusText: 'ĐÃ XÁC NHẬN',
        estPrice: 450000,
    }
];

const mockInProgress: InProgressOrder[] = [
    {
        id: 'GU-99210',
        serviceName: 'Sửa máy lạnh Daikin',
        subService: 'Inverter 1.5 HP',
        technicianName: 'Nguyễn Văn Minh',
        startTime: '14:00',
        address: 'Quận 1, HCMC',
        statusText: 'ĐANG SỬA',
        currentPrice: 450000,
        isWaitingApproval: true
    }
];

const mockCompleted: CompletedOrder[] = [
    {
        id: 'GU-99200',
        serviceName: 'Bảo trì máy lạnh Panasonic',
        subService: 'Inverter',
        customerName: 'Anh Minh Khôi',
        technicianName: 'Nguyễn Văn Minh',
        completionDate: '24/05/2024',
        totalPrice: 450000,
        rating: 5
    }
];

export const OrderManagementPage: React.FC<OrderPageProps> = ({role}) => {
    const [activeTab, setActiveTab] = useState('new');
    const [selectedReqId, setSelectedReqId] = useState<string | null>(null);

    // Hàm chuyển Tab (Tự động reset ID đang chọn để quay về List View)
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setSelectedReqId(null);
    };

    return (
        <div className="layout-wrapper">
            <div className="main-content">
                <main className="page-body bg-plate-white">
                    <div className="orders-container">

                        {/* ========================================================
                            PHẦN 1: CÁC MÀN HÌNH CHI TIẾT (Trạng thái Full-screen)
                            Ẩn thanh Tabs khi đang xem chi tiết (ngoại trừ tab Đang sửa của thợ)
                            ======================================================== */}
                        {selectedReqId && activeTab === 'new' && (
                            <RequestDetail
                                data={mockRequests.find(r => r.id === selectedReqId)!}
                                role={role}
                                onBack={() => setSelectedReqId(null)}
                            />
                        )}

                        {selectedReqId && activeTab === 'scheduled' && (
                            <ScheduledDetail
                                data={mockScheduled.find(r => r.id === selectedReqId)!}
                                role={role}
                                onBack={() => setSelectedReqId(null)}
                            />
                        )}

                        {/* Chi tiết Đang sửa CỦA KHÁCH HÀNG */}
                        {selectedReqId && activeTab === 'in-progress' && role === 'customer' && (
                            <InProgressDetail role={role} onBack={() => setSelectedReqId(null)}/>
                        )}

                        {selectedReqId && activeTab === 'completed' && (
                            <CompletedDetail role={role} onBack={() => setSelectedReqId(null)}/>
                        )}

                        {/* ========================================================
                            PHẦN 2: DANH SÁCH & WORKSPACE THỢ (Hiển thị Tabs)
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
                                    {/* Render Danh sách theo Tab */}
                                    {activeTab === 'new' && mockRequests.map(req => (
                                        <RequestCard key={req.id} data={req} role={role}
                                                     onViewDetail={setSelectedReqId}/>
                                    ))}

                                    {activeTab === 'scheduled' && mockScheduled.map(req => (
                                        <ScheduledCard key={req.id} data={req} role={role}
                                                       onViewDetail={setSelectedReqId}/>
                                    ))}

                                    {activeTab === 'completed' && mockCompleted.map(req => (
                                        <CompletedCard key={req.id} data={req} role={role}
                                                       onViewDetail={setSelectedReqId}/>
                                    ))}

                                    {/* XỬ LÝ LOGIC ĐẶC BIỆT CHO TAB "ĐANG SỬA" */}
                                    {activeTab === 'in-progress' && (
                                        role === 'customer' ? (
                                            // Khách hàng: Xem danh sách các thẻ
                                            mockInProgress.map(req => (
                                                <InProgressCard key={req.id} data={req}
                                                                onViewDetail={setSelectedReqId}/>
                                            ))
                                        ) : (
                                            // Thợ: Xem thẳng giao diện Workspace (Không có back button)
                                            <InProgressDetail role={role} onBack={() => handleTabChange('scheduled')}/>
                                        )
                                    )}
                                </div>
                            </>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default OrderManagementPage;