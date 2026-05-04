import type { ReactNode } from 'react';

interface SettingsDangerZoneProps {
  title: string;
  text: string;
  action: ReactNode;
}

export function SettingsDangerZone({
  title,
  text,
  action,
}: SettingsDangerZoneProps) {
  return (
    <section className="settings-danger-zone">
      <div className="settings-danger-zone__copy">
        <h2 className="settings-danger-zone__title">{title}</h2>
        <p className="settings-danger-zone__text">{text}</p>
      </div>
      {action}
    </section>
  );
}
