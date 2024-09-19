import useConversationStore from '../stores/conversation';
import useConversationsQuery from '../queries/useConversationsQuery';
import conversationService from '../services/conversation';
import { useUserSelector } from '@chat-app/features/user/context/selectors/user';
import useConversationMessages from './useConversationMessages';
import { postConversations, deleteConversationById } from '../api/conversations';

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
  const {
    messages,
    actions: { sendUserMessage },
  } = useConversationMessages(selectedConversation ?? '', setIsMessageLoading);

  const {
    data: conversations,
    refetch: refetchConversations,
    isLoading: isGetConversationsLoading,
  } = useConversationsQuery({
    queryParams: {
      userId: user?.data.sub ?? '',
    },
  });

  const setConversation = (conversationId: string) => {
    setIsMessageLoading(false);
    setSelectedConversation(conversationId ?? null);
  };

  const createConversation = async (userId: string) => {
    const newConversation = conversationService.createConversation(userId);
    setConversation(newConversation.id);
    await postConversations(newConversation);
    refetchConversations();
    return newConversation;
  };

  const clearConversation = () => setSelectedConversation(null);

  const setLastConversation = () => {
    setSelectedConversation(
      conversations?.filter(conversation => conversation.id !== selectedConversation)?.[0].id ?? null,
    );
  };

  const deleteConversation = async (conversationId: string) => {
    await deleteConversationById(conversationId);
    setLastConversation();
    refetchConversations();
  };

  return {
    messages,
    conversations,
    currentConversation: selectedConversation,
    actions: { setConversation, createConversation, clearConversation, sendUserMessage, deleteConversation },
    isSendMessageLoading: isMessageLoading,
    isGetConversationsLoading,
  };
};

export default useConversations;
