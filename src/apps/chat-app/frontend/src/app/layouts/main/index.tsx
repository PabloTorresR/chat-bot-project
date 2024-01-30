import React from 'react';
import { MessageInputBox } from '../../features/conversation/components/message-input-box';
import Conversation from '../../features/conversation/components/conversation';

import styles from './styles.module.scss';
import Header from '../../components/header';

export const MainLayout = () => {
  return (
    <div id={styles.mainContainer}>
      <div id={styles.header}>
        <Header />
      </div>
      <div id={styles.leftPane}></div>
      <div></div>
      <div id={styles.contentContainer}>
        <Conversation />
        <MessageInputBox />
      </div>
    </div>
  );
};
