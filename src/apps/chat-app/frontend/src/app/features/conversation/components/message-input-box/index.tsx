import InputBox from '../../../../components/input-box';
import messageBuilder from '../../services/message-builder';
import { useCallback } from 'react';
import useConversations from '../../hooks/useConversations';
import { useUserSelector } from '@chat-app/features/user/context/selectors/user';

export const MessageInputBox = () => {
  const {
    currentConversation,
    actions: { sendUserMessage },
    isSendMessageLoading: isLoading,
  } = useConversations();

  const user = useUserSelector();

  const handleSubmitClick = useCallback(
    async (value: string) => {
      if (!currentConversation || !user?.data.sub) {
        return;
      }
      sendUserMessage(value, currentConversation, user?.data.sub, messageBuilder.buildPostMessageDto);
    },
    [currentConversation, sendUserMessage, user?.data.sub],
  );

  return currentConversation && <InputBox onSubmitClick={handleSubmitClick} isLoading={isLoading} />;
};
