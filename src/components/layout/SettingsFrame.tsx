import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface SettingsFrameProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  singleColumn?: boolean;
}

export function SettingsFrame({
  children,
  as: Component = 'main',
  className,
  singleColumn = false,
  ...props
}: SettingsFrameProps) {
  return (
    <Component
      className={[
        'settings-frame',
        singleColumn ? 'settings-frame--single' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Component>
  );
}
