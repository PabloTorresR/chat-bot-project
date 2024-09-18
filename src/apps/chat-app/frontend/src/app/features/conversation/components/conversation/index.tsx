import React from 'react';
import MessageItem from './components/message-item';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { MessageSender } from '../../enums/message-sender';
import { formatTimestamp, getNowTimestamp } from '../../../../utils/time';
import { useChatScroll } from '../../../../hooks/use-chat-scroll';
import useConversations from '../../hooks/useConversations';
import USER_DEFAULT_AVATAR from '/SVG/icn_person.svg';
import ANJA_ILLUSTRATION from '/assets/illustrations/anja_4.png';

import { DefaultMessages } from '../../constants/default-messages';

const userAvatarUrl = USER_DEFAULT_AVATAR;
const botAvatarUrl = ANJA_ILLUSTRATION;

const Conversation = () => {
  const { messages, isSendMessageLoading } = useConversations();
  const chatRef = useChatScroll(messages);

  return (
    <div className={styles.conversation} ref={chatRef}>
      <MessageItem
        className={classNames(styles.conversation__message)}
        key={'first-message-key'}
        messageSender={MessageSender.BOT}
        content={DefaultMessages.FIRST_BOT_MESSAGE_ANJA}
        isLeftSide
        dateTime={formatTimestamp(getNowTimestamp())}
        avatar={botAvatarUrl}
      />
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
          avatar={message.sender === MessageSender.USER ? userAvatarUrl : botAvatarUrl}
        />
      ))}
      {isSendMessageLoading && (
        <MessageItem
          className={classNames(styles.conversation__message)}
          key={'loadingKey'}
          messageSender={MessageSender.BOT}
          content={''}
          avatar={botAvatarUrl}
          isLeftSide
          isLoading
        />
      )}
    </div>
  );
};

export default Conversation;
