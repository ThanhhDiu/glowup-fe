import type { ReactNode } from 'react';

interface SettingsCardProps {
  title: string;
  subtitle?: string;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  highlight?: boolean;
  compactTitle?: boolean;
  children: ReactNode;
}

export function SettingsCard({
  title,
  subtitle,
  eyebrow,
  actions,
  highlight = false,
  compactTitle = false,
  children,
}: SettingsCardProps) {
  return (
    <section className={`settings-card ${highlight ? 'settings-card--highlight' : ''}`}>
      <div className={`settings-card__header ${actions ? 'settings-card__header--split' : ''}`}>
        <div>
          {eyebrow ? <div className="settings-card__eyebrow">{eyebrow}</div> : null}
          <h1 className={`settings-card__title ${compactTitle ? 'settings-card__title--compact' : ''}`}>
            {title}
          </h1>
          {subtitle ? <p className="settings-card__subtitle">{subtitle}</p> : null}
        </div>
        {actions}
      </div>

      <div className="settings-card__body">{children}</div>
    </section>
  );
}
