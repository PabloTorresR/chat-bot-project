import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import newChatIcon from '/SVG/icn_squares_layers.svg';
import useConversations from '../../hooks/useConversations';

const ConversationList = () => {
  const {
    userConversations,
    actions: { setConversation, clearConversation },
  } = useConversations();

  const handleConversationClick = useCallback(
    (conversationId: string) => {
      setConversation(conversationId);
    },
    [setConversation],
  );

  const handleNewChatClick = useCallback(() => {
    clearConversation();
  }, []);

  return (
    <div className={styles.conversationList}>
      <button className={styles.conversationList__newChat} type="button" onClick={() => handleNewChatClick()}>
        <img src={newChatIcon} alt="icn" />
        <span>New chat</span>
      </button>
      {userConversations?.map(conversation => (
        <button
          className={styles.conversationList__item}
          key={conversation.id}
          onClick={() => handleConversationClick(conversation.id)}
        >
          {conversation.title}
        </button>
      ))}
    </div>
  );
};

export default ConversationList;
