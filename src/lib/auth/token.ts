// src/lib/auth/token.ts
import { api } from '../api';

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post('/auth/refresh/', { refresh: refreshToken });
    return response.data;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};
