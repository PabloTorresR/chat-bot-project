import { NotificationBannerProps, NotificationBannerType } from '../components/primitive-banner';

export const START_UP_BANNER: NotificationBannerProps = {
  content: 'App currently in Beta status. Most features are still to come! 🚀',
  timeout: 20000,
  type: NotificationBannerType.INFO,
};
