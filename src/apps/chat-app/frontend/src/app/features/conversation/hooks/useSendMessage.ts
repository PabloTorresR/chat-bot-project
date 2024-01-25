import { useMemo, useState } from 'react';
import SendMessageService from '../services/send-message';

const useSendMessage = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => {
    return new SendMessageService(url);
  }, [url]);

  const sendMessage = async (message: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await service.sendMessage(message);
    } catch (error) {
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};

export default useSendMessage;
