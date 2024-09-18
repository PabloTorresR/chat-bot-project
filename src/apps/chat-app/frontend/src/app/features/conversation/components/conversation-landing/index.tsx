import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import useConversations from '../../hooks/useConversations';
import { useUserSelector } from '@chat-app/features/user/context/selectors/user';
import ANJA_ILLUSTRATION from '/assets/illustrations/anja_4.png';
import Button from '@chat-app/components/button';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '@chat-app/routes/namespaces';
import { FeaturesCarousell } from './components/feature-carousel';

const ConversationLanding = () => {
  const user = useUserSelector();
  const {
    actions: { createConversation },
  } = useConversations();
  const navigate = useNavigate();

  const handleNewChatClick = useCallback(() => {
    navigate(RouteName.Routes.CONVERSATIONS);
    createConversation(user?.data.sub ?? '');
  }, [navigate, createConversation, user?.data.sub]);

  return (
    <div className={styles.landing}>
      <h1 className={styles.landing__title}>
        Push your language skills beyond with <strong>Anja</strong>, our most skilled assistant
      </h1>
      <div className={styles.landing__description}>
        <div className={styles.landing__tutor}>
          <img className={styles.landing__tutor__illustration} src={ANJA_ILLUSTRATION} alt={'avatar'} />
          <p className={styles.landing__tutor__info}>
            Hi! I'm here to help you surprise natives with the most funky words in any language
            <br />
            <br />
            <strong> Let's start creating some flashcards together</strong>
          </p>
        </div>

        <FeaturesCarousell />
      </div>
      <Button onClick={handleNewChatClick} classNames={styles.landing__button} label={'Start chatting with Anja'} />
    </div>
  );
};

export default ConversationLanding;
