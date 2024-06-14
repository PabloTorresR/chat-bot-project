import React from 'react';
import MessageItem from './components/message-item';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { MessageSender } from '../../enums/message-sender';
import { formatTimestamp, getNowTimestamp } from '../../../../utils/time';
import { useChatScroll } from '../../../../hooks/use-chat-scroll';
import useConversations from '../../hooks/useConversations';
import DotTyping from '@chat-app/components/dot-typing';
import USER_DEFAULT_AVATAR from '/SVG/icn_3d_person.svg';
import REGEATON_AVATAR from '/illustrations/reggeaton_singer_white.svg';
import { DefaultMessages } from '../../constants/default-messages';

const userAvatarUrl = USER_DEFAULT_AVATAR
const botAvatarUrl = REGEATON_AVATAR

const Conversation = () => {
  const { messages, isSendMessageLoading } = useConversations();
  const chatRef = useChatScroll(messages);

  return (
    <div className={styles.conversation} ref={chatRef}>
      <MessageItem
        className={classNames(styles.conversation__message)}
        key={'first-message-key'}
        messageSender={MessageSender.BOT}
        content={DefaultMessages.FIRST_BOT_MESSAGE}
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
          content={<DotTyping />}
          avatar={botAvatarUrl}
          isLeftSide
        />
      )}
    </div>
  );
};

export default Conversation;
