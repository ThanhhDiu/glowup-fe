import type { ReactNode } from 'react';

interface SettingsInsightCardProps {
  icon: ReactNode;
  title: string;
  text: string;
}

export function SettingsInsightCard({
  icon,
  title,
  text,
}: SettingsInsightCardProps) {
  return (
    <article className="settings-insight-card">
      <div className="settings-insight-card__icon">{icon}</div>
      <h3 className="settings-insight-card__title">{title}</h3>
      <p className="settings-insight-card__text">{text}</p>
    </article>
  );
}
