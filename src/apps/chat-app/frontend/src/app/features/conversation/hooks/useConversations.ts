import { useEffect } from 'react';
import useConversationStore from '../stores/conversation';
import useConversationsQuery from '../queries/useConversationsQuery';
import useMessagesQuery from '../queries/useMessagesQuery';
import conversationService from '../services/conversation';
import useSendMessage from './useSendMessage';
import { Message } from '../types/message';
import { PostMessageDto } from '../types/dto';

const useConversations = () => {
  const conversationStore = useConversationStore(state => ({
    conversation: state.conversation,
    messageHistory: state.messages,
    setConversation: state.setConversation,
    setMessages: state.setMessages,
    addMessage: state.addMessage,
  }));

  const { data: userConversations } = useConversationsQuery();
  const { data: messages } = useMessagesQuery(conversationStore.conversation?.id);

  const { sendMessage, isLoading } = useSendMessage();

  useEffect(() => {
    conversationStore.setMessages(messages ?? []);
  }, [messages, conversationStore.setMessages]);

  const setConversation = (conversationId: string) => {
    const selectedConversation = userConversations?.find(conversation => conversation.id === conversationId);
    conversationStore.setConversation(selectedConversation);
  };

  const createConversation = () => {
    const newConversation = conversationService.buildConversation();
    conversationStore.setConversation(newConversation);
  };

  const clearConversation = () => {
    conversationStore.setConversation(null);
    conversationStore.setMessages([]);
  };

  const sendUserMessage = (
    content: string,
    messageBuilder: (content: string, conversationId: string, conversationHistory?: Message[]) => PostMessageDto,
  ) => {
    if (!conversationStore.conversation) {
      throw new Error('No conversation selected');
    }
    const { message, messageHistory } = messageBuilder(content, conversationStore.conversation?.id, messages);

    conversationStore.addMessage(message);
    sendMessage({ message, messageHistory });
  };

  return {
    userConversations,
    conversation: conversationStore.conversation,
    actions: { setConversation, createConversation, clearConversation, sendUserMessage },
    isSendMessageLoading: isLoading,
  };
};

export default useConversations;
