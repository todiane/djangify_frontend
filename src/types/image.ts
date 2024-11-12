// src/types/image.ts
export interface ImageDimensions {
  width: number;
  height: number;
  quality: number;
}

export interface ImageConfig {
  blog: ImageDimensions;
  portfolio: {
    featured: ImageDimensions;
    gallery: ImageDimensions;
  };
}

