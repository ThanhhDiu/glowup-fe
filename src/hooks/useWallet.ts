import { useEffect, useState } from 'react';
import { walletService } from '../services/walletService';
import type { Wallet } from '../types/wallet';

export function useWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchWallet() {
    try {
      setLoading(true);
      setError(null);
      const data = await walletService.getWallet();
      setWallet(data);
    } catch (err) {
      setError('Không thể tải thông tin ví.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWallet();
  }, []);

  return { wallet, loading, error, refetch: fetchWallet };
}
