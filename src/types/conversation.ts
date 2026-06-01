export interface ConversationPartner {
  id: string;
  fullName: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface LastMessage {
  content: string | null;
  senderId: string;
  sentAt: string;
}

export interface Conversation {
  id: string;
  orderId?: string;
  partner: ConversationPartner;
  lastMessage?: LastMessage;
  unreadCount?: number;
  updatedAt?: string;
}

export type MessageType = 'text' | 'image' | 'quotation';

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  content: string | null;
  quotation?: any;
  sentAt: string;
  isRead?: boolean;
}
