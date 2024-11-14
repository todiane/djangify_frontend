'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { authApi } from '@/lib/api/auth';

interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (auth.isAuthenticated()) {
        try {
          const userData = await authApi.getUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch {
          auth.clearTokens();
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { access, refresh } = await authApi.login({ email, password });
    auth.setTokens(access, refresh);
    const userData = await authApi.getUser();
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    const refresh = auth.getRefreshToken();
    if (refresh) {
      await authApi.logout(refresh as string);
    }
    auth.clearTokens();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
