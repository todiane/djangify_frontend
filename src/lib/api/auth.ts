// src/lib/api/auth.ts
import { api } from './base';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
}

interface User {
  id: number;
  email: string;
  username: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>('auth/token/', credentials);
    return response.data;
  },

  refreshToken: async (refresh: string) => {
    const response = await api.post<AuthResponse>('auth/token/refresh/', { refresh });
    return response.data;
  },

  logout: async (refresh: string) => {
    await api.post('auth/token/blacklist/', { refresh });
  },

  getUser: async () => {
    const response = await api.get<User>('auth/user/');
    return response.data;
  }
};

// src/lib/auth.ts
import { jwtDecode } from 'jwt-decode';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const TOKEN_KEY = 'jwt_token';
const REFRESH_KEY = 'jwt_refresh';

interface DecodedToken {
  exp: number;
  user_id: string;
}

export const auth = {
  setTokens: (access: string, refresh: string) => {
    setCookie(TOKEN_KEY, access);
    setCookie(REFRESH_KEY, refresh);
  },

  getAccessToken: () => getCookie(TOKEN_KEY),
  getRefreshToken: () => getCookie(REFRESH_KEY),

  clearTokens: () => {
    deleteCookie(TOKEN_KEY);
    deleteCookie(REFRESH_KEY);
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },

  isAuthenticated: (): boolean => {
    const token = getCookie(TOKEN_KEY);
    return !!token && !auth.isTokenExpired(token as string);
  }
};
