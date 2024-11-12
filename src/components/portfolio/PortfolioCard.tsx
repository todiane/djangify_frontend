// src/components/portfolio/PortfolioCard.tsx
import Link from 'next/link';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { ArrowRight } from 'lucide-react';
import type { PortfolioCardData } from '@/types/portfolio';

type PortfolioCardProps = PortfolioCardData;

export function PortfolioCard({
  title,
  short_description,
  slug,
  featured_image,
  technologies,
}: PortfolioCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="relative aspect-video">
        <OptimizedImage
          src={featured_image}
          alt={title}
          type="portfolio"
          className="object-cover"
          fill
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
        <Link
          href={`/portfolio/${slug}`}
          className="mt-4 block w-full text-blue-600 hover:text-blue-700 py-2 px-4 rounded-md transition-colors border border-blue-600 hover:bg-blue-50 flex items-center justify-center"
        >
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
