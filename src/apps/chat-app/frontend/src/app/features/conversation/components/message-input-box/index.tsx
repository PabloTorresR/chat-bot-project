import InputBox from '../../../../components/input-box';
import messageBuilder from '../../services/message-builder';
import { useCallback } from 'react';
import useConversations from '../../hooks/useConversations';

export const MessageInputBox = () => {
  const {
    currentConversation,
    actions: { sendUserMessage },
    isSendMessageLoading: isLoading,
  } = useConversations();

  const handleSubmitClick = useCallback(
    async (value: string) => {
      if (!currentConversation) {
        return;
      }
      sendUserMessage(value, currentConversation, messageBuilder.buildPostMessageDto);
    },
    [currentConversation, sendUserMessage],
  );

  return <InputBox onSubmitClick={handleSubmitClick} isLoading={isLoading} />;
};
