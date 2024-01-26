import React from 'react';
import MessageItem from './components/message-item';
import { Message } from '../../types/message';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { MessageSender } from '../../enums/message-sender';

interface Props {
  messages: Message[];
}

const Conversation = ({ messages }: Props) => {
  return (
    <div className={styles.conversation}>
      {messages.map(message => (
        <MessageItem
          className={classNames(styles.conversation__message, message.sender === MessageSender.USER && styles['-user'])}
          key={message.id}
          messageSender={message.sender}
          content={message.content}
        />
      ))}
    </div>
  );
};

export default Conversation;
