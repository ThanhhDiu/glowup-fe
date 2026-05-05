import { SettingsInsightCard } from '../cards/SettingsInsightCard';
import { customerSettingsInsightItems } from './customerSettingsConfig';

export function CustomerSettingsInsights() {
  return (
    <div className="settings-insights">
      {customerSettingsInsightItems.map((item) => (
        <SettingsInsightCard
          key={item.id}
          icon={item.icon}
          title={item.title}
          text={item.text}
        />
      ))}
    </div>
  );
}
