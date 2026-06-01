import { useEffect, useState } from 'react';
import { conversationService } from '../services/conversationService';
import { socketService } from '../services/socketService';
import type { ChatMessage } from '../types/conversation';
import type { IMessage } from '@stomp/stompjs';

export function useChatMessages(conversationId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchMessages() {
    if (!conversationId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await conversationService.getMessages(conversationId, 1, 50);
      setMessages(data.items);
    } catch (err: any) {
      setError('Không thể tải tin nhắn.');
    } finally {
      setLoading(false);
    }
  }

  async function sendTextMessage(content: string) {
    if (!conversationId) return;
    if (!content || !content.trim()) return;
    try {
      const newMessage = await conversationService.sendMessage(conversationId, {
        type: 'text',
        content,
      });
      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    if (!conversationId) return;

    let activeSubscription: { unsubscribe: () => void } | null = null;

    const subscribe = async () => {
      try {
        await socketService.connect();
        activeSubscription = await socketService.subscribeConversation(
          conversationId,
          (message: IMessage) => {
            try {
              const payload = JSON.parse(message.body || '{}');
              const eventType: string = payload.event;
              const data = payload.data;

              if (!data) return;

              if (eventType === 'message:new') {
                const incoming = data as ChatMessage;
                setMessages((prev) => {
                  if (prev.some((m) => m.id === incoming.id)) return prev;
                  return [...prev, incoming];
                });
              } else if (eventType === 'quote:created') {
                // backend might send only the quotation; create a message wrapper
                const quotation = data;
                const quoteMessage: ChatMessage = {
                  id: `MSG-QUOTE-${quotation.id}`,
                  conversationId: conversationId,
                  senderId: quotation.technicianId || 'unknown',
                  type: 'quotation',
                  content: null,
                  quotation,
                  sentAt: quotation.createdAt || new Date().toISOString(),
                };

                setMessages((prev) => [...prev, quoteMessage]);
              } else if (eventType === 'quote:accepted') {
                // update existing quotation message status
                const payloadQuote = data;
                setMessages((prev) =>
                  prev.map((m) => {
                    if (m.type === 'quotation' && m.quotation?.id === payloadQuote.id) {
                      return {
                        ...m,
                        quotation: {
                          ...m.quotation,
                          status: payloadQuote.status,
                        },
                      };
                    }
                    return m;
                  }),
                );
              }
            } catch (parseError) {
              console.warn('Invalid STOMP payload', parseError);
            }
          },
        );
      } catch (err) {
        console.warn('Không thể kết nối realtime chat', err);
      }
    };

    setMessages([]);
    fetchMessages();
    subscribe();

    return () => {
      if (activeSubscription) {
        activeSubscription.unsubscribe();
      }
      socketService.unsubscribeConversation(conversationId);
    };
  }, [conversationId]);

  return { messages, setMessages, loading, error, refetch: fetchMessages, sendTextMessage };
}
