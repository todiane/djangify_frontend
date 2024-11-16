// src/lib/api/base.ts
import axios from 'axios';
import { auth } from '../auth';
import { authApi } from './auth';

// Helper to get the base URL based on environment
const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.NEXT_PUBLIC_DJANGO_URL || 'http://localhost:8000';
  }
  // Client-side
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  // Production - use the same domain
  return '';
};

export const api = axios.create({
  baseURL: `${getBaseUrl()}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // Important for handling cookies if needed
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const token = auth.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = auth.getRefreshToken();

      if (refreshToken) {
        try {
          const { access } = await authApi.refreshToken(refreshToken as string);
          auth.setTokens(access, refreshToken as string);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          auth.clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    // Log errors appropriately
    if (error.response) {
      console.error(`API Error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
