// src/lib/utils/image.ts
import type { ImageProps } from 'next/image';
import { imageConfig, fallbackImages } from '@/config/images';

export type ImageType = 'blog' | 'portfolio' | 'gallery';

interface ImageLoadParams {
  src: string | null | undefined;
  type: ImageType;
  alt: string;
}

export const getImageUrl = (imageUrl: string | null | undefined, type: ImageType = 'blog'): string => {
  if (!imageUrl) {
    return fallbackImages[type];
  }

  const baseUrl = process.env.NODE_ENV === 'development'
    ? `http://${process.env.NEXT_PUBLIC_BACKEND_HOST || 'localhost'}:${process.env.NEXT_PUBLIC_BACKEND_PORT || '8000'}`
    : process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    new URL(imageUrl);
    return imageUrl;
  } catch {
    if (imageUrl.startsWith('/media')) {
      return `${baseUrl}${imageUrl}`;
    }
    return `${baseUrl}/media/${imageUrl}`;
  }
};

export const getImageProps = (type: ImageType): Partial<ImageProps> => {
  let config = imageConfig.blog;

  switch (type) {
    case 'blog':
      config = imageConfig.blog;
      break;
    case 'portfolio':
      config = imageConfig.portfolio.featured;
      break;
    case 'gallery':
      config = imageConfig.portfolio.gallery;
      break;
  }

  return {
    width: config.width,
    height: config.height,
    sizes: `(max-width: 768px) 100vw, 
            (max-width: 1200px) 50vw, 
            ${config.width}px`,
    quality: config.quality,
    loading: 'lazy' as const,
  };
};

export const useOptimizedImage = ({ src, type, alt }: ImageLoadParams): Partial<ImageProps> => {
  const imageUrl = getImageUrl(src, type);
  const imageProps = getImageProps(type);

  return {
    ...imageProps,
    src: imageUrl,
    alt,
    placeholder: 'blur' as const,
    blurDataURL: fallbackImages[type],
  };
};
