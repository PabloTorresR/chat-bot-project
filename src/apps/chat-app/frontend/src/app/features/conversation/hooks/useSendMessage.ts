import { useState } from 'react';
import { postMessages } from '../api/messages';
import { Message } from '../types/message';
import { PostMessagesRequest } from 'libs/dtos/chatapp/messages';
import { MessageSender } from '../enums/message-sender';

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (body: PostMessagesRequest, callback: (response: Message) => void) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await postMessages(body);
      callback({ ...response.data, sender: response.data.sender as MessageSender });
    } catch (error) {
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};

export default useSendMessage;
