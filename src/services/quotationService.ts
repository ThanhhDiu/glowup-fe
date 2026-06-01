import apiClient from '../api/config';
import type { Quotation } from '../types/quotation';

export const quotationService = {
  async createQuote(conversationId: string, payload: Omit<Quotation, 'id' | 'status' | 'createdAt'>): Promise<Quotation> {
    const res = await apiClient.post(`/api/conversations/${conversationId}/quotes`, payload);
    return res.data.data;
  },

  async acceptQuote(quoteId: string) {
    const res = await apiClient.patch(`/api/quotes/${quoteId}/accept`);
    return res.data.data;
  },
};
