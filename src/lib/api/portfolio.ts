// src/lib/api/portfolio.ts
import { api } from './base';
import { Project, Technology, CreateProjectData, UpdateProjectData } from '@/types/portfolio';
import { PaginatedResponse } from '@/types/api';

export const portfolioApi = {
  // Read-only methods
  getProjects: () =>
    api.get<PaginatedResponse<Project>>('portfolio/projects/'),

  getProjectBySlug: (slug: string) =>
    api.get<Project>(`portfolio/projects/${slug}/`),

  getTechnologies: () =>
    api.get<PaginatedResponse<Technology>>('portfolio/technologies/'),

  // Admin methods
  createProject: (data: CreateProjectData) =>
    api.post<Project>('portfolio/projects/', data),

  updateProject: (slug: string, data: UpdateProjectData) =>
    api.put<Project>(`portfolio/projects/${slug}/`, data),

  deleteProject: (slug: string) =>
    api.delete(`portfolio/projects/${slug}/`),

  toggleProjectFeatured: (slug: string) =>
    api.post<Project>(`portfolio/projects/${slug}/toggle_featured/`),
};
