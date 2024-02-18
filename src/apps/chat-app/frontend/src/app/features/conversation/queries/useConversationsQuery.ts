import { useQuery } from 'react-query';
import { Conversation } from '../types/conversation';
import { getConversations } from '../api/conversations';

const useConversationsQuery = () =>
  useQuery<Conversation[]>(['conversations'], async () => {
    const { data } = await getConversations();
    return data;
  });
export default useConversationsQuery;
