import React from 'react';

import styles from './styles.module.scss';
import classnames from 'classnames';
import { MessageSender } from '../../../../enums/message-sender';

type Props = {
  content: string;
  messageSender: MessageSender;
};

const MessageItem = ({ content, messageSender }: Props) => {
  return (
    <div className={classnames(styles.message, messageSender === MessageSender.USER && styles['-user'])}>
      <p className={styles.message__text}>{content}</p>
    </div>
  );
};

export default MessageItem;
