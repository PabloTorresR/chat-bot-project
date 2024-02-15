import React, { useCallback } from 'react';
import { Conversation } from '../../types/conversation';
import styles from './styles.module.scss';
import newChatIcon from '/SVG/icn_squares_layers.svg';
import useConversations from '../../hooks/useConversations';

const FAKE_CONVERSATIONS: Conversation[] = [
  { id: '1', title: 'Conversation 1' },
  { id: '2', title: 'Conversation 2' },
  { id: '3', title: 'Conversation 3' },
];
const ConversationList = () => {
  const {
    value: conversations,
    actions: { setConversation },
  } = useConversations();
  const handleConversationClick = useCallback(
    //TODO: the type will be string, when clicking the button, the conversation is fetched to the BE, using react-qeury
    //then the new one is added to the store
    (conversationId: string) => {
      setConversation(conversationId);
    },
    [setConversation],
  );

  return (
    <div className={styles.conversationList}>
      <button className={styles.conversationList__newChat}>
        <img src={newChatIcon} alt="icn" />
        <span>New chat</span>
      </button>
      {conversations?.map(conversation => (
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
