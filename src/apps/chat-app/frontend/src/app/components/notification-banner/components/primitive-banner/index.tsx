import React, { MouseEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import checkmarkIcon from '/SVG/icn_thick_circle_exclamation_mark.svg';
import warningIcon from '/SVG/icn_thick_circle_exclamation_mark_dark.svg';
import infoIcon from '/SVG/icn_thick_circle_exclamation_mark.svg';
import xButton from '/SVG/icn_x.svg';

import scss from './styles.module.scss';

export enum NotificationBannerType {
  ERROR = 'error',
  WARNING = 'warning',
  CONFIRMATION = 'confirmation',
  INFO = 'info',
}

export interface NotificationBannerProps {
  type?: NotificationBannerType;
  withClose?: boolean;
  content: ReactNode | string | JSX.Element;
  buttonTitle?: string;
  buttonOnClick?: MouseEventHandler<HTMLButtonElement>;
  timeout?: number;
  className?: string;
  onClose?: () => void;
}

const icons: Record<NotificationBannerType, string> = {
  error: warningIcon,
  confirmation: checkmarkIcon,
  warning: warningIcon,
  info: infoIcon,
};

export const NotificationBanner = ({
  type = NotificationBannerType.CONFIRMATION,
  buttonTitle,
  buttonOnClick,
  timeout = 0,
  className,
  onClose = () => {},
  content,
  withClose = true,
}: NotificationBannerProps) => {
  const [hideAnimStart, setHideAnimStart] = useState(false);
  const [hidden, setHidden] = useState(false);

  const startHideAnimation = useCallback((t: number) => {
    setTimeout(() => {
      setHideAnimStart(true);
    }, t);
    setTimeout(() => {
      setHidden(true);
    }, t + 350);
  }, []);

  const handleClose = useCallback(() => {
    startHideAnimation(0);
  }, []);

  useEffect(() => {
    if (timeout === 0) {
      setHideAnimStart(false);
    } else {
      startHideAnimation(timeout);
    }
  }, [timeout]);

  useEffect(() => {
    if (!hidden) {
      return;
    }
    onClose();
  }, [onClose, hidden]);

  return (
    <div
      className={classNames(
        scss['notificationBanner'],
        scss[`-${type}`],
        hideAnimStart && scss[`-shouldHide`],
        hidden && scss['-hidden'],
        className,
      )}
      data-testid="notificationBanner"
    >
      <div className={scss['notificationBanner__textContainer']}>
        <img alt={type} src={icons[type]} width={24} height={24} />
        <div className={scss['notificationBanner__content']} data-testid="notificationBanner-textContent">
          {typeof content === 'string' ? <h1 className={scss['notificationBanner__text']}>{content}</h1> : content}
        </div>
      </div>
      <div className={scss['notificationBanner__buttonsContainer']}>
        {buttonTitle && buttonOnClick && (
          <button
            className={scss['notificationBanner__button']}
            onClick={buttonOnClick}
            data-testid="notificationBanner-button"
          >
            <h1 className={scss['notificationBanner__text']}>{buttonTitle}</h1>
          </button>
        )}
        {withClose && (
          <button
            aria-label="close"
            className={scss['notificationBanner__closeButton']}
            onClick={handleClose}
            data-testid="notificationBanner-closeButton"
          >
            <img alt="close" src={xButton} width={24} height={24} />
          </button>
        )}
      </div>
    </div>
  );
};
