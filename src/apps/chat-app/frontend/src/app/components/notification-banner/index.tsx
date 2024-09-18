import React, { useCallback } from 'react';
import { useBannerSelector } from '@chat-app/context/ui/selectors';

import { NotificationBanner } from './components/primitive-banner';

export const Banner = () => {
  const banner = useBannerSelector();

  const handleClose = useCallback(() => {
    banner?.setValue(null);
  }, [banner]);

  if (!banner?.value?.content) {
    return null;
  }

  const { timeout, content, buttonTitle, buttonOnClick, ...props } = banner.value || {};

  return (
    <NotificationBanner
      content={content}
      onClose={handleClose}
      buttonTitle={buttonTitle}
      buttonOnClick={buttonOnClick}
      timeout={timeout ?? 5000}
      {...props}
    />
  );
};
