import axios from 'axios';
import { useQuery } from 'react-query';
import { Conversation } from '../types/conversation';
import { API_PATHS } from '../constants/api';

const useConversationsQuery = () =>
  useQuery<Conversation[]>(['conversations'], async () => {
    //TODO: poner la url correcta y a lo mejor pillarla de otro lado
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL_PROD}${API_PATHS.conversations}`);
    return data;
  });
export default useConversationsQuery;
