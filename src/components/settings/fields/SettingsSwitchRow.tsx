import { SettingsSwitch } from './SettingsSwitch';

interface SettingsSwitchRowProps {
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}

export function SettingsSwitchRow({
  title,
  description,
  checked,
  onToggle,
}: SettingsSwitchRowProps) {
  return (
    <div className="settings-switch-row">
      <div className="settings-switch-row__text">
        <p className="settings-switch-row__title">{title}</p>
        <p className="settings-switch-row__description">{description}</p>
      </div>

      <SettingsSwitch checked={checked} onToggle={onToggle} ariaLabel={title} />
    </div>
  );
}
