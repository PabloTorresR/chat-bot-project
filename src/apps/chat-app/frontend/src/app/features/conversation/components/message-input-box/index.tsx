import useSendMessage from '../../hooks/useSendMessage';
import InputBox from '../../../../components/input-box';

export const MessageInputBox = () => {
  const API_URL = `${import.meta.env.VITE_API_URL_PROD}/message`;
  console.log('url', import.meta.env.VITE_API_URL_PROD);
  console.log(API_URL);
  const { sendMessage, isLoading } = useSendMessage(API_URL);
  const handleSubmitClick = async (value: string) => sendMessage(value);

  return <InputBox onSubmitClick={handleSubmitClick} isLoading={isLoading} />;
};
