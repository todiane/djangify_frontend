// src/lib/api/portfolio.ts
import { api } from './base';
import { Project, Technology, CreateProjectData, UpdateProjectData } from '@/types/portfolio';
import { PaginatedResponse } from '@/types/api';

export const portfolioApi = {
  // Read-only methods
  getProjects: () =>
    api.get<PaginatedResponse<Project>>('/v1/portfolio/projects/'),

  getProjectBySlug: (slug: string) =>
    api.get<Project>(`/v1/portfolio/projects/${slug}/`),

  getTechnologies: () =>
    api.get<PaginatedResponse<Technology>>('/v1/portfolio/technologies/'),

  // Admin methods
  createProject: (data: CreateProjectData) =>
    api.post<Project>('/v1/portfolio/projects/', data),

  updateProject: (slug: string, data: UpdateProjectData) =>
    api.put<Project>(`/v1/portfolio/projects/${slug}/`, data),

  deleteProject: (slug: string) =>
    api.delete(`/v1/portfolio/projects/${slug}/`),

  toggleProjectFeatured: (slug: string) =>
    api.post<Project>(`/v1/portfolio/projects/${slug}/toggle_featured/`),
};
