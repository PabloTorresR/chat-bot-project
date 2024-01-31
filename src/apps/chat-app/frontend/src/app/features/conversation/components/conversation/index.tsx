import React from 'react';
import MessageItem from './components/message-item';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { MessageSender } from '../../enums/message-sender';
import useConversationStore from '../../stores/conversation';
import { formatTimestamp } from '../../../../utils/time';

const fakeAvatarUrl = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';

const Conversation = () => {
  const messages = useConversationStore(state => state.messages);
  return (
    <div className={styles.conversation}>
      {messages.map(message => (
        <MessageItem
          className={classNames(styles.conversation__message, message.sender === MessageSender.USER && styles['-user'])}
          key={message.id}
          messageSender={message.sender}
          content={message.content}
          isLeftSide={message.sender !== MessageSender.USER}
          dateTime={formatTimestamp(message.timestamp)}
          userAvatarUrl={message.sender === MessageSender.USER ? fakeAvatarUrl : undefined}
        />
      ))}
    </div>
  );
};

export default Conversation;
