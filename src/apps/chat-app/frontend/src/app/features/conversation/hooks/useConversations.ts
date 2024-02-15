import useConversationStore from '../stores/conversation';
import useConversationsQuery from '../queries/useConversationsQuery';
import useMessagesQuery from '../queries/useMessagesQuery';

const useConversations = () => {
  const { data: conversations } = useConversationsQuery();
  const conversationStore = useConversationStore(state => ({
    conversation: state.conversation,
    setConversation: state.setConversation,
    setMessages: state.setMessages,
  }));
  const { data: messages } = useMessagesQuery(conversationStore.conversation?.id);

  const setConversation = (conversationId: string) => {
    const selectedConversation = conversations?.find(conversation => conversation.id === conversationId);
    conversationStore.setConversation(selectedConversation);
    conversationStore.setMessages(messages ?? []);
  };

  return { value: conversations, actions: { setConversation } };
};

export default useConversations;
