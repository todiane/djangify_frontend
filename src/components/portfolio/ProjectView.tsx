'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { getImageUrl } from '@/lib/utils/image';
import type { Project, PortfolioImage } from '@/types/portfolio';

interface ProjectViewProps {
  project: Project;
}

export function ProjectView({ project }: ProjectViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Pre-process featured image
  const optimizedFeaturedImage = {
    src: getImageUrl(project.display_image || project.featured_image, 'portfolio'),
    alt: project.title,
  };

  // Pre-process gallery images
  const galleryImages: PortfolioImage[] = project.images || [];
  const validGalleryImages = galleryImages.map((img, index) => ({
    ...img,
    src: getImageUrl(img.display_image || img.image || img.image_url, 'gallery'),
    alt: img.caption || `Gallery image ${index + 1}`,
  }));

  // Combine all images
  const allImages = useMemo(() => {
    const featuredImage = {
      id: 0,
      image: project.featured_image,
      caption: project.title,
      type: 'portfolio' as const,
      alt: project.title,
      src: optimizedFeaturedImage.src,
    };

    return [featuredImage, ...validGalleryImages];
  }, [project.featured_image, project.title, validGalleryImages, optimizedFeaturedImage.src]);

  const selectedImage = useMemo(() =>
    selectedImageIndex !== null ? allImages[selectedImageIndex] : null,
    [selectedImageIndex, allImages]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </Link>
        </div>

        {/* Title and Description */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-xl text-gray-600">{project.short_description}</p>
        </div>

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.id}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allImages.map((img, index) => (
            <div
              key={img.id}
              className="relative aspect-video cursor-pointer rounded-lg overflow-hidden"
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={img.src || '/images/fallback-portfolio.svg'}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Project Links */}
        <div className="flex gap-4">
          {project.github_url && project.github_url === 'github' && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub Repo
            </a>
          )}
          {project.external_url && project.external_url === 'marketplace' && (
            <a
              href={project.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              More Info
            </a>
          )}
          {project.live_site_url && (
            <a
              href={project.live_site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-md bg-[#0C8C9D] text-white hover:bg-[#0C8C9D]/90 transition-colors duration-200"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Live Site
            </a>
          )}
        </div>

        {/* Detailed Description */}
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: project.description }} />
        </div>

        {/* Modal/Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.src || '/images/fallback-portfolio.svg'}
                  alt={selectedImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                  {selectedImage.caption}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
