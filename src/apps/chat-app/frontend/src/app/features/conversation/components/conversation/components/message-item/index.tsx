import React, { memo } from 'react';

import styles from './styles.module.scss';
import classnames from 'classnames';
import { MessageSender } from '../../../../enums/message-sender';
import robotAvatarImage from '../../../../../../../../public/avatar/robot.jpg';

type Props = {
  content: string;
  messageSender: MessageSender;
  className?: string;
  isLeftSide?: boolean;
};

const MessageItem = memo(({ content, messageSender, className, isLeftSide }: Props) => {
  const avatarImage = messageSender === MessageSender.BOT ? robotAvatarImage : robotAvatarImage;

  return (
    <>
      <img src={avatarImage} alt="Avatar" className={styles.message__avatar} />
      <div className={classnames(styles.message, className, isLeftSide && styles['-isLeftSide'])}>
        <p className={styles.message__text}>{content}</p>
      </div>
    </>
  );
});

export default MessageItem;
