import { useEffect } from 'react';
import useConversationStore from '../stores/conversation';
import useConversationsQuery from '../queries/useConversationsQuery';
import useMessagesQuery from '../queries/useMessagesQuery';
import conversationService from '../services/conversation';
import useSendMessage from './useSendMessage';
import { HistoryMessage, Message } from '../types/message';

const useConversations = () => {
  const conversationStore = useConversationStore(state => ({
    conversation: state.conversation,
    messageHistory: state.messages,
    setConversation: state.setConversation,
    setMessages: state.setMessages,
    addMessage: state.addMessage,
  }));

  const { data: userConversations, refetch: refetchConversations } = useConversationsQuery();
  const { data: messages } = useMessagesQuery(conversationStore.conversation?.id);

  const { sendMessage, isLoading } = useSendMessage();

  useEffect(() => {
    conversationStore.setMessages(messages ?? []);
  }, [messages, conversationStore.setMessages]);

  const setConversation = (conversationId: string) => {
    const selectedConversation = userConversations?.find(conversation => conversation.id === conversationId);
    conversationStore.setConversation(selectedConversation);
  };

  const createConversation = async () => {
    const newConversation = conversationService.createConversation();
    conversationStore.setConversation(newConversation);
    conversationStore.setMessages([]);

    await conversationService.postConversation(newConversation, () => refetchConversations());
    return newConversation;
  };

  const clearConversation = () => {
    conversationStore.setConversation(null);
    conversationStore.setMessages([]);
  };

  const sendUserMessage = (
    content: string,
    conversationId: string,
    messageBuilder: (
      content: string,
      conversationId: string,
      conversationHistory?: Message[],
    ) => { message: Message; messageHistory: HistoryMessage[] },
  ) => {
    const { message, messageHistory } = messageBuilder(content, conversationId, conversationStore.messageHistory);

    conversationStore.addMessage(message);
    sendMessage({
      body: { message, messageHistory },
      callback: (response: Message) => conversationStore.addMessage(response),
    });
  };

  return {
    messages: conversationStore.messageHistory,
    userConversations,
    conversation: conversationStore.conversation,
    actions: { setConversation, createConversation, clearConversation, sendUserMessage },
    isSendMessageLoading: isLoading,
  };
};

export default useConversations;
