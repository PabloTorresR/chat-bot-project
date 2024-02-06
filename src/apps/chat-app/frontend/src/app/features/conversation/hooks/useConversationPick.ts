import useConversationStore from '../stores/conversation';
import useConversationsQuery from '../queries/useConversationsQuery';
import useMessagesQuery from '../queries/useMessagesQuery';

const useConversationPick = () => {
  const { data: conversations } = useConversationsQuery();
  const conversationStore = useConversationStore(state => ({
    conversation: state.conversation,
    setConversation: state.setConversation,
    setMessages: state.setMessages,
  }));
  const { data: messages } = useMessagesQuery(conversationStore.conversation?.id);

  const setConversation = (conversationId: string) => {
    console.log('messages', messages);
    const selectedConversation = conversations?.find(conversation => conversation.id === conversationId);
    conversationStore.setConversation(selectedConversation);
    conversationStore.setMessages(messages ?? []);
  };

  return { setConversation };
};

export default useConversationPick;
