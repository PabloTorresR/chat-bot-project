import { postMessages } from '../api/messages';
import { Message } from '../types/message';
import { queryClient } from '../../../../config/react-query';
import { useMutation } from '@tanstack/react-query';
import { PostMessagesRequest } from 'dtos-lib/chatapp/messages';
import { GET_MESSAGES_QUERY_PARAMS } from '../../../enums/query-params';

interface Props {
  onMessageSent?: () => void;
  onMessageReceived?: () => void;
  queryParams: { [key in GET_MESSAGES_QUERY_PARAMS]: string | null };
}

interface SendMessageProps extends PostMessagesRequest {}

const useSendMessageMutation = ({ queryParams, onMessageSent, onMessageReceived }: Props) => {
  const queryKey = Object.keys(queryParams).map(key => queryParams[key]);
  const sendMessageMutation = useMutation({
    mutationFn: postMessages,
    onMutate: requestMessage => {
      queryClient.setQueryData(['messages', ...queryKey], (prev: Message[]) => {
        if (!requestMessage) {
          return prev;
        }
        return [...(prev ?? []), requestMessage.message];
      });
    },
    onSuccess: responseMessage =>
      queryClient.setQueryData(['messages', ...queryKey], (prev: Message[]) => {
        return [...(prev ?? []), responseMessage.data];
      }),
  });

  const sendMessage = async (body: SendMessageProps) => {
    try {
      onMessageSent?.();
      await sendMessageMutation.mutateAsync(body);
      onMessageReceived?.();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return { sendMessage, isLoading: sendMessageMutation.isPending, error: sendMessageMutation.error };
};

export default useSendMessageMutation;
