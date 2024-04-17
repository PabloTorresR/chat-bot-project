import { postMessages } from '../api/messages';
import { HistoryMessage, Message } from '../types/message';
import { queryClient } from '../../../../config/react-query';
import { useMutation } from '@tanstack/react-query';

interface Props {
  conversationId: string;
  onMessageMessageSent?: () => void;
  onMessageMessageReceived?: () => void;
}

interface SendMessageProps {
  message: Message;
  messageHistory: HistoryMessage[];
}

const useSendMessageMutation = ({ conversationId, onMessageMessageSent, onMessageMessageReceived }: Props) => {
  const sendMessageMutation = useMutation({
    mutationFn: postMessages,
    onMutate: requestMessage => {
      queryClient.setQueryData(['messages', conversationId], (prev: Message[]) => {
        if (!requestMessage) {
          return prev;
        }
        return [...(prev ?? []), requestMessage.message];
      });
    },
    onSuccess: responseMessage =>
      queryClient.setQueryData(['messages', conversationId], (prev: Message[]) => {
        return [...(prev ?? []), responseMessage.data];
      }),
  });

  const sendMessage = async (body: SendMessageProps) => {
    try {
      onMessageMessageSent?.();
      await sendMessageMutation.mutateAsync(body);
      onMessageMessageReceived?.();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return { sendMessage, isLoading: sendMessageMutation.isPending, error: sendMessageMutation.error };
};

export default useSendMessageMutation;
