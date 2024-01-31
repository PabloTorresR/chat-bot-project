import React, { useCallback } from 'react';
import useConversationStore from '../../stores/conversation';
import { Conversation } from '../../types/conversation';
import styles from './styles.module.scss';

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
      <h2>Conversations</h2>
      <ul>
        {FAKE_CONVERSATIONS.map(conversation => (
          <li
            className={styles.conversationList__item}
            key={conversation.id}
            onClick={() => handleConversationClick(conversation)}
          >
            {conversation.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
