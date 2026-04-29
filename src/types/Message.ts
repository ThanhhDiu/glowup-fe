export interface Contact {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    avatar: string;
    isOnline?: boolean;
    unread?: boolean;
    partnerType?: string;
}

export interface Message {
    id: string;
    senderId: string;
    content: string;
    time: string;
    type: 'text' | 'quotation';
    isMe: boolean;
}
