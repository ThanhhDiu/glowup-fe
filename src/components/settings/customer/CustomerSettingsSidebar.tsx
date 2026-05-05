import { SettingsSidebarCard } from '../../layout/SettingsSidebarCard';
import { customerSettingsSidebarItems } from './customerSettingsConfig';

interface CustomerSettingsSidebarProps {
  activeItem: string;
  onSelect?: (id: string) => void;
  avatar?: string;
  name?: string;
  meta?: string;
}

export function CustomerSettingsSidebar({
  activeItem,
  onSelect,
  avatar = 'https://i.pravatar.cc/160?img=47',
  name = 'Trần Thị Lan',
  meta = 'ID: KH-9921',
}: CustomerSettingsSidebarProps) {
  return (
    <SettingsSidebarCard
      avatar={avatar}
      name={name}
      meta={meta}
      items={customerSettingsSidebarItems}
      activeItem={activeItem}
      onSelect={onSelect}
    />
  );
}
