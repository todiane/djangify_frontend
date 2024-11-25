// src/types/portfolio.ts

// Base Technology type
export interface Technology {
  id: number;
  name: string;
  slug: string;
  icon: string;
  created_at?: string;
  updated_at?: string;
}

// Base Project type (formerly Portfolio)
export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  featured_image: string | null;
  display_image?: string | null; // Add this field
  technologies: Technology[];
  project_url?: string;
  github_url?: string;
  is_featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  images?: PortfolioImage[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  status?: 'draft' | 'published';
  views_count?: number;
  likes_count?: number;
}


// For backwards compatibility and existing components
export type Portfolio = Project;

// Utility type for portfolio images
export interface PortfolioImage {
  id: number;
  image: string | null;
  display_image?: string | null; // Add this field
  image_url?: string | null;
  caption: string;
  order: number;
  created_at: string;
  updated_at: string;
}


// API Response types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  page_size?: number;
  current_page?: number;
  total_pages?: number;
}

// Filter type for queries
export interface PortfolioFilter {
  technology?: string;
  search?: string;
  is_featured?: boolean;
  ordering?: string;
}

// Extended types
export interface TechnologyWithProjects extends Technology {
  projects_count: number;
  projects?: Project[];
}

// Utility types for CRUD operations
export type CreateProjectData = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type UpdateProjectData = Partial<CreateProjectData>;

// Card specific type for the PortfolioCard component
export interface PortfolioCardData {
  id: number;
  title: string;
  short_description: string;
  slug: string;
  featured_image: string | null;
  technologies: Technology[];
  github_url?: string;
  project_url?: string;
}
