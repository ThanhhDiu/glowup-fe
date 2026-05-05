export interface ProviderProfile {
  activeTab?: string;
  name: string;
  avatar: string;
  coverImage?: string;
  rating?: number;
  reviewCount?: number;
  completedJobs?: string;
  location?: string;
  isAvailable?: boolean;
  type?: 'normal' | 'premium' | 'verified';
  titleBadge?: string;
}
