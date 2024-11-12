// src/app/layout.tsx
import { ErrorBoundary } from '@/components/error';
import Providers from '@/providers/providers';
import { Poppins } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Djangify - Django Project Generator',
    template: '%s | Djangify'
  },
  description: 'A powerful Django project structure generator with Next.js frontend',
  keywords: ['Django', 'Next.js', 'Project Generator', 'Web Development', 'Full Stack'],
  authors: [{ name: 'Djangify Team' }],
  creator: 'Djangify',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Djangify - Django Project Generator',
    description: 'A powerful Django project structure generator with Next.js frontend',
    siteName: 'Djangify',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Djangify - Django Project Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Djangify - Django Project Generator',
    description: 'A powerful Django project structure generator with Next.js frontend',
    images: ['/og-image.png'],
    creator: '@djangify'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: '/',
  }
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
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
