// src/types/image.ts
export interface ImageDimensions {
  width: number;
  height: number;
  quality: number;
}

// src/types/image.ts
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

