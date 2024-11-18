// src/config/images.ts
import { ImageConfig } from '@/types/image';

export const imageConfig: ImageConfig = {
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
  portfolio: '/images/fallback-portfolio.svg',
  gallery: '/images/fallback-gallery.svg'
} as const;
