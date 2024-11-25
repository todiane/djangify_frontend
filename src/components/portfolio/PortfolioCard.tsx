// src/components/portfolio/PortfolioCard.tsx
import Link from 'next/link';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import {
  ArrowRight, Github, ExternalLink, Globe
} from 'lucide-react';
import type { Project } from '@/types/portfolio';

type PortfolioCardProps = Pick<Project,
  'title' |
  'short_description' |
  'slug' |
  'featured_image' |
  'technologies' |
  'github_url' |
  'external_url' |
  'live_site_url'
>;

export function PortfolioCard({
  title,
  short_description,
  slug,
  featured_image,
  technologies,
  github_url,
  external_url,
  live_site_url
}: PortfolioCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="relative aspect-video">
        <OptimizedImage
          src={featured_image}
          alt={title}
          type="portfolio"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {technologies.slice(0, 3).map((tech) => (
            <span
              key={tech.id}
              className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700"
            >
              {tech.name}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {short_description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Link
            href={`/portfolio/${slug}`}
            className="flex-1 text-blue-600 hover:text-blue-700 py-2 px-4 rounded-md transition-colors border border-blue-600 hover:bg-blue-50 flex items-center justify-center"
          >
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          {github_url && (
            <a
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
              aria-label="View source code on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {external_url && (
            <a
              href={external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
              aria-label="View demo project"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {live_site_url && (
            <a
              href={live_site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
              aria-label="Visit live site"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
