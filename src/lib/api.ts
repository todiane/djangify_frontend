// src/lib/api.ts
import axios from 'axios';
import type { Project, PaginatedResponse } from '@/types/portfolio';

export const api = axios.create({
  baseURL: '/api/',
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

// src/lib/api.ts
export const portfolioApi = {
  // Change back to getProjects to match the type declaration
  getProjects: () =>
    api.get<PaginatedResponse<Project>>('/v1/portfolio/projects/'),

  // Add getTechnologies back
  getTechnologies: () =>
    api.get<PaginatedResponse<Project>>('/v1/portfolio/technologies/'),

  getProject: (slug: string) =>
    api.get<Project>(`/v1/portfolio/projects/${slug}/`),

  getBlogPosts: () =>
    api.get('/v1/blog/posts/'),
};
