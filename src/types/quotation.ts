export type QuotationStatus = 'pending' | 'accepted';

export interface Quotation {
  id: string;
  conversationId?: string;
  technicianId?: string;
  serviceName: string;
  description: string;
  price: number;
  scheduledAt: string;
  notes?: string;
  status: QuotationStatus;
  createdAt?: string;
}
