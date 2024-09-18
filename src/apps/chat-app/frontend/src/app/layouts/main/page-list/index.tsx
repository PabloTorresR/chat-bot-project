import React from 'react';
import styles from './styles.module.scss';
// import SETTINGS_ICON from '/SVG/icn_cogs.svg';
import COLLECTION_ICON from '/SVG/icn_puzzle.svg';
import CONVERSATIONS_ICON from '/SVG/icn_speech_bubbles.svg';
import PRACTICE_ICON from '/SVG/icn_hat_graduation.svg';
import { RoutePath, RouteName } from '@chat-app/routes/namespaces';
import { capitalizeFirstLetter } from 'app/utils/format';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export const PageList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleElementClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className={styles.pageList}>
      <div className={styles.pageList__options}>
        <button
          className={classNames(
            styles.pageList__options__elem,
            pathname === RoutePath.Route.CONVERSATIONS && styles['-isActive'],
          )}
          onClick={() => handleElementClick(RouteName.Routes.CONVERSATIONS)}
        >
          <img src={CONVERSATIONS_ICON} alt="conv" />
          {capitalizeFirstLetter(RoutePath.Name.CONVERSATIONS)}
        </button>
        <button
          className={classNames(
            styles.pageList__options__elem,
            pathname === RoutePath.Route.COLLECTION && styles['-isActive'],
          )}
          onClick={() => handleElementClick(RouteName.Routes.COLLECTION)}
        >
          <img src={COLLECTION_ICON} alt="collection" />
          {capitalizeFirstLetter(RoutePath.Name.COLLECTION)}
        </button>
        <button
          className={classNames(
            styles.pageList__options__elem,
            // pathname === RoutePath.Route.COLLECTION && styles['-isActive'], //NOTE: COMMING SOON
            styles['-disabled'],
          )}
          onClick={() => handleElementClick(RouteName.Routes.COLLECTION)}
        >
          <img src={PRACTICE_ICON} alt="practice" />
          {capitalizeFirstLetter(RoutePath.Name.PRACTICE)}
        </button>
        {/* <div className={styles.pageList__options__elem}>
          <img src={SETTINGS_ICON} alt="sett" />
          Settings
        </div> */}
      </div>
    </div>
  );
};
