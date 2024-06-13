import { useQuery } from '@tanstack/react-query';
import { Conversation } from '../types/conversation';
import { GET_CONVERSATIONS_QUERY_PARAMS } from '../enums/query-params';
import { getConversations } from '../api/conversations';
import { FilterType } from 'dtos-lib/chatapp/filters';
interface Props {
  queryParams: { [key in GET_CONVERSATIONS_QUERY_PARAMS]: string | null };
}

const useConversationsQuery = ({ queryParams }: Props) => {
  const queryKey = Object.keys(queryParams).map(key => queryParams[key]);
  return useQuery<Conversation[]>({
    queryKey: ['conversations', ...queryKey],
    queryFn: async () => {
      if (!queryParams.userId) {
        return [];
      }
      const filters: FilterType[] = buildFilters(queryParams.userId);
      const { data } = await getConversations({ params: { filters } });
      return data;
    },
  });
};

const buildFilters = (userId: string) => {
  const filters: FilterType[] = [{ value: userId, operator: '=', field: 'userId' }];

  return filters;
};

export default useConversationsQuery;
