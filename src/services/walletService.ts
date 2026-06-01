import apiClient from '../api/config';
import type { Wallet, WalletTransaction, BankAccount } from '../types/wallet';

export const walletService = {
  async getWallet(): Promise<Wallet> {
    const res = await apiClient.get('/api/wallet');
    return res.data.data;
  },

  async getTransactions(params?: { type?: string; page?: number; limit?: number }) {
    const res = await apiClient.get('/api/wallet/transactions', {
      params: {
        type: params?.type || 'all',
        page: params?.page || 1,
        limit: params?.limit || 10,
      },
    });
    return res.data.data;
  },

  async topup(payload: { amount: number; method: 'vietqr' }) {
    const res = await apiClient.post('/api/wallet/topup', payload);
    return res.data.data;
  },

  async confirmTopup(payload: { transactionId: string }) {
    const res = await apiClient.post('/api/wallet/topup/confirm', payload);
    return res.data.data;
  },

  async withdraw(payload: { amount: number; bankAccountId: string }) {
    const res = await apiClient.post('/api/wallet/withdraw', payload);
    return res.data.data;
  },

  async getBankAccounts(): Promise<BankAccount[]> {
    const res = await apiClient.get('/api/wallet/bank-accounts');
    return res.data.data.items;
  },

  async createBankAccount(payload: { bankName: string; accountNumber: string; accountOwner: string }) {
    const res = await apiClient.post('/api/wallet/bank-accounts', payload);
    return res.data.data;
  },
};
