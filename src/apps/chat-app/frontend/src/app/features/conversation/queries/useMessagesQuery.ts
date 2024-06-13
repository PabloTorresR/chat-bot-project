import { useQuery } from '@tanstack/react-query';
import { formatDateToyyyyMMDD } from '../../../utils/time';
import { Message } from '../types/message';
import { FilterType } from 'dtos-lib/chatapp/filters';
import { GET_MESSAGES_QUERY_PARAMS } from '../enums/query-params';
import { getMessages } from '../api/messages';

interface Props {
  queryParams: { [key in GET_MESSAGES_QUERY_PARAMS]: string | null };
  startDate?: Date;
  endDate?: Date;
}

const useMessagesQuery = ({ queryParams, startDate, endDate }: Props) => {
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
      const { data } = await getMessages({
        params: {
          filters,
        },
      });
      return orderByDate(data as Message[]) ?? [];
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

const orderByDate = (messages: Message[]) => {
  return messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export default useMessagesQuery;
