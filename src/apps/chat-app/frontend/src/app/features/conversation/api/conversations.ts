import axios from 'axios';
import { API_PATHS } from '../constants/api';
import {
  GetConversationsResponse,
  PostConversationsRequest,
  PostConversationsResponse,
} from 'dtos-lib/chatapp/conversations';
import QueryString from 'qs';

const CONVERSATIONS_SERVICE = `${import.meta.env.VITE_API_GATEWAY_URL}${API_PATHS.conversations}`;
//NOTE: add our http client here with interceptor or whatever we need
export const postConversations = (body: PostConversationsRequest) =>
  axios.post<PostConversationsResponse>(`${CONVERSATIONS_SERVICE}`, body);

export const getConversations = queryParams =>
  axios.get<GetConversationsResponse>(`${CONVERSATIONS_SERVICE}`, {
    ...queryParams,
    //NOTE: we need to serialize the query params to be able to send them to AWS API GATEWAY
    paramsSerializer: params => {
      return QueryString.stringify(params);
    },
  });
