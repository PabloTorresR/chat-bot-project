import React from 'react';
import MessageItem from './components/message-item';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { MessageSender } from '../../enums/message-sender';
import { formatTimestamp } from '../../../../utils/time';
import { useChatScroll } from '../../../../hooks/use-chat-scroll';
import useConversations from '../../hooks/useConversations';
import DotTyping from '@chat-app/components/dot-typing';
import USER_DEFAULT_AVATAR from '/SVG/icn_3d_person.svg';

const Conversation = () => {
  const { messages, isSendMessageLoading } = useConversations();
  const chatRef = useChatScroll(messages);
  return (
    <div className={styles.conversation} ref={chatRef}>
      {messages?.map(message => (
        <MessageItem
          className={classNames(
            styles.conversation__message,
            message?.sender === MessageSender.USER && styles['-user'],
          )}
          key={message.id}
          messageSender={message.sender}
          content={message.content}
          isLeftSide={message.sender !== MessageSender.USER}
          dateTime={formatTimestamp(message.createdAt)}
          userAvatarUrl={message.sender === MessageSender.USER ? USER_DEFAULT_AVATAR : undefined}
        />
      ))}
      {isSendMessageLoading && (
        <MessageItem
          className={classNames(styles.conversation__message)}
          key={'loadingKey'}
          messageSender={MessageSender.BOT}
          content={<DotTyping />}
          isLeftSide
        />
      )}
    </div>
  );
};

export default Conversation;
