// src/app/layout.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error';
import Providers from '@/providers/providers';
import { AuthProvider } from '@/contexts/AuthContext';
import { Poppins } from 'next/font/google';
import { Metadata } from 'next';
import Loading from './loading';
import './globals.css';
import QueryProvider from '@/providers/query-provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  // ... your existing metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <QueryProvider>
          <ErrorBoundary>
            <Providers>
              <AuthProvider>
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </AuthProvider>
            </Providers>
          </ErrorBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
