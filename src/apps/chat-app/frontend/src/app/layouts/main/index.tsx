import React from 'react';
import { MessageInputBox } from '../../features/conversation/components/message-input-box';
import Conversation from '../../features/conversation/components/conversation';
import { Message } from '../../features/conversation/types/message';
import { MessageSender } from '../../features/conversation/enums/message-sender';

import styles from './styles.module.scss';
import Header from '../../components/header';

const messages: Message[] = [
  {
    id: '2',
    sender: MessageSender.USER,
    content: 'Hola',
  },
  {
    id: '3',
    sender: MessageSender.BOT,
    content: 'Hola',
  },
  {
    id: '3',
    sender: MessageSender.BOT,
    content: 'Hola',
  },
  {
    id: '3',
    sender: MessageSender.USER,
    content: 'Adios',
  },
];

export const MainLayout = () => {
  return (
    <div id={styles.mainContainer}>
      <div id={styles.header}>
        <Header />
      </div>
      <div id={styles.leftPane}></div>
      <div></div>
      <div id={styles.contentContainer}>
        <Conversation messages={messages} />
        <MessageInputBox />
      </div>
    </div>
  );
};
