'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import type { Project, Technology } from '@/types/portfolio';
import { getImageUrl } from '@/lib/utils/image';

interface PortfolioGridProps {
  initialItems: Project[];
  technologies: Technology[];
}

export function PortfolioGrid({ initialItems, technologies }: PortfolioGridProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [items] = useState(initialItems);

  const filteredItems = selectedTech
    ? items.filter(item =>
      item.technologies?.some(tech => tech.slug === selectedTech)
    )
    : items;

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No projects available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedTech(null)}
            className={`px-4 py-2 rounded-full transition-colors ${selectedTech === null
              ? 'bg-[#0C8C9D] text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
          >
            All Projects
          </button>
          {technologies.map((tech) => (
            <button
              key={tech.slug}
              onClick={() => setSelectedTech(tech.slug)}
              className={`px-4 py-2 rounded-full transition-colors ${selectedTech === tech.slug
                ? 'bg-[#0C8C9D] text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {tech.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-video relative">
              <Image
                src={getImageUrl(item.display_image || item.featured_image, 'portfolio')}
                alt={item.title || 'Project thumbnail'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="hover:text-[#0C8C9D] transition-colors"
                >
                  {item.title || 'Untitled Project'}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {item.short_description || item.description || 'No description available'}
              </p>
              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies.map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setSelectedTech(tech.slug)}
                      className="px-2 py-1 text-xs bg-[#0C8C9D]/10 text-[#0C8C9D] rounded hover:bg-[#0C8C9D]/20 transition-colors"
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-3">
                {item.github_url && (
                  <a
                    href={item.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                )}
                {item.external_url && (
                  <a
                    href={item.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    For Sale
                  </a>
                )}
                {item.live_site_url && (
                  <a
                    href={item.live_site_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-md bg-[#0C8C9D] text-white hover:bg-[#0C8C9D]/90 transition-colors duration-200"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
