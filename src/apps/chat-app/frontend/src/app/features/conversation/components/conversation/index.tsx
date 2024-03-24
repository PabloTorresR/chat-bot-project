import React from 'react';
import MessageItem from './components/message-item';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { MessageSender } from '../../enums/message-sender';
import { formatTimestamp } from '../../../../utils/time';
import { useChatScroll } from '../../../../hooks/use-chat-scroll';
import useConversations from '../../hooks/useConversations';

const fakeAvatarUrl = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';

const Conversation = () => {
  const { messages, isSendMessageLoading } = useConversations();
  const chatRef = useChatScroll(messages);

  return (
    <div className={styles.conversation} ref={chatRef}>
      {messages?.map(message => (
        <MessageItem
          className={classNames(styles.conversation__message, message.sender === MessageSender.USER && styles['-user'])}
          key={message.id}
          messageSender={message.sender}
          content={message.content}
          isLeftSide={message.sender !== MessageSender.USER}
          dateTime={formatTimestamp(message.createdAt)}
          userAvatarUrl={message.sender === MessageSender.USER ? fakeAvatarUrl : undefined}
        />
      ))}
      {isSendMessageLoading && (
        <MessageItem
          className={classNames(styles.conversation__message)}
          key={'loadingKey'}
          messageSender={MessageSender.BOT}
          content={'...'}
          isLeftSide
        />
      )}
    </div>
  );
};

export default Conversation;
