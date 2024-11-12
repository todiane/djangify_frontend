// src/types/next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      // Add other user properties you need
    } & DefaultSession['user'];
  }
}

declare module '@/providers/theme-provider' {
  export const ThemeProvider: React.FC<{ children: React.ReactNode }>;
  export const useTheme: () => ThemeContextType;
}