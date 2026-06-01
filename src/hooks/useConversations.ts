import { useEffect, useState } from 'react';
import { conversationService } from '../services/conversationService';
import type { Conversation } from '../types/conversation';
import type { UserRole } from '../types/UserRole';

export function useConversations(role: UserRole = 'customer') {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchConversations() {
    try {
      setLoading(true);
      setError(null);
      const data = await conversationService.getConversations(role);
      setConversations(data);
    } catch (err: any) {
      setError('Không thể tải danh sách hội thoại.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchConversations();
  }, [role]);

  return { conversations, loading, error, refetch: fetchConversations };
}
