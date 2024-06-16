import axios from 'axios';
import { API_PATHS } from '../constants/api';
import { PostMessagesResponse, PostMessagesRequest, GetMessagesResponse } from 'dtos-lib/chatapp/messages';
import QueryString from 'qs';

const MESSAGES_SERVICE = `${import.meta.env.VITE_API_GATEWAY_URL}${API_PATHS.messages}`;

//NOTE: add our http client here with interceptor or whatever we need
export const postMessages = (body: PostMessagesRequest) =>
  axios.post<PostMessagesResponse>(`${MESSAGES_SERVICE}`, body);

export const getMessages = queryParams =>
  axios.get<GetMessagesResponse>(`${MESSAGES_SERVICE}`, {
    ...queryParams,
    paramsSerializer: params => {
      return QueryString.stringify(params);
    },
  });
