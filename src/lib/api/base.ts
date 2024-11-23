import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const getBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  return process.env.NEXT_PUBLIC_API_URL || '';
};

const axiosRetry = async (error: AxiosError): Promise<AxiosResponse> => {
  const maxRetries = 3;
  let retryCount = 0;
  const config = error.config as ExtendedAxiosRequestConfig;

  const retryCondition = (error: AxiosError) => {
    return error.response?.status === 502 || error.response?.status === 503;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  while (retryCount < maxRetries) {
    try {
      retryCount++;
      await sleep(Math.min(1000 * Math.pow(2, retryCount), 10000));
      return await axios(config);
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (retryCount === maxRetries || !retryCondition(axiosErr)) {
        throw err;
      }
    }
  }
  throw error;
};

export const api = axios.create({
  baseURL: `${getBaseUrl()}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 502 || error.response?.status === 503) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        return await axiosRetry(error);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
