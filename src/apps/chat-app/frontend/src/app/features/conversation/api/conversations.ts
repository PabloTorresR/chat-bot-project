import axios from 'axios';
import { API_PATHS } from '../constants/api';
import {
  GetConversationsResponse,
  PostConversationsRequest,
  PostConversationsResponse,
} from 'libs/dtos/chatapp/conversations';

const CONVERSATIONS_SERVICE = `${import.meta.env.VITE_API_URL_PROD}${API_PATHS.conversations}`;

//NOTE: add our http client here with interceptor or whatever we need
export const postConversations = (body: PostConversationsRequest) =>
  axios.post<PostConversationsResponse>(`${CONVERSATIONS_SERVICE}`, body);

export const getConversations = () => axios.get<GetConversationsResponse>(`${CONVERSATIONS_SERVICE}`);
