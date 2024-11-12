// src/components/portfolio/PortfolioGallery.tsx
import React, { useState } from 'react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface GalleryImage {
  url: string;
  caption?: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
}

const ProjectGallery = ({ images = [] }: ProjectGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="aspect-square rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
          No images available
        </div>
      </div>
    );
  }

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    setLightboxOpen(true);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="space-y-4">
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <OptimizedImage
              src={image.url}
              alt={image.caption || `Project image ${index + 1}`}
              type="gallery"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white" />
            </div>
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}>
          <div className="relative w-full h-full flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-50"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="absolute right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Main image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <OptimizedImage
                src={selectedImage.url}
                alt={selectedImage.caption || 'Project image'}
                type="gallery"
                className="object-contain"
                priority
              />
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 text-white text-center">
                  {selectedImage.caption}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
