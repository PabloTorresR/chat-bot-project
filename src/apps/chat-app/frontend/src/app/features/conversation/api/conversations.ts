import axios from 'axios';
import { API_PATHS } from '../constants/api';

const CONVERSATIONS_SERVICE = `${import.meta.env.VITE_API_URL_PROD}${API_PATHS.conversations}`;

//NOTE: add our http client here with interceptor or whatever we need
export const postConversations = body => axios.post(`${CONVERSATIONS_SERVICE}`, body);

export const getConversations = () => axios.get(`${CONVERSATIONS_SERVICE}`);
