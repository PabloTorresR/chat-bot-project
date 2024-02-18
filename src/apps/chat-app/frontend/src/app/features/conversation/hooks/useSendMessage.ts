import { useMemo, useState } from 'react';
import SendMessageService from '../services/send-message';
import { Message } from '../types/message';
import useConversationStore from '../stores/conversation';

//TODO: pensar si esto va a socketio o si lo metemos en useMessages
const useSendMessage = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sendMessageService = useMemo(() => {
    return new SendMessageService(url);
  }, [url]);

  const sendMessage = async (message: Message) => {
    setIsLoading(true);
    setError(null);

    try {
      await sendMessageService.sendMessage(message);
    } catch (error) {
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};

export default useSendMessage;
