import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import useConversations from '../../hooks/useConversations';

const ConversationLanding = () => {
  const {
    actions: { createConversation },
  } = useConversations();
  const handleNewChatClick = useCallback(() => {
    createConversation();
  }, [createConversation]);

  return (
    <div className={styles.landing}>
      <h1 className={styles.landing}>Welcome to the Chat App!</h1>
      <p className={styles.landing__info}>Get started by clicking the button below to start a new chat.</p>
      <button onClick={handleNewChatClick} className={styles.landing__button}>
        Start Chat
      </button>
    </div>
  );
};

export default ConversationLanding;
