// src/components/portfolio/PortfolioLightbox.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { OptimizedImage } from '@/components/common/OptimizedImage';

interface ProjectImage {
  id: number;
  image: string;
  caption: string;
}

interface PortfolioLightboxProps {
  images: ProjectImage[];
  initialIndex?: number;
  onClose: () => void;
  isOpen: boolean;
}

export function PortfolioLightbox({
  images,
  initialIndex = 0,
  onClose,
  isOpen
}: PortfolioLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrevious]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="relative w-full h-[90vh] max-w-[90vw]">
        <button
          className="absolute top-2 right-2 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-50"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>

        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-50"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-50"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        <div className="relative w-full h-full flex items-center justify-center">
          <OptimizedImage
            src={images[currentIndex].image}
            alt={images[currentIndex].caption}
            type="gallery"
            className="object-contain"
            priority
          />
        </div>

        {images[currentIndex].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
            <p className="text-center">{images[currentIndex].caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
