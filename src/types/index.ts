export interface Project {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string;
  technologies: string[];
  url?: string;
  github_url?: string;
  created_at: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
