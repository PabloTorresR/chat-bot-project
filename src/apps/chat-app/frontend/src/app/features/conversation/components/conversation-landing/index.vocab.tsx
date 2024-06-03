import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import useConversations from '../../hooks/useConversations';
import { useUserSelector } from '@chat-app/features/user/context/selectors/user';
import ANJA_ILLUSTRATION from '@chat-app/assets/illustrations/anja.png';

const ConversationLanding = () => {
  const user = useUserSelector();
  const {
    actions: { createConversation },
  } = useConversations();
  const handleNewChatClick = useCallback(() => {
    createConversation(user?.data.sub ?? '');
  }, [createConversation, user?.data.sub]);

  return (
    <div className={styles.landing}>
      <h1 className={styles.landing__title}>Push your language skills beyond with <strong>Anja</strong>, our most skilled assistant</h1>
      <div className={styles.landing__tutor}>
        <img className={styles.landing__tutor__illustration} src={ANJA_ILLUSTRATION} alt={'avatar'}  />
        <p className={styles.landing__tutor__info}>Hi! I'm here to help you surprise natives with the most funky words in any language</p>
      </div>
      <button onClick={handleNewChatClick} className={styles.landing__button}>
        Start chatting with Anja
      </button>
    </div>
  );
};

export default ConversationLanding;
