import { useQuery } from '@tanstack/react-query';
import { Conversation } from '../types/conversation';
import { getConversations } from '../api/conversations';

const useConversationsQuery = () =>
  useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: async () => {
      const { data } = await getConversations();
      return data;
    },
  });
export default useConversationsQuery;
