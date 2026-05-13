interface SettingsTextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export function SettingsTextareaField({
  label,
  value,
  onChange,
  placeholder,
  fullWidth = false,
}: SettingsTextareaFieldProps) {
  return (
    <label className={`settings-field ${fullWidth ? 'settings-field--full' : ''}`}>
      <span className="settings-field__label">{label}</span>
      <textarea
        className="settings-field__textarea"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
