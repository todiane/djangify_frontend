// src/types/portfolio.ts

export interface Technology {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  featured_image: string;
  technologies: Technology[];
  project_url?: string;
  github_url?: string;
  is_featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}
