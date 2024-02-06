import axios from 'axios';
import { useQuery } from 'react-query';
import { formatDateToyyyyMMDD } from '../../../utils/time';
import { Message } from '../types/message';

const useMessagesQuery = (conversationId?: string, startDate?: Date, endDate?: Date) => {
  const formattedStartDate = startDate ? formatDateToyyyyMMDD(startDate) : undefined;
  const formattedEndDate = endDate ? formatDateToyyyyMMDD(endDate) : undefined;

  return useQuery<Message[]>(['messages', conversationId, formattedStartDate, formattedEndDate], async () => {
    if (!conversationId) {
      return;
    }
    //TODO: poner la url correcta y a lo mejor pillarla de otro lado
    const { data } = await axios.get(`/api/messages/${conversationId}`, {
      params: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    });
    return data;
  });
};

export default useMessagesQuery;
