import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import newChatIcon from '/SVG/icn_squares_layers.svg';
import useConversations from '../../hooks/useConversations';
import classNames from 'classnames';

const ConversationList = () => {
  const {
    conversations,
    currentConversation,
    actions: { setConversation, createConversation },
  } = useConversations();

  const handleConversationClick = useCallback(
    (conversationId: string) => {
      setConversation(conversationId);
    },
    [setConversation],
  );

  const handleNewChatClick = useCallback(() => {
    createConversation();
  }, [createConversation]);

  return (
    <div className={styles.conversationList}>
      <button className={styles.conversationList__newChat} type="button" onClick={() => handleNewChatClick()}>
        <img src={newChatIcon} alt="icn" />
        <span>New chat</span>
      </button>
      <div className={styles.conversationList__list}>
        {conversations?.map(item => (
          <button
            className={classNames(styles.conversationList__item, currentConversation === item.id && styles['-active'])}
            key={item.id}
            onClick={() => handleConversationClick(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
