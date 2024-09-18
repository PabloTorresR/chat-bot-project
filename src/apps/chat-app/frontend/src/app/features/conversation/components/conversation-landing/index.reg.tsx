import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import useConversations from '../../hooks/useConversations';
import { useUserSelector } from '@chat-app/features/user/context/selectors/user';
import REGEATON_ILLUSTRATION from '@chat-app/assets/illustrations/reggeaton_singer_white.svg';

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
      <h1 className={styles.landing__title}>Push your musical skills beyond with <strong>Reggaetron</strong>, our most skilled assistant</h1>
      <div className={styles.landing__tutor}>
        <img className={styles.landing__tutor__illustration} src={REGEATON_ILLUSTRATION} alt={'avatar'}  />
        <p className={styles.landing__tutor__info}>Hey bro! I'm your reggaeton partner, ready to help you bring out that street flow. 🔥❤️ Let's create a new hit together, what do you say?</p>
      </div>
      <button onClick={handleNewChatClick} className={styles.landing__button}>
        Start chatting with Reggaetron
      </button>
    </div>
  );
};

export default ConversationLanding;
