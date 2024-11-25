// src/components/portfolio/PortfolioList.tsx
import { PortfolioCard } from './PortfolioCard';
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
          featured_image={portfolio.featured_image}
          technologies={portfolio.technologies}
          github_url={portfolio.github_url}
          external_url={portfolio.external_url}
          live_site_url={portfolio.live_site_url}
        />
      ))}
    </div>
  );
}
