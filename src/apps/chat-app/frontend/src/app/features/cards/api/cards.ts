import { GetCardsResponse, PostCardsRequest, PostCardsResponse } from 'dtos-lib/chatapp/cards';
import QueryString from 'qs';
import { httpClient } from 'app/config/axios';
import { API_PATHS } from '@chat-app/constants/api';

const CARDS_SERVICE = `${import.meta.env.VITE_API_GATEWAY_URL}${API_PATHS.cards}`;
//NOTE: add our http client here with interceptor or whatever we need
export const postCards = (body: PostCardsRequest) => httpClient.post<PostCardsResponse>(`${CARDS_SERVICE}`, body);

export const getCards = queryParams =>
  httpClient.get<GetCardsResponse>(`${CARDS_SERVICE}`, {
    ...queryParams,
    //NOTE: we need to serialize the query params to be able to send them to AWS API GATEWAY
    paramsSerializer: params => {
      return QueryString.stringify(params);
    },
  });
