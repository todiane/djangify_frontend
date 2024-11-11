// src/lib/api.ts
import axios from 'axios';
import type { FeaturedPost } from '@/types/blog';

export const api = axios.create({
  baseURL: '/api',  // This will use our Next.js rewrite rule
  headers: {
    'Content-Type': 'application/json',
  },
});

// Basic response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API utility functions
export const apiUtils = {
  getMediaUrl: (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return path.startsWith('/') ? path : `/${path}`;
  },
};

export const portfolioApi = {
  // Get portfolio items
  getProjects: () => api.get('/v1/portfolio/projects/'),

  // Get blog posts
  getBlogPosts: () => api.get('/v1/blog/posts/'),

  // Get single project
  getProject: (slug: string) => api.get(`/v1/portfolio/projects/${slug}/`),

  // Get single blog post
  getBlogPost: (slug: string) => api.get<FeaturedPost>(`/v1/blog/posts/${slug}/`),
};

// src/lib/utils.ts remains the same
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
