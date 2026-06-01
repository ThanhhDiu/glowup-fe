export interface Wallet {
  userId: string;
  balance: number;
  pendingBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
  currency: 'VND';
  updatedAt: string;
}

export type WalletTransactionType = 'all' | 'commission' | 'topup' | 'withdraw' | 'income';

export interface WalletTransaction {
  id: string;
  type: string;
  title: string;
  category: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountOwner: string;
  isDefault: boolean;
  createdAt: string;
}
