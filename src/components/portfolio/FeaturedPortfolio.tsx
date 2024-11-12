// src/components/portfolio/FeaturedPortfolio.tsx
import Link from 'next/link';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { ArrowRight } from 'lucide-react';

interface FeaturedPortfolioProps {
  title: string;
  shortDescription: string;
  slug: string;
  featuredImage: string;
  technologies: Array<{
    id: number;
    name: string;
  }>;
}

export function FeaturedPortfolio({
  title,
  shortDescription,
  slug,
  featuredImage,
  technologies,
}: FeaturedPortfolioProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="relative aspect-video">
        <OptimizedImage
          src={featuredImage}
          alt={title}
          type="portfolio"
          className="object-cover"
          priority
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {technologies.map((tech) => (
            <span
              key={tech.id}
              className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
            >
              {tech.name}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 line-clamp-2">{shortDescription}</p>
        <Link
          href={`/portfolio/${slug}`}
          className="mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
        >
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
