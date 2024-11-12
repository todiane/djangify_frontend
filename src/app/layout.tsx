// src/app/layout.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error';
import Providers from '@/providers/providers';
import { Poppins } from 'next/font/google';
import { Metadata } from 'next';
import Loading from './loading';
import './globals.css';

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
        <ErrorBoundary>
          <Providers>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
