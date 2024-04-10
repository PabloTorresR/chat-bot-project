import useConversationStore from '../stores/conversation';
import useConversationsQuery from '../queries/useConversationsQuery';
import useMessagesQuery from '../queries/useMessagesQuery';
import conversationService from '../services/conversation';
import { HistoryMessage, Message } from '../types/message';
import useSendMessageMutation from '../mutations/useSendMessageMutation';

const useConversations = () => {
  const { selectedConversation, setSelectedConversation } = useConversationStore(state => ({
    selectedConversation: state.conversation,
    setSelectedConversation: state.setConversation,
  }));

  const { sendMessage, isLoading } = useSendMessageMutation(selectedConversation ?? '');
  const { data: conversations, refetch: refetchConversations } = useConversationsQuery();
  const { data: messages } = useMessagesQuery(selectedConversation ?? '');

  const setConversation = (conversationId: string) => {
    const selectedConversation = conversations?.find(conversation => conversation.id === conversationId);
    setSelectedConversation(selectedConversation?.id ?? null);
  };

  const createConversation = async () => {
    const newConversation = conversationService.createConversation();
    setSelectedConversation(newConversation.id);

    await conversationService.postConversation(newConversation, () => refetchConversations());
    return newConversation;
  };

  const clearConversation = () => setSelectedConversation(null);

  const sendUserMessage = (
    content: string,
    conversationId: string,
    messageBuilder: (
      content: string,
      conversationId: string,
      conversationHistory?: Message[],
    ) => { message: Message; messageHistory: HistoryMessage[] },
  ) => {
    const { message, messageHistory } = messageBuilder(content, conversationId, messages);

    sendMessage({ message, messageHistory });
  };

  return {
    messages,
    conversations,
    currentConversation: selectedConversation,
    actions: { setConversation, createConversation, clearConversation, sendUserMessage },
    isSendMessageLoading: isLoading,
  };
};

export default useConversations;
