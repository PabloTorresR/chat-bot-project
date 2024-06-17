import { Auth } from 'aws-amplify';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type ApiCall<A,R> = (args: A) => Promise<AxiosResponse<R>>;
export const API_GATEWAY = import.meta.env.VITE_API_GATEWAY_URL

const setAuthHeaders = async (config: InternalAxiosRequestConfig) =>{
    const response = await Auth.currentAuthenticatedUser();
    const authTokenV2 = response.getSignInUserSession().getIdToken().getJwtToken();

    if (authTokenV2 && config.headers) {
        config.headers['Authorization'] = authTokenV2;
    }
    return config
}


export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use(setAuthHeaders);
httpClient.interceptors.response.use((response) => response, (error) => Promise.reject(error));