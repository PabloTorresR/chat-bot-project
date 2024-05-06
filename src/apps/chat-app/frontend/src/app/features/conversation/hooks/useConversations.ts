import useConversationStore from '../stores/conversation';
import useConversationsQuery from '../queries/useConversationsQuery';
import useMessagesQuery from '../queries/useMessagesQuery';
import conversationService from '../services/conversation';
import { Message } from '../types/message';
import useSendMessageMutation from '../mutations/useSendMessageMutation';
import { PostMessagesRequest } from 'libs/dtos/chatapp/messages';
import { useUserSelector } from '@chat-app/features/user/context/selectors/user';

const useConversations = () => {
  const user = useUserSelector();
  const { selectedConversation, setSelectedConversation, isMessageLoading, setIsMessageLoading } = useConversationStore(
    state => ({
      selectedConversation: state.conversation,
      setSelectedConversation: state.setConversation,
      isMessageLoading: state.isMessageLoading,
      setIsMessageLoading: state.setIsMessageLoading,
    }),
  );

  const { sendMessage } = useSendMessageMutation({
    queryParams: { conversationId: selectedConversation ?? '', userId: user?.data.sub ?? '' },
    onMessageMessageSent: () => setIsMessageLoading(true),
    onMessageMessageReceived: () => setIsMessageLoading(false),
  });
  const { data: conversations, refetch: refetchConversations } = useConversationsQuery({
    queryParams: {
      userId: user?.data.sub ?? '',
    },
  });
  const { data: messages } = useMessagesQuery({
    queryParams: {
      conversationId: selectedConversation ?? '',
      userId: user?.data.sub ?? '',
    },
  });

  const setConversation = (conversationId: string) => {
    setIsMessageLoading(false);
    const selectedConversation = conversations?.find(conversation => conversation.id === conversationId);
    setSelectedConversation(selectedConversation?.id ?? null);
  };

  const createConversation = async (userId: string) => {
    const newConversation = conversationService.createConversation(userId);
    setSelectedConversation(newConversation.id);

    await conversationService.postConversation(newConversation, () => refetchConversations());
    return newConversation;
  };

  const clearConversation = () => setSelectedConversation(null);

  const sendUserMessage = (
    content: string,
    conversationId: string,
    userId: string,
    messageBuilder: (
      content: string,
      conversationId: string,
      userId: string,
      conversationHistory?: Message[],
    ) => PostMessagesRequest,
  ) => {
    const { message, messageHistory } = messageBuilder(content, conversationId, userId, messages);

    sendMessage({ message, messageHistory });
  };

  return {
    messages,
    conversations,
    currentConversation: selectedConversation,
    actions: { setConversation, createConversation, clearConversation, sendUserMessage },
    isSendMessageLoading: isMessageLoading,
  };
};

export default useConversations;
