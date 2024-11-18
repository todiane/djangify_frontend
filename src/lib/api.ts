// src/lib/api.ts
import axios from 'axios';
import type { Project, PaginatedResponse } from '@/types/portfolio';

// src/lib/api/base.ts or src/lib/api.ts
const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.NEXT_PUBLIC_DJANGO_URL || 'http://localhost:8000';
  }
  // Client-side
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  // Production - use relative URL to avoid cross-domain issues
  return '';
};

export const api = axios.create({
  baseURL: `${getBaseUrl()}/api/v1/`,  // Note: changed from '/api/' to '/api/v1/'
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const portfolioApi = {
  getProjects: () =>
    api.get<PaginatedResponse<Project>>('portfolio/projects/'),

  getTechnologies: () =>
    api.get<PaginatedResponse<Project>>('portfolio/technologies/'),

  getProject: (slug: string) =>
    api.get<Project>(`portfolio/projects/${slug}/`),

};
