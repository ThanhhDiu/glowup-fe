import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import styles from './ChatPage.module.css';
import { ContactItem } from '../components/chat/ContactItem';
import { QuotationCard } from '../components/chat/QuotationCard';
import { MessageInput } from '../components/chat/MessageInput';
import { SearchBar } from '../components/chat/SearchBar';
import { Avatar } from '../components/common/Avatar';
import type { Contact } from '../types/Message';

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
    'home': '/',
    'find-provider': '/find-provider',
    'provider-profile': '/provider-profile',
    'provider-dashboard': '/provider-dashboard',
};

export const ChatPage: React.FC = () => {
    const nav = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // 2. Logic xử lý khi gửi tin nhắn (Tùy chọn)
    const handleSendMessage = (text: string) => {
        console.log("Tin nhắn mới gửi:", text);
        // Sau này Diễm sẽ gọi API gửi tin nhắn ở đây
    };

    const onNavigate = (page: string, data?: any) => {
        const path = pageMap[page] || '/';
        nav(path, { state: data });
    };

    return (
        <div className={styles.container}>
            <Header onNavigate={onNavigate} />

            <div className={styles.mainLayout}>
                <aside className={styles.sidebar}>
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

                <main className={styles.chatArea}>
                    <header className={styles.chatHeader}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <Avatar src={mockContact.avatar} size={40} isOnline={mockContact.isOnline} />
                            <div>
                                <strong style={{ display: 'block', color: '#112250' }}>{mockContact.name}</strong>
                                <span style={{ fontSize: 12, color: '#22C55E' }}>● Đang hoạt động</span>
                            </div>
                        </div>
                    </header>

                    <section className={styles.messageList}>
                        {/* Tin nhắn từ người khác */}
                        <div className={styles.messageRow}>
                            <Avatar src={mockContact.avatar} size={32} />
                            <div className={styles.messageContent}>
                                <div className={`${styles.bubble} ${styles.bubbleLeft}`}>
                                    Chào bạn, tôi đã xem qua máy lạnh. Tôi gửi báo giá nhé.
                                </div>
                                <span className={styles.messageTime}>10:45 AM</span>
                            </div>
                        </div>

                        {/* Tin nhắn của mình */}
                        <div className={`${styles.messageRow} ${styles.messageRowRight}`}>
                            <Avatar src={mockContact.avatar} size={32} />
                            <div className={styles.messageContent}>
                                <div className={`${styles.bubble} ${styles.bubbleRight}`}>
                                    Dạ vâng, anh gửi đi ạ.
                                </div>
                                <span className={styles.messageTime}>10:46 AM</span>
                            </div>
                        </div>

                        {/* Thẻ báo giá */}
                        <div className={styles.messageRow}>
                            <Avatar src={mockContact.avatar} size={32} />
                            <div className={styles.messageContent}>
                                <QuotationCard
                                    serviceName="Sửa máy lạnh Daikin Inverter"
                                    description="Vệ sinh chuyên sâu và nạp gas R32 chính hãng."
                                    price={450000}
                                />
                                <span className={styles.messageTime}>10:47 AM</span>
                            </div>
                        </div>
                    </section>

                    {/* 3. Thay thế footer cũ bằng MessageInput mới */}
                    <footer className={styles.inputArea}>
                        <MessageInput onSendMessage={handleSendMessage} />
                    </footer>
                </main>
            </div>
        </div>
    );
};