import type { ReactNode } from 'react';

interface SettingsToplineProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
}

export function SettingsTopline({ title, subtitle, badge }: SettingsToplineProps) {
  return (
    <div className="settings-topline">
      <div>
        <h1 className="settings-topline__title">{title}</h1>
        {subtitle ? <p className="settings-topline__subtitle">{subtitle}</p> : null}
      </div>
      {badge ? badge : null}
    </div>
  );
}
