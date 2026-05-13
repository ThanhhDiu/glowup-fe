interface SettingsSwitchProps {
  checked: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}

export function SettingsSwitch({
  checked,
  onToggle,
  ariaLabel,
}: SettingsSwitchProps) {
  return (
    <button
      type="button"
      className={`settings-switch ${checked ? 'is-active' : ''}`}
      onClick={onToggle}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
    />
  );
}
