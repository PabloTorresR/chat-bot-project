import InputBox from '../../../../components/input-box';
import messageBuilder from '../../services/message-builder';
import { useCallback } from 'react';
import useConversations from '../../hooks/useConversations';
import { useUserSelector } from '@chat-app/features/user/context/selectors/user';
import Button from '@chat-app/components/button';

export const MessageInputBox = () => {
  const {
    currentConversation,
    actions: { sendUserMessage, createConversation },
    isSendMessageLoading: isLoading,
  } = useConversations();

  const user = useUserSelector();

  const handleNewChatClick = useCallback(() => {
    createConversation(user?.data.sub ?? '');
  }, [createConversation, user?.data.sub]);

  const handleSubmitClick = useCallback(
    async (value: string) => {
      if (!currentConversation || !user?.data.sub) {
        return;
      }
      sendUserMessage(value, currentConversation, user?.data.sub, messageBuilder.buildPostMessageDto);
    },
    [currentConversation, sendUserMessage, user?.data.sub],
  );

  return currentConversation ? (
    <InputBox onSubmitClick={handleSubmitClick} isLoading={isLoading} />
  ) : (
    <Button onClick={handleNewChatClick} label={'Start chatting with Anja'} />
  );
};
