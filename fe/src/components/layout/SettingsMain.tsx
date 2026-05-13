import type { HTMLAttributes, ReactNode } from 'react';

interface SettingsMainProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function SettingsMain({ children, className, ...props }: SettingsMainProps) {
  return (
    <div className={['settings-main', className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}
