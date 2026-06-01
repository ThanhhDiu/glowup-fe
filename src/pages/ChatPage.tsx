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
import type {UserRole} from "../types/UserRole.ts";
import { useConversations } from '../hooks/useConversations';
import { useChatMessages } from '../hooks/useChatMessages';
import { quotationService } from '../services/quotationService';
import type { Quotation } from '../types/quotation';
import type { Conversation } from '../types/conversation';

// kept legacy Contact type for some components

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
    const { conversations, loading: convLoading } = useConversations(role);
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
    const { messages, setMessages, loading: msgLoading, sendTextMessage } = useChatMessages(activeConversation?.id);

    const handleSendMessage = async (text: string) => {
        if (!activeConversation) return;
        try {
            await sendTextMessage(text);
        } catch (err) {
            console.error('Gửi tin nhắn lỗi', err);
        }
    };

    const handleQuoteCreated = (quotation: Quotation) => {
        // create a temporary message to display quotation immediately
        const quoteMessage = {
            id: `MSG-TEMP-${quotation.id}`,
            conversationId: quotation.conversationId || activeConversation?.id || 'unknown',
            senderId: quotation.technicianId || 'unknown',
            type: 'quotation' as const,
            content: null,
            quotation,
            sentAt: quotation.createdAt || new Date().toISOString(),
          };

        setMessages((prev) => [...prev, quoteMessage]);
    };

    const handleAcceptQuote = async (quoteId?: string) => {
        if (!quoteId) return;
        try {
            await quotationService.acceptQuote(quoteId);
            // update message(s) with this quotation id
            setMessages((prev) =>
                prev.map((m) => {
                    if (m.type === 'quotation' && m.quotation?.id === quoteId) {
                        return {
                            ...m,
                            quotation: {
                                ...m.quotation,
                                status: 'accepted',
                            },
                        };
                    }
                    return m;
                }),
            );
        } catch (err) {
            console.error('Accept quote error', err);
        }
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
                        {convLoading && <div>Đang tải hội thoại...</div>}
                        {!convLoading && conversations.map((c) => (
                            <div key={c.id} onClick={() => setActiveConversation(c)}>
                                <ContactItem
                                    contact={{
                                        id: c.id,
                                        name: c.partner.fullName,
                                        lastMessage: c.lastMessage?.content || '',
                                        time: c.lastMessage?.sentAt || '',
                                        avatar: c.partner.avatar || 'https://placehold.co/48x48',
                                        isOnline: c.partner.isOnline,
                                    }}
                                    isActive={activeConversation?.id === c.id}
                                />
                            </div>
                        ))}
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

                            {activeConversation ? (
                                <>
                                    <Avatar src={activeConversation.partner.avatar || 'https://placehold.co/40x40'} size={40} isOnline={!!activeConversation.partner.isOnline} />
                                    <div>
                                        <strong>{activeConversation.partner.fullName}</strong>
                                        <span style={{ fontSize: 12, color: '#22C55E', display: 'block' }}>
                                            ● {activeConversation.partner.isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div style={{ padding: 12 }}>
                                    <strong>Chọn hội thoại</strong>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* MESSAGE */}
                    <section className={styles.messageList}>
                        {msgLoading && <div>Đang tải tin nhắn...</div>}
                        {!msgLoading && !activeConversation && <div>Vui lòng chọn hội thoại từ bên trái.</div>}
                        {!msgLoading && activeConversation && messages.length === 0 && <div>Chưa có tin nhắn.</div>}
                        {!msgLoading && activeConversation && messages.map((m) => {
                            const isPartnerMessage = m.senderId === activeConversation.partner.id;
                            // On customer chat: partner is the technician, so partner messages are left and customer messages are right.
                            // On technician chat: partner is the customer, so partner messages are left and technician messages are right.
                            return (
                                <div key={m.id} className={`${styles.messageRow} ${isPartnerMessage ? '' : styles.messageRowRight}`}>
                                    {isPartnerMessage && <Avatar src={activeConversation.partner.avatar || 'https://placehold.co/32x32'} size={32} />}
                                    <div className={styles.messageContent}>
                                        {m.type === 'text' && (
                                            <div className={`${styles.bubble} ${isPartnerMessage ? styles.bubbleLeft : styles.bubbleRight}`}>
                                                {m.content}
                                            </div>
                                        )}

                                        {m.type === 'quotation' && m.quotation && (
                                            <QuotationCard
                                                serviceName={m.quotation.serviceName}
                                                description={m.quotation.description}
                                                price={m.quotation.price}
                                                isTechnician={role === 'technician'}
                                                onAccept={role === 'technician' ? undefined : () => handleAcceptQuote(m.quotation.id)}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    {/* INPUT */}
                    <footer className={styles.inputArea}>
                        <MessageInput
                            onSendMessage={handleSendMessage}
                            conversationId={activeConversation?.id}
                            onQuoteCreated={handleQuoteCreated}
                            role={role}
                        />
                    </footer>
                </main>
            </div>
        </div>
    );
};
