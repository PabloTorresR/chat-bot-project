import axios from 'axios';
import { useQuery } from 'react-query';
import { Conversation } from '../types/conversation';

const useConversationsQuery = () =>
  useQuery<Conversation[]>(['conversations'], async () => {
    //TODO: poner la url correcta y a lo mejor pillarla de otro lado
    const { data } = await axios.get(`/api/conversations`);
    return data;
  });
export default useConversationsQuery;
