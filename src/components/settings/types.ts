import type { ReactNode } from 'react';

export interface SettingsNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  tone?: 'default' | 'danger';
}
