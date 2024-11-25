// src/types/image.ts
import type { ImageProps } from 'next/image';

export interface ImageDimensions {
  width: number;
  height: number;
  quality: number;
}

export interface ImageConfig {
  portfolio: {
    featured: ImageDimensions;
    gallery: ImageDimensions;
  };
}

export type ImageType = 'portfolio' | 'gallery';

export interface OptimizedImageProps extends Partial<Omit<ImageProps, 'src' | 'alt'>> {
  src: string | null | undefined;
  alt: string;
  type?: ImageType;
  className?: string;
  priority?: boolean;
}