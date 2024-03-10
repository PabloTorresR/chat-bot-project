import { useState } from 'react';
import { postMessages } from '../api/messages';
import { PostMessageDto } from '../types/dto';

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (body: PostMessageDto) => {
    setIsLoading(true);
    setError(null);

    try {
      await postMessages(body);
    } catch (error) {
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};

export default useSendMessage;
