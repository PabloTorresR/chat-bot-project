import useSendMessage from '../../hooks/useSendMessage';
import InputBox from '../../../../components/input-box';
import useConversationStore from '../../stores/conversation';
import { MessageBuilder } from '../../services/message-builder';

export const MessageInputBox = () => {
  const API_URL = `${import.meta.env.VITE_API_URL_PROD}/message`;
  const addMessageToStore = useConversationStore(state => state.addMessage);
  const { sendMessage, isLoading } = useSendMessage(API_URL);

  const handleSubmitClick = async (value: string) => {
    const message = new MessageBuilder().buildMessage(value);
    addMessageToStore(message);
    sendMessage(message);
  };

  return <InputBox onSubmitClick={handleSubmitClick} isLoading={isLoading} />;
};
