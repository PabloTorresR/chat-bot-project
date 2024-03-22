import InputBox from '../../../../components/input-box';
import messageBuilder from '../../services/message-builder';
import { useCallback } from 'react';
import useConversations from '../../hooks/useConversations';

export const MessageInputBox = () => {
  const {
    conversation,
    actions: { sendUserMessage },
    isSendMessageLoading: isLoading,
  } = useConversations();

  const handleSubmitClick = useCallback(
    async (value: string) => {
      if (!conversation?.id) {
        return;
      }
      sendUserMessage(value, conversation?.id, messageBuilder.buildPostMessageDto);
    },
    [conversation?.id, sendUserMessage],
  );

  return <InputBox onSubmitClick={handleSubmitClick} isLoading={isLoading} />;
};
