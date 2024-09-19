import useMessagesQuery from '../queries/useMessagesQuery';
import { Message } from '../types/message';
import useSendMessageMutation from '../mutations/useSendMessageMutation';
import { PostMessagesRequest } from 'dtos-lib/chatapp/messages';
import { useUserSelector } from '@chat-app/features/user/context/selectors/user';
import { AvailableLanguages } from '@chat-app/constants/languages';

const useConversationMessages = (conversationId: string, setIsLoading?: (state: boolean) => void) => {
  const user = useUserSelector();
  const { data: messages } = useMessagesQuery({
    queryParams: {
      conversationId: conversationId ?? '',
      userId: user?.data.sub ?? '',
    },
  });
  const { sendMessage } = useSendMessageMutation({
    queryParams: { conversationId: conversationId ?? '', userId: user?.data.sub ?? '' },
    onMessageSent: () => setIsLoading?.(true),
    onMessageReceived: () => setIsLoading?.(false),
  });

  const sendUserMessage = (
    content: string,
    conversationId: string,
    userId: string,
    messageBuilder: (
      content: string,
      conversationId: string,
      userId: string,
      userLanguage: AvailableLanguages,
      conversationHistory?: Message[],
    ) => PostMessagesRequest,
  ) => {
    const messagePayload = messageBuilder(
      content,
      conversationId,
      userId,
      (user?.data.language as AvailableLanguages) ?? AvailableLanguages.EN,
      messages,
    );

    sendMessage(messagePayload);
  };

  return {
    messages,
    actions: { sendUserMessage },
  };
};

export default useConversationMessages;
