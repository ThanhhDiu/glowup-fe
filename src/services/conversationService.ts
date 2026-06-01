import apiClient from '../api/config';
import type { Conversation, ChatMessage } from '../types/conversation';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_CHAT === 'true';

const mockConversations: Conversation[] = [
  {
    id: 'CONV-001',
    orderId: 'GU-99210',
    partner: {
      id: 'TECH-001',
      fullName: 'Nguyễn Văn An',
      avatar: 'https://placehold.co/48x48',
      isOnline: true,
    },
    lastMessage: {
      content: 'Tôi đã gửi báo giá...',
      senderId: 'TECH-001',
      sentAt: new Date().toISOString(),
    },
    unreadCount: 2,
    updatedAt: new Date().toISOString(),
  },
];

const mockMessages: Record<string, ChatMessage[]> = {
  'CONV-001': [
    {
      id: 'MSG-001',
      conversationId: 'CONV-001',
      senderId: 'TECH-001',
      type: 'text',
      content: 'Chào bạn, tôi gửi báo giá nhé.',
      sentAt: new Date().toISOString(),
      isRead: true,
    },
    {
      id: 'MSG-002',
      conversationId: 'CONV-001',
      senderId: 'TECH-001',
      type: 'quotation',
      content: null,
      quotation: {
        id: 'QUOTE-001',
        conversationId: 'CONV-001',
        technicianId: 'TECH-001',
        serviceName: 'Sửa máy lạnh',
        description: 'Vệ sinh + nạp gas',
        price: 450000,
        scheduledAt: new Date().toISOString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      sentAt: new Date().toISOString(),
      isRead: true,
    },
  ],
};

export const conversationService = {
  async getConversations(): Promise<Conversation[]> {
    if (USE_MOCK) return mockConversations;

    try {
      // const res = await apiClient.get('/api/conversations');
      // return res.data.data.items;
      // API calls are commented out for mock testing — return mock data directly
      return mockConversations;
    } catch (err) {
      console.warn('[conversationService] getConversations failed, falling back to mock', err);
      return mockConversations;
    }
  },

  async getMessages(conversationId: string, page = 1, limit = 20): Promise<{ items: ChatMessage[]; pagination: any }> {
    if (USE_MOCK) {
      return {
        items: mockMessages[conversationId] || [],
        pagination: { page, limit, total: (mockMessages[conversationId] || []).length, totalPages: 1 },
      };
    }

    try {
      // const res = await apiClient.get(`/api/conversations/${conversationId}/messages`, {
      //   params: { page, limit },
      // });

      // return res.data.data;
      // API calls are commented out for mock testing — return mock data directly
      return {
        items: mockMessages[conversationId] || [],
        pagination: { page, limit, total: (mockMessages[conversationId] || []).length, totalPages: 1 },
      };
    } catch (err) {
      console.warn('[conversationService] getMessages failed, falling back to mock', err);
      return {
        items: mockMessages[conversationId] || [],
        pagination: { page, limit, total: (mockMessages[conversationId] || []).length, totalPages: 1 },
      };
    }
  },

  async sendMessage(conversationId: string, payload: { type: 'text' | 'image' | 'quotation'; content: string | null }): Promise<ChatMessage> {
    if (USE_MOCK) {
      const msg: ChatMessage = {
        id: `MSG-TEMP-${Date.now()}`,
        conversationId,
        senderId: 'USR-001',
        type: payload.type,
        content: payload.content,
        sentAt: new Date().toISOString(),
      };

      mockMessages[conversationId] = mockMessages[conversationId] || [];
      mockMessages[conversationId].push(msg);
      return msg;
    }

    try {
      // const res = await apiClient.post(`/api/conversations/${conversationId}/messages`, payload);
      // return res.data.data;
      // API calls are commented out for mock testing — create and return mock message
      const msg: ChatMessage = {
        id: `MSG-TEMP-${Date.now()}`,
        conversationId,
        senderId: 'USR-001',
        type: payload.type,
        content: payload.content,
        sentAt: new Date().toISOString(),
      };

      mockMessages[conversationId] = mockMessages[conversationId] || [];
      mockMessages[conversationId].push(msg);
      return msg;
    } catch (err) {
      console.warn('[conversationService] sendMessage failed, using mock message', err);
      const msg: ChatMessage = {
        id: `MSG-TEMP-${Date.now()}`,
        conversationId,
        senderId: 'USR-001',
        type: payload.type,
        content: payload.content,
        sentAt: new Date().toISOString(),
      };

      mockMessages[conversationId] = mockMessages[conversationId] || [];
      mockMessages[conversationId].push(msg);
      return msg;
    }
  },

  async createConversation(payload: { technicianId: string; orderId: string }) {
    const res = await apiClient.post('/api/conversations', payload);
    return res.data.data;
  },
};
