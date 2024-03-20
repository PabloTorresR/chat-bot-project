import InputBox from '../../../../components/input-box';
import messageBuilder from '../../services/message-builder';
import { useCallback, useMemo } from 'react';
import useConversations from '../../hooks/useConversations';

export const MessageInputBox = () => {
  const {
    conversation,
    actions: { createConversation, sendUserMessage },
    isSendMessageLoading: isLoading,
  } = useConversations();

  const isConversationEmpty = useMemo(() => !conversation?.id, [conversation]);

  const handleSubmitClick = useCallback(
    async (value: string) => {
      if (!conversation?.id) {
        return;
      }
      sendUserMessage(value, conversation?.id, messageBuilder.buildPostMessageDto);
    },
    [sendUserMessage, createConversation, isConversationEmpty],
  );

  return <InputBox onSubmitClick={handleSubmitClick} isLoading={isLoading} />;
};
