// src/components/portfolio/PortfolioFilter.tsx
import { PortfolioCard } from './PortfolioCard';
import { getImageUrl } from '@/lib/utils/image';
import type { Project } from '@/types/portfolio';

interface PortfolioListProps {
  portfolios: Project[];
}

export function PortfolioList({ portfolios }: PortfolioListProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          title={portfolio.title}
          short_description={portfolio.short_description}
          slug={portfolio.slug}
          featured_image={getImageUrl(portfolio.display_image || portfolio.featured_image, 'portfolio')}
          technologies={portfolio.technologies}
          github_url={portfolio.github_url}
          project_url={portfolio.project_url}
          live_url={portfolio.live_url}
        />
      ))}
    </div>
  );
}