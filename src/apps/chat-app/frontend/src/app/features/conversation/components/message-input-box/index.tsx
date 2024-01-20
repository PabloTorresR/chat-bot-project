import useSendMessage from '../../hooks/useSendMessage';
import InputBox from '../../../../components/input-box';

const API_URL = import.meta.env.VITE_API_URL;
export const MessageInputBox = () => {
  const { sendMessage, isLoading } = useSendMessage(API_URL);
  console.log(API_URL);
  const handleSubmitClick = async (value: string) => sendMessage(value);
  return <InputBox onSubmitClick={handleSubmitClick} isLoading={isLoading} />;
};
