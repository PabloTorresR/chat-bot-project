import { useEffect } from 'react';
import useConversationStore from '../stores/conversation';
import useConversationsQuery from '../queries/useConversationsQuery';
import useMessagesQuery from '../queries/useMessagesQuery';
import conversationService from '../services/conversation';
import { Conversation } from '../types/conversation';

const useConversations = () => {
  const conversationStore = useConversationStore(state => ({
    conversation: state.conversation,
    setConversation: state.setConversation,
    setMessages: state.setMessages,
  }));

  const { data: conversations } = useConversationsQuery();
  const { data: messages } = useMessagesQuery(conversationStore.conversation?.id);

  useEffect(() => {
    conversationStore.setMessages(messages ?? []);
  }, [messages, conversationStore.setMessages]);

  const set = (conversationId: string) => {
    const selectedConversation = conversations?.find(conversation => conversation.id === conversationId);
    conversationStore.setConversation(selectedConversation);
  };

  const create = (): Conversation => {
    const newConversation = conversationService.buildConversation();
    conversationStore.setConversation(newConversation);
    return newConversation;
  };

  const clear = () => {
    conversationStore.setConversation(null);
    conversationStore.setMessages([]);
  };

  return { value: conversations, actions: { set, create, clear } };
};

export default useConversations;
