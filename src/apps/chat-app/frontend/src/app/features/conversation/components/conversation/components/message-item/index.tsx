import React, { memo } from 'react';

import styles from './styles.module.scss';
import classnames from 'classnames';
import { MessageSender } from '../../../../enums/message-sender';
import botAvatarIcon from '/SVG/icn_robot_face.svg';

type Props = {
  content: string;
  messageSender: MessageSender;
  className?: string;
  isLeftSide?: boolean;
  dateTime?: string;
};

const MessageItem = memo(({ content, messageSender, className, isLeftSide, dateTime }: Props) => {
  const avatarImage = messageSender === MessageSender.BOT ? botAvatarIcon : botAvatarIcon;

  return (
    <div className={classnames(styles.messageItem, className, isLeftSide && styles['-isLeftSide'])}>
      <div className={styles.message}>
        <p className={styles.message__text}>{content}</p>
        <p className={styles.message__dateTime}>{dateTime}</p>
      </div>
      <img src={avatarImage} alt="Avatar" className={styles.message__avatar} />
    </div>
  );
});

export default MessageItem;
