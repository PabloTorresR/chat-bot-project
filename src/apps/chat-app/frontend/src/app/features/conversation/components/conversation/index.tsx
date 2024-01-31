import React from 'react';
import MessageItem from './components/message-item';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { MessageSender } from '../../enums/message-sender';
import useConversationStore from '../../stores/conversation';

const Conversation = () => {
  const conversation = useConversationStore(state => state.conversation);
  return (
    <div className={styles.conversation}>
      {conversation?.messages.map(message => (
        <MessageItem
          className={classNames(styles.conversation__message, message.sender === MessageSender.USER && styles['-user'])}
          key={message.id}
          messageSender={message.sender}
          content={message.content}
          isLeftSide={message.sender !== MessageSender.USER}
        />
      ))}
    </div>
  );
};

export default Conversation;
