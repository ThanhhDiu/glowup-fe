import React, { useState } from 'react';
import { Paperclip, Image, Smile, SendHorizontal } from 'lucide-react';
import styles from './Chat.module.css';
import QuoteCreateModal from '../modal/QuoteCreateModal';

import { ChatInputWrapper } from './ChatInputWrapper';


interface MessageInputProps {
    onSendMessage?: (message: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const handleSend = () => {
        if (message.trim() && onSendMessage) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <>
            <ChatInputWrapper
                leftIcons={
                    <>
                        <button
                            className={styles.iconButton}
                            title="Tạo báo giá"
                            onClick={() => setOpen(true)}
                        >
                            <Paperclip size={20} color="#4A5E8B" />
                        </button>

                        <button className={styles.iconButton} title="Gửi hình ảnh">
                            <Image size={20} color="#4A5E8B" />
                        </button>

                        <button className={styles.iconButton} title="Biểu cảm">
                            <Smile size={20} color="#4A5E8B" />
                        </button>
                    </>
                }
                rightElement={
                    <button
                        className={styles.sendButton}
                        onClick={handleSend}
                        disabled={!message.trim()}
                    >
                        <SendHorizontal size={20} color="white" />
                    </button>
                }
            >
                <textarea
                    className={styles.textInput}
                    placeholder="Nhập tin nhắn..."
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
            </ChatInputWrapper>

            {/* MODAL (tách ra ngoài) */}
            <QuoteCreateModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
};