// src/lib/auth/session.ts
import { getSession as getNextAuthSession } from 'next-auth/react';
import type { AuthSession } from './types';

export const getSession = async (): Promise<AuthSession | null> => {
  const session = await getNextAuthSession();
  return session as AuthSession | null;
};