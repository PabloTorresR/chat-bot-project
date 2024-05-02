import { useQuery } from '@tanstack/react-query';
import { Conversation } from '../types/conversation';
import { GET_CONVERSATIONS_QUERY_PARAMS } from '../enums/query-params';
import { getConversations } from '../api/conversations';

type GetConversationsQueryParams = { [key in GET_CONVERSATIONS_QUERY_PARAMS]: string | null };

const useConversationsQuery = (queryParams: GetConversationsQueryParams) => {
  const queryKey = Object.keys(queryParams).map(key => queryParams[key]);
  return useQuery<Conversation[]>({
    queryKey: ['conversations', ...queryKey],
    queryFn: async () => {
      if (!queryParams.userId) {
        return [];
      }
      const { data } = await getConversations();
      return data;
    },
  });
};
export default useConversationsQuery;
