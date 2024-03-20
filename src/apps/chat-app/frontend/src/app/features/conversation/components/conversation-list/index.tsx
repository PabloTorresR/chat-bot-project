import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import newChatIcon from '/SVG/icn_squares_layers.svg';
import useConversations from '../../hooks/useConversations';
import classNames from 'classnames';

const ConversationList = () => {
  const {
    userConversations,
    conversation,
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
  }, []);

  return (
    <div className={styles.conversationList}>
      <button className={styles.conversationList__newChat} type="button" onClick={() => handleNewChatClick()}>
        <img src={newChatIcon} alt="icn" />
        <span>New chat</span>
      </button>
      {userConversations?.map(item => (
        <button
          className={classNames(styles.conversationList__item, conversation?.id === item.id && styles['-active'])}
          key={item.id}
          onClick={() => handleConversationClick(item.id)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default ConversationList;
