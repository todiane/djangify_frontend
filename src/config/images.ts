// src/config/images.ts
import { ImageConfig } from '@/types/image';

export const imageConfig: ImageConfig = {
  blog: {
    width: 800,
    height: 800,
    quality: 85
  },
  portfolio: {
    featured: {
      width: 1200,
      height: 800,
      quality: 85
    },
    gallery: {
      width: 1200,
      height: 800,
      quality: 85
    }
  }
} as const;

export const fallbackImages = {
  blog: '/images/fallback-blog.svg',
  portfolio: '/images/fallback-portfolio.svg',
  gallery: '/images/fallback-gallery.svg'
} as const;
