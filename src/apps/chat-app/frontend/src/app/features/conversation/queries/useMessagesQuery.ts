import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { formatDateToyyyyMMDD } from '../../../utils/time';
import { Message } from '../types/message';
import { API_PATHS } from '../constants/api';
import { FilterType } from '../types/query';

const useMessagesQuery = (conversationId?: string, startDate?: Date, endDate?: Date) => {
  const formattedStartDate = startDate ? formatDateToyyyyMMDD(startDate) : undefined;
  const formattedEndDate = endDate ? formatDateToyyyyMMDD(endDate) : undefined;
  return useQuery<Message[]>({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) {
        return;
      }
      const filters: FilterType[] = buildFilters(conversationId, formattedStartDate, formattedEndDate);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL_PROD}${API_PATHS.messages}`, {
        params: {
          filters,
        },
      });
      return data ?? [];
    },
  });
};

const buildFilters = (conversationId: string, formattedStartDate?: string, formattedEndDate?: string) => {
  const filters: FilterType[] = [{ value: conversationId, operator: '=', field: 'conversationId' }];
  if (formattedStartDate) {
    filters.push({ value: formattedStartDate, operator: '>=', field: 'createdAt' });
  }
  if (formattedEndDate) {
    filters.push({ value: formattedEndDate, operator: '<=', field: 'createdAt' });
  }

  return filters;
};

export default useMessagesQuery;
