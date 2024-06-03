import React from 'react';
import styles from './styles.module.scss';
import SETTINGS_ICON from '/SVG/icn_cogs.svg';
import WORDS_ICON from '/SVG/icn_puzzle.svg';
import CONVERSATIONS_ICON from '/SVG/icn_network.svg';
import classNames from 'classnames';

export const PageList = () => {
  return (
    <div className={styles.pageList}>
      <div className={styles.pageList__options}>
        <div className={styles.pageList__options__elem}>
          <img src={CONVERSATIONS_ICON} alt="conv" />
          Conversations
        </div>
        <div className={classNames(styles.pageList__options__elem, ['-disabled'])}>
          <img src={WORDS_ICON} alt="words" />
          Words
        </div>
        <div className={styles.pageList__options__elem}>
          <img src={SETTINGS_ICON} alt="sett" />
          Settings
        </div>
      </div>
    </div>
  );
};
