import React, { useCallback } from 'react';
import useConversationStore from '../../stores/conversation';
import { Conversation } from '../../types/conversation';
import styles from './styles.module.scss';
import newChatIcon from '/SVG/icn_squares_layers.svg';

const FAKE_CONVERSATIONS: Conversation[] = [
  { id: '1', title: 'Conversation 1' },
  { id: '1', title: 'Conversation 2' },
  { id: '1', title: 'Conversation 3' },
];
const ConversationList = () => {
  const setConversation = useConversationStore(state => state.setConversation);
  const handleConversationClick = useCallback(
    //TODO: the type will be string, when clicking the button, the conversation is fetched to the BE, using react-qeury
    //then the new one is added to the store
    (conversation: Conversation) => {
      setConversation(conversation);
    },
    [setConversation],
  );

  return (
    <div className={styles.conversationList}>
      <button className={styles.conversationList__newChat}>
        <img src={newChatIcon} alt="icn" />
        <span>New chat</span>
      </button>
      {FAKE_CONVERSATIONS.map(conversation => (
        <button
          className={styles.conversationList__item}
          key={conversation.id}
          onClick={() => handleConversationClick(conversation)}
        >
          {conversation.title}
        </button>
      ))}
    </div>
  );
};

export default ConversationList;
