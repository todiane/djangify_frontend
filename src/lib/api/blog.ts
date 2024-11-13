//src/lib/api/blog.ts

import { api } from './base';
import type { PaginatedResponse, Post, BlogFilter, FeaturedPost } from '@/types/blog';

export const blogApi = {
  /**
   * Get paginated blog posts with optional filtering
   */
  getBlogPosts: async (params?: BlogFilter) => {
    const response = await api.get<PaginatedResponse<Post>>('/v1/blog/posts/', {
      params: {
        page: params?.page || 1,
        page_size: params?.page_size || 9,
        category: params?.category,
        tag: params?.tag,
        search: params?.search,
        ordering: params?.ordering || '-published_date', // Default to newest first
      }
    });
    return response;
  },

  /**
   * Get a single blog post by slug
   */
  getBlogPost: async (slug: string) => {
    const response = await api.get<Post>(`/v1/blog/posts/${slug}/`);
    return response;
  },

  /**
   * Get featured blog posts
   */
  getFeaturedPosts: async () => {
    const response = await api.get<PaginatedResponse<FeaturedPost>>('/v1/blog/posts/', {
      params: {
        is_featured: true,
        page_size: 3,  // Typically we only need a few featured posts
        ordering: '-published_date'
      }
    });
    return response;
  },

  /**
   * Get posts by category slug
   */
  getPostsByCategory: async (categorySlug: string, params?: BlogFilter) => {
    const response = await api.get<PaginatedResponse<Post>>('/v1/blog/posts/', {
      params: {
        category__slug: categorySlug,
        page: params?.page || 1,
        page_size: params?.page_size || 9,
        ordering: params?.ordering || '-published_date',
      }
    });
    return response;
  },

  /**
   * Get posts by tag slug
   */
  getPostsByTag: async (tagSlug: string, params?: BlogFilter) => {
    const response = await api.get<PaginatedResponse<Post>>('/v1/blog/posts/', {
      params: {
        tags__slug: tagSlug,
        page: params?.page || 1,
        page_size: params?.page_size || 9,
        ordering: params?.ordering || '-published_date',
      }
    });
    return response;
  },

  /**
   * Get related posts
   */
  getRelatedPosts: async (postId: number, limit: number = 3) => {
    const response = await api.get<PaginatedResponse<Post>>('/v1/blog/posts/', {
      params: {
        related_to: postId,
        page_size: limit,
        ordering: '-published_date'
      }
    });
    return response;
  },

  /**
   * Search posts
   */
  searchPosts: async (query: string, params?: BlogFilter) => {
    const response = await api.get<PaginatedResponse<Post>>('/v1/blog/posts/', {
      params: {
        search: query,
        page: params?.page || 1,
        page_size: params?.page_size || 9,
        ordering: params?.ordering || '-published_date',
      }
    });
    return response;
  }
};
