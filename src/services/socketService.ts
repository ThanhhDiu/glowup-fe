import { Client } from '@stomp/stompjs';
import type { IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { loadTokenFromStorage } from '../utils/token';

const WS_URL = import.meta.env.VITE_APP_WS_URL || `${window.location.origin}/ws`;

const DISABLE_WS = import.meta.env.VITE_DISABLE_WS === 'true';

let client: Client | null = null;
const subscriptions = new Map<string, StompSubscription>();

// Minimal fake client used when websockets are disabled so callers can still call subscribe/subscribeConversation
function createFakeClient(): Client {
  const fake: Partial<Client> = {
    active: false,
    subscribe: (destination: string, callback: (msg: IMessage) => void) => {
      console.info('[socketService] websocket disabled — subscribe skipped for', destination);
      return { unsubscribe: () => undefined } as StompSubscription;
    },
    deactivate: () => {
      /* noop */
    },
    activate: () => {
      /* noop */
    },
  };

  return fake as Client;
}

function createClient(): Client {
  const token = loadTokenFromStorage();
  const stompClient = new Client({
    webSocketFactory: () => new SockJS(WS_URL),
    connectHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    debug: (str) => {
      console.debug('[STOMP]', str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
  });

  stompClient.onStompError = (frame) => {
    console.error('[STOMP] broker error', frame.headers['message'], frame.body);
  };

  stompClient.onWebSocketError = (event) => {
    console.error('[STOMP] websocket error', event);
  };

  return stompClient;
}

export const socketService = {
  async connect(): Promise<Client> {
    if (DISABLE_WS) {
      if (!client) client = createFakeClient();
      console.info('[socketService] WebSocket disabled by VITE_DISABLE_WS');
      return Promise.resolve(client);
    }

    if (client && client.active) {
      return client;
    }

    client = createClient();

    return new Promise((resolve, reject) => {
      client!.onConnect = () => {
        resolve(client!);
      };

      client!.onWebSocketError = (error) => {
        reject(error);
      };

      client!.activate();
    });
  },

  disconnect() {
    if (DISABLE_WS) {
      subscriptions.clear();
      client = null;
      console.info('[socketService] WebSocket disabled — disconnect skipped');
      return;
    }

    if (client) {
      client.deactivate();
      client = null;
    }
    subscriptions.clear();
  },

  async subscribeConversation(conversationId: string, callback: (message: IMessage) => void) {
    if (DISABLE_WS) {
      console.info('[socketService] subscribeConversation skipped because WebSocket is disabled');
      const fake = createFakeClient();
      const subscription = fake.subscribe(`/topic/conversations.${conversationId}`, callback);
      subscriptions.set(conversationId, subscription);
      return subscription;
    }

    const activeClient = await this.connect();
    const destination = `/topic/conversations.${conversationId}`;
    const subscription = activeClient.subscribe(destination, callback);
    subscriptions.set(conversationId, subscription);
    return subscription;
  },

  unsubscribeConversation(conversationId: string) {
    const subscription = subscriptions.get(conversationId);
    if (subscription) {
      subscription.unsubscribe();
      subscriptions.delete(conversationId);
    }
  },
};
