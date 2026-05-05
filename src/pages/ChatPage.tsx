import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Header } from '../components/layout/Header';
import styles from './ChatPage.module.css';
import { ContactItem } from '../components/chat/ContactItem';
import { QuotationCard } from '../components/chat/QuotationCard';
import { MessageInput } from '../components/chat/MessageInput';
import { SearchBar } from '../components/chat/SearchBar';
import { Avatar } from '../components/common/Avatar';
import type { Contact } from '../types/Message';
import type {UserRole} from "../types/UserRole.ts";

const mockContact: Contact = {
    id: '1',
    name: 'Nguyễn Văn An',
    lastMessage: 'Tôi đã gửi báo giá...',
    time: '10:45 AM',
    avatar: 'https://placehold.co/48x48',
    isOnline: true
};

const mockContact2: Contact = {
    id: '2',
    name: 'Trần Văn Bình',
    lastMessage: 'Dạ vâng, anh gửi đi ạ.',
    time: '10:45 AM',
    avatar: 'https://placehold.co/48x48',
    isOnline: true
};

const pageMap: Record<string, string> = {
    home: '/',
    provider: '/provider',
    services: '/services',
    'provider-profile': '/provider-profile',
    'provider-dashboard': '/provider-dashboard',
    'customer-settings': '/customer/account-settings',
    login: '/auth/login',
};

export const ChatPage: React.FC<{ role?: UserRole }> = ({ role = "customer" }) => {
    const nav = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(role === "customer");

    const handleSendMessage = (text: string) => {
        console.log("Tin nhắn mới:", text);
    };

    const onNavigate = (page: string, data?: unknown) => {
        const path = pageMap[page] || '/';
        nav(path, { state: data });
    };

    useEffect(() => {
        setIsSidebarOpen(role === "customer");
    }, [role]);

    return (
        <div className={styles.container}>

            {/* HEADER chỉ cho khách */}
            {role === "customer" && <Header onNavigate={onNavigate} />}

            <div className={styles.mainLayout}>

                {/* SIDEBAR */}
                <aside
                    className={`${styles.sidebar} ${
                        !isSidebarOpen ? styles.sidebarClosed : ''
                    }`}
                >
                    <div style={{ padding: '16px' }}>
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Tìm kiếm hội thoại..."
                        />
                    </div>
                    <div style={{ padding: '0 8px' }}>
                        <ContactItem contact={mockContact} isActive />
                        <ContactItem contact={mockContact2} />
                    </div>
                </aside>

                {/* CHAT AREA */}
                <main className={styles.chatArea}>

                    {/* HEADER CHAT */}
                    <header className={styles.chatHeader}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

                            {/* Nút toggle chỉ cho thợ */}
                            {role === "technician" && (
                                <button
                                    className={styles.toggleBtn}
                                    onClick={() => setIsSidebarOpen(prev => !prev)}
                                >
                                    ☰
                                </button>
                            )}

                            <Avatar src={mockContact.avatar} size={40} isOnline />
                            <div>
                                <strong>{mockContact.name}</strong>
                                <span style={{ fontSize: 12, color: '#22C55E', display: 'block' }}>
                                    ● Đang hoạt động
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* MESSAGE */}
                    <section className={styles.messageList}>
                        <div className={styles.messageRow}>
                            <Avatar src={mockContact.avatar} size={32} />
                            <div className={styles.messageContent}>
                                <div className={`${styles.bubble} ${styles.bubbleLeft}`}>
                                    Chào bạn, tôi gửi báo giá nhé.
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.messageRow} ${styles.messageRowRight}`}>
                            <div className={styles.messageContent}>
                                <div className={`${styles.bubble} ${styles.bubbleRight}`}>
                                    Ok anh.
                                </div>
                            </div>
                        </div>

                        <div className={styles.messageRow}>
                            <Avatar src={mockContact.avatar} size={32} />
                            <div className={styles.messageContent}>
                                <QuotationCard
                                    serviceName="Sửa máy lạnh"
                                    description="Vệ sinh + nạp gas"
                                    price={450000}
                                />
                            </div>
                        </div>
                    </section>

                    {/* INPUT */}
                    <footer className={styles.inputArea}>
                        <MessageInput onSendMessage={handleSendMessage} />
                    </footer>
                </main>
            </div>
        </div>
    );
};
