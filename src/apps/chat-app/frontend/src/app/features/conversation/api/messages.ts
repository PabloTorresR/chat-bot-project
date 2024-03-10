import axios from 'axios';
import { API_PATHS } from '../constants/api';
import { PostMessageDto } from '../types/dto';

const MESSAGES_SERVICE = `${import.meta.env.VITE_API_URL_PROD}${API_PATHS.messages}`;

//NOTE: add our http client here with interceptor or whatever we need
export const postMessages = (body: PostMessageDto) => axios.post(`${MESSAGES_SERVICE}`, body);

export const getMessages = () => axios.get(`${MESSAGES_SERVICE}`);
