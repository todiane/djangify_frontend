declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_DJANGO_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
