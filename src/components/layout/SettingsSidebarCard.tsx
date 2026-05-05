import type { SettingsNavItem } from '../settings/types';

interface SettingsSidebarCardProps {
  avatar: string;
  name: string;
  meta: string;
  items: SettingsNavItem[];
  activeItem: string;
  onSelect?: (id: string) => void;
}

export function SettingsSidebarCard({
  avatar,
  name,
  meta,
  items,
  activeItem,
  onSelect,
}: SettingsSidebarCardProps) {
  return (
    <aside className="settings-sidebar-card">
      <div className="settings-sidebar-card__profile">
        <img src={avatar} alt={name} className="settings-sidebar-card__avatar" />
        <h2 className="settings-sidebar-card__name">{name}</h2>
        <p className="settings-sidebar-card__meta">{meta}</p>
      </div>

      <nav className="settings-sidebar-card__nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={[
              'settings-sidebar-card__nav-item',
              activeItem === item.id ? 'is-active' : '',
              item.tone === 'danger' ? 'settings-sidebar-card__nav-item--danger' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onSelect?.(item.id)}
          >
            <span className="settings-sidebar-card__icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
