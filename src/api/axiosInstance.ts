import Router from 'next/router';
import Axios, { AxiosRequestConfig } from 'axios';

import { baseUrl, USER_TOKEN, authUrl, ROUTES } from '~/config';

const authRequestInterceptor =
  (isBearer: boolean = true) =>
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    let updatedConfig = { ...config };
    const savedAuthData = window.localStorage.getItem(USER_TOKEN);
    const parsedAuthData = savedAuthData ? JSON.parse(savedAuthData) : null;

    if (!config?.headers) {
      updatedConfig = {
        ...updatedConfig,
        headers: {
          Accept: 'application/json',
        },
      };
    }

    if (parsedAuthData?.tokens?.accessToken?.jwtToken) {
      updatedConfig.headers = {
        ...updatedConfig.headers,
        authorization: `${isBearer ? 'Bearer' : ''} ${
          parsedAuthData?.tokens?.accessToken?.jwtToken
        }`,
      };
    }

    return updatedConfig;
  };

const refreshAccessToken = async () => {
  const savedAuthData = window.localStorage.getItem(USER_TOKEN);
  const parsedAuthData = savedAuthData ? JSON.parse(savedAuthData) : null;
  try {
    const response = await Axios.post(`${baseUrl}${authUrl.REFRESH_TOKENS}`, {
      email: parsedAuthData?.tokens?.accessToken?.payload?.username,
      refreshToken: parsedAuthData?.tokens?.refreshToken?.token,
    });
    return response.data;
  } catch (e) {
    window.localStorage.setItem(USER_TOKEN, '');
    window.location.pathname = ROUTES.LOGIN;
    return e;
  }
};

const authResponseInterceptor =
  () =>
  async (error: {
    config: any;
    response: { status: number; data: any };
  }): Promise<any> => {
    const originalConfig = error.config;
    if (
      error?.response?.status === 401 &&
      !originalConfig.retry &&
      Router.pathname !== '/login'
    ) {
      originalConfig.retry = true;
      const result = await refreshAccessToken();

      if (result?.accessToken) {
        const savedAuthData = window.localStorage.getItem(USER_TOKEN);
        const parsedAuthData = savedAuthData ? JSON.parse(savedAuthData) : null;
        parsedAuthData.tokens = result;
        window.localStorage.setItem(USER_TOKEN, JSON.stringify(parsedAuthData));

        originalConfig.headers = {
          ...originalConfig.headers,
          authorization: `Bearer ${result?.accessToken?.jwtToken}`,
        };

        return axios(originalConfig);
      }
    }

    return Promise.reject(error);
  };

export const axios = Axios.create({
  baseURL: baseUrl,
});

axios.interceptors.request.use(authRequestInterceptor(true));

axios.interceptors.response.use(
  response => response.data,
  authResponseInterceptor()
);
