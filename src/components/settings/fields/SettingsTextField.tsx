interface SettingsTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export function SettingsTextField({
  label,
  value,
  onChange,
  placeholder,
  fullWidth = false,
}: SettingsTextFieldProps) {
  return (
    <label className={`settings-field ${fullWidth ? 'settings-field--full' : ''}`}>
      <span className="settings-field__label">{label}</span>
      <input
        className="settings-field__input"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
