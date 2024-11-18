// src/lib/metadata.ts
import { Metadata } from 'next';
import { Project } from '@/types/portfolio';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  path?: string;
}

export function generateMetadata({
  title,
  description,
  image = '/og-image.png',
  type = 'website',
  path = '/'
}: SeoProps): Metadata {
  const url = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const fullUrl = `${url}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${url}${image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Djangify',
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export function generatePortfolioJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.short_description,
    image: project.featured_image,
    datePublished: project.created_at,
    dateModified: project.updated_at,
    creator: {
      '@type': 'Organization',
      name: 'Djangify',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_APP_URL}/portfolio/${project.slug}`,
    },
  };
}