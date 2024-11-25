import type { ImageProps } from 'next/image';
import { imageConfig, fallbackImages } from '@/config/images';

export type ImageType = 'portfolio' | 'gallery';

interface ImageLoadParams {
  src: string | null | undefined;
  type: ImageType;
  alt: string;
}

export const getImageUrl = (imageUrl: string | null | undefined, type: ImageType = 'portfolio'): string => {
  if (!imageUrl) {
    return fallbackImages[type];
  }

  // Full URLs can be returned directly
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // Default to Cloudinary base URL for paths
  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dtjypy9b9/image/upload/';
  return `${CLOUDINARY_BASE_URL}${imageUrl}`;
};

export const getImageProps = (type: ImageType): Partial<ImageProps> => {
  const config = type === 'portfolio'
    ? imageConfig.portfolio.featured
    : imageConfig.portfolio.gallery;

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
