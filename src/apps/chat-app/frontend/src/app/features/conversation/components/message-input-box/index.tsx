import useSendMessage from '../../hooks/useSendMessage';
import InputBox from '../../../../components/input-box';
import useConversationStore from '../../stores/conversation';
import messageBuilder from '../../services/message-builder';
import { useCallback, useMemo } from 'react';
import useConversations from '../../hooks/useConversations';
import { Conversation } from '../../types/conversation';

export const MessageInputBox = () => {
  const API_URL = `${import.meta.env.VITE_API_URL_PROD}/messages`;
  const { addMessage, setConversation, conversationId } = useConversationStore(state => ({
    addMessage: state.addMessage,
    setConversation: state.setConversation,
    conversationId: state.conversation?.id,
  }));

  const {
    actions: { create: createConversation },
  } = useConversations();

  const isConversationEmpty = useMemo(() => !conversationId, [conversationId]);

  const { sendMessage, isLoading } = useSendMessage(API_URL);

  const _createAndSetConversation = useCallback((): Conversation => {
    const newConversation = createConversation();
    setConversation(newConversation);
    return newConversation;
  }, [createConversation, setConversation]);

  const _createAndSendMessage = useCallback(
    async (value: string, conversationId: string) => {
      const message = messageBuilder.buildMessage(value, conversationId);
      addMessage(message);
      sendMessage(message);
    },
    [addMessage, sendMessage],
  );

  const handleSubmitClick = useCallback(
    async (value: string) => {
      let newConversation: Conversation | null = null;
      if (isConversationEmpty) {
        newConversation = _createAndSetConversation();
      }
      const conversationToUse = conversationId ?? newConversation?.id;
      if (!conversationToUse) throw new Error('No conversation to use');
      _createAndSendMessage(value, conversationToUse);
    },
    [isConversationEmpty, conversationId, _createAndSetConversation, _createAndSendMessage],
  );

  return <InputBox onSubmitClick={handleSubmitClick} isLoading={isLoading} />;
};
