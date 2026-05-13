import type { HTMLAttributes, ReactNode } from 'react';

interface SettingsActionBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function SettingsActionBar({ children, className, ...props }: SettingsActionBarProps) {
  return (
    <div className={['settings-actions', className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}
