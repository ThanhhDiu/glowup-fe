import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import './SettingsUI.css';

export interface SettingsNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  tone?: 'default' | 'danger';
}

interface SettingsSidebarCardProps {
  avatar: string;
  name: string;
  meta: string;
  items: SettingsNavItem[];
  activeItem: string;
  onSelect?: (id: string) => void;
}

interface SettingsCardProps {
  title: string;
  subtitle?: string;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  highlight?: boolean;
  compactTitle?: boolean;
  children: ReactNode;
}

interface SettingsFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

interface SettingsChipPickerProps {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  tone?: 'cool' | 'warm';
}

interface SettingsSwitchRowProps {
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}

interface SettingsInsightCardProps {
  icon: ReactNode;
  title: string;
  text: string;
}

interface DeleteAccountModalProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
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

export function SettingsTextField({
  label,
  value,
  onChange,
  placeholder,
  fullWidth = false,
}: SettingsFieldProps) {
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

export function SettingsTextareaField({
  label,
  value,
  onChange,
  placeholder,
  fullWidth = false,
}: SettingsFieldProps) {
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

      <button
        type="button"
        className={`settings-switch ${checked ? 'is-active' : ''}`}
        onClick={onToggle}
        role="switch"
        aria-checked={checked}
      />
    </div>
  );
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

export function SettingsDangerZone({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action: ReactNode;
}) {
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

export function DeleteAccountModal({
  open,
  title = 'Xóa tài khoản',
  message,
  confirmLabel = 'Xóa vĩnh viễn',
  cancelLabel = 'Hủy',
  onConfirm,
  onCancel,
}: DeleteAccountModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="delete-account-title">
      <div className="settings-modal__dialog">
        <div className="settings-modal__icon">
          <AlertTriangle size={28} />
        </div>
        <h2 className="settings-modal__title" id="delete-account-title">
          {title}
        </h2>
        <p className="settings-modal__text">{message}</p>

        <div className="settings-modal__actions">
          <button type="button" className="settings-danger-button" onClick={onConfirm}>
            {confirmLabel}
          </button>
          <button type="button" className="settings-secondary-button" onClick={onCancel}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
