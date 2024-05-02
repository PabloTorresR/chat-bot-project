import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { formatDateToyyyyMMDD } from '../../../utils/time';
import { Message } from '../types/message';
import { API_PATHS } from '../constants/api';
import { FilterType } from '../types/query';
import { GET_MESSAGES_QUERY_PARAMS } from '../enums/query-params';

type GetMessagesQueryParams = { [key in GET_MESSAGES_QUERY_PARAMS]: string | null };

const useMessagesQuery = (queryParams: GetMessagesQueryParams, startDate?: Date, endDate?: Date) => {
  const formattedStartDate = startDate ? formatDateToyyyyMMDD(startDate) : undefined;
  const formattedEndDate = endDate ? formatDateToyyyyMMDD(endDate) : undefined;
  const queryKey = Object.keys(queryParams).map(key => queryParams[key]);

  return useQuery<Message[]>({
    queryKey: ['messages', ...queryKey],
    queryFn: async () => {
      if (!queryParams.conversationId || !queryParams.userId) {
        return [];
      }
      const filters: FilterType[] = buildFilters(
        queryParams.conversationId,
        queryParams.userId,
        formattedStartDate,
        formattedEndDate,
      );
      const { data } = await axios.get(`${import.meta.env.VITE_API_GATEWAY_URL}${API_PATHS.messages}`, {
        params: {
          filters,
        },
      });
      return data ?? [];
    },
  });
};

const buildFilters = (
  conversationId: string,
  userId: string,
  formattedStartDate?: string,
  formattedEndDate?: string,
) => {
  const filters: FilterType[] = [
    { value: conversationId, operator: '=', field: 'conversationId' },
    { value: userId, operator: '=', field: 'userId' },
  ];
  if (formattedStartDate) {
    filters.push({ value: formattedStartDate, operator: '>=', field: 'createdAt' });
  }
  if (formattedEndDate) {
    filters.push({ value: formattedEndDate, operator: '<=', field: 'createdAt' });
  }

  return filters;
};

export default useMessagesQuery;
