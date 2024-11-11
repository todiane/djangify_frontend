// src/lib/api/portfolio.ts
import { api } from './base';

export const portfolioApi = {
  getProjects: () => api.get('/v1/portfolio/projects/'),
  getProject: (slug: string) => api.get(`/v1/portfolio/projects/${slug}/`),
};
