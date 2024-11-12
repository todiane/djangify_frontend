// src/components/portfolio/PortfolioFilter.tsx
import { Technology } from '@/types/portfolio';

interface PortfolioFilterProps {
  technologies: Technology[];
  selectedTech: string | null;
  onSelectTech: (slug: string | null) => void;
}

export function PortfolioFilter({
  technologies,
  selectedTech,
  onSelectTech,
}: PortfolioFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        className={`px-4 py-2 rounded-md transition-colors ${selectedTech === null
            ? 'bg-blue-600 text-white'
            : 'border border-gray-300 bg-white hover:bg-gray-50'
          }`}
        onClick={() => onSelectTech(null)}
        aria-label="Show all portfolios"
      >
        All
        {selectedTech === null && (
          <svg
            className="ml-2 h-4 w-4 inline"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
      {technologies.map((tech) => (
        <button
          key={tech.slug}
          className={`px-4 py-2 rounded-md transition-colors ${selectedTech === tech.slug
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 bg-white hover:bg-gray-50'
            }`}
          onClick={() => onSelectTech(tech.slug)}
        >
          {tech.name}
          {selectedTech === tech.slug && (
            <svg
              className="ml-2 h-4 w-4 inline"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}
