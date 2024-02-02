import axios from 'axios';
import { useQuery } from 'react-query';
import { Message } from '../types/message';
import { formatDateToyyyyMMDD } from '../../../utils/time';

const useMessages = (conversationId: string, startDate?: Date, endDate?: Date) => {
  const formattedStartDate = startDate ? formatDateToyyyyMMDD(startDate) : undefined;
  const formattedEndDate = endDate ? formatDateToyyyyMMDD(endDate) : undefined;

  const { data, isLoading, isError, error } = useQuery(
    ['messages', conversationId, formattedStartDate, formattedEndDate],
    async () => {
      //TODO: poner la url correcta y a lo mejor pillarla de otro lado
      const response = await axios.get(`/api/messages/${conversationId}`, {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      return response.data;
    },
  );

  return {
    messages: data as Message[],
    isLoading,
    isError,
    error,
  };
};

export default useMessages;
