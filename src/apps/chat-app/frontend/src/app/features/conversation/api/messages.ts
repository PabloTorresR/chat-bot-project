import { API_PATHS } from '../../../constants/api';
import { PostMessagesResponse, PostMessagesRequest, GetMessagesResponse } from 'dtos-lib/chatapp/messages';
import QueryString from 'qs';
import { httpClient } from 'app/config/axios';

const MESSAGES_SERVICE = `${import.meta.env.VITE_API_GATEWAY_URL}${API_PATHS.messages}`;

//NOTE: add our http client here with interceptor or whatever we need
export const postMessages = (body: PostMessagesRequest) =>
  httpClient.post<PostMessagesResponse>(`${MESSAGES_SERVICE}`, body);

export const getMessages = queryParams =>
  httpClient.get<GetMessagesResponse>(`${MESSAGES_SERVICE}`, {
    ...queryParams,
    //NOTE: we need to serialize the query params to be able to send them to AWS API GATEWAY
    paramsSerializer: params => {
      return QueryString.stringify(params);
    },
  });
