import { useState } from 'react';
import { postMessages } from '../api/messages';
import { HistoryMessage, Message } from '../types/message';
import { MessageSender } from '../enums/message-sender';

interface SendMessageProps {
  body: { message: Message; messageHistory: HistoryMessage[] };
  callback: (response: Message) => void;
}

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async ({ body, callback }: SendMessageProps) => {
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
