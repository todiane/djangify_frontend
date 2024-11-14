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
