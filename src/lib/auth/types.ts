// src/lib/auth/types.ts
export interface AuthSession {
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id: string;
    email: string;
  };
}

export interface TokenResponse {
  access: string;
  refresh: string;
}
