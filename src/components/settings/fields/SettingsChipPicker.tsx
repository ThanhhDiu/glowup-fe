interface SettingsChipPickerProps {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  tone?: 'cool' | 'warm';
}

export function SettingsChipPicker({
  label,
  options,
  selected,
  onToggle,
  tone = 'cool',
}: SettingsChipPickerProps) {
  return (
    <div className="settings-field settings-field--full">
      <span className="settings-field__label">{label}</span>
      <div className="settings-chip-group">
        {options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              className={[
                'settings-chip',
                isSelected ? 'is-selected' : '',
                tone === 'warm' ? 'settings-chip--warm' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onToggle(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
