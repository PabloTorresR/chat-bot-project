import React, { ReactNode, memo } from 'react';

import styles from './styles.module.scss';
import classnames from 'classnames';
import { MessageSender } from '../../../../enums/message-sender';
import Avatar from '../../../../../../components/avatar';

type Props = {
  content: ReactNode;
  messageSender: MessageSender;
  className?: string;
  isLeftSide?: boolean;
  dateTime?: string;
  avatar?: string;
};

const AVATAR_SIZE = 36;

const MessageItem = memo(({ content, messageSender, className, isLeftSide, dateTime, avatar }: Props) => {
  const avatarImage = {
    [MessageSender.BOT]: <img src={avatar} alt="Avatar" className={styles.message__avatar} />,
    [MessageSender.USER]: <Avatar imageUrl={avatar ?? ''} size={AVATAR_SIZE} />,
  };

  return (
    <div className={classnames(styles.messageItem, className, isLeftSide && styles['-isLeftSide'])}>
      <div className={styles.message}>
        <p className={styles.message__text}>{content}</p>
        <p className={styles.message__dateTime}>{dateTime}</p>
      </div>
      {avatarImage[messageSender]}
    </div>
  );
});

export default MessageItem;
