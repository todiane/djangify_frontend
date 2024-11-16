// src/components/common/OptimizedImage.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useOptimizedImage, ImageType } from '@/lib/utils/image';

interface OptimizedImageProps {
  src: string | null | undefined;
  alt: string;
  type: ImageType;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
  fill?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  type,
  className = '',
  priority = false,
  onClick,
  fill = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const imageProps = useOptimizedImage({ src, type, alt });

  // Ensure we have a valid src
  if (!imageProps.src) {
    return null;
  }

  return (
    <div className={`relative ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}>
      <Image
        {...imageProps}
        fill={fill}
        alt={alt}
        src={imageProps.src as string}
        className={`duration-700 ease-in-out ${isLoading
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
          } ${className}`}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        onLoadingComplete={() => setIsLoading(false)}
        onClick={onClick}
      />
    </div>
  );
}
