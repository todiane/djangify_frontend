// src/lib/api/blog.ts
import { api } from './base';
import type { FeaturedPost } from '@/types/blog';

export const blogApi = {
  getBlogPosts: () => api.get('/v1/blog/posts/'),
  getBlogPost: (slug: string) => api.get<FeaturedPost>(`/v1/blog/posts/${slug}/`),
};
