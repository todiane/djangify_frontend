'use client';

// src/components/portfolio/PortfolioGrid.tsx
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import type { Project, Technology } from '@/types/portfolio';

interface PortfolioGridProps {
  initialItems: Project[];
  technologies: Technology[];
}

export function PortfolioGrid({ initialItems, technologies }: PortfolioGridProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [items] = useState(initialItems);

  const filteredItems = selectedTech
    ? items.filter(item =>
      item.technologies.some(tech => tech.slug === selectedTech)
    )
    : items;

  return (
    <div className="space-y-8">
      {/* Technology Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedTech(null)}
          className={`px-4 py-2 rounded-full transition-colors ${selectedTech === null
            ? 'bg-blue-600 text-white'
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
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
          >
            {tech.name}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="group bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={item.featured_image || '/images/fallback-portfolio.svg'}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {item.short_description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.technologies.map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => setSelectedTech(tech.slug)}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                  >
                    {tech.name}
                  </button>
                ))}
              </div>
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
                {item.project_url && (
                  <a
                    href={item.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
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
