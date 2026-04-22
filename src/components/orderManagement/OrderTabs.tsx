import React from 'react';
import "./orderTabs.css"

interface OrderTabsProps {
    activeTab: string;
    onChangeTab: (tab: string) => void;
}

export const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, onChangeTab }) => {
    const tabs = [
        { id: 'new', label: 'Yêu cầu mới' },
        { id: 'scheduled', label: 'Sắp hẹn' },
        { id: 'in-progress', label: 'Đang sửa' },
        { id: 'completed', label: 'Hoàn thành' }
    ];

    return (
        <div className="order-tabs">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onChangeTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default OrderTabs;