// src/types/blog.ts

export interface Category {
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  content: string;
  created_at: string;
  is_approved: boolean;
}

// Base post type with common properties
export interface BasePost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  published_date: string;
  category: Category;
}

// Full post type extending base post
export interface Post extends BasePost {
  content: string;
  tags?: Tag[];  // Made optional
  status?: 'draft' | 'published';  // Made optional
  created_at?: string;  // Made optional
  updated_at?: string;  // Made optional
  is_featured?: boolean;  // Made optional
  comments?: Comment[];
  reading_time?: number;
  word_count?: number;
  meta_description?: string;
}

// Featured post type extending Post
export interface FeaturedPost extends BasePost {
  content: string;
  tags?: Tag[];
  status?: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
  is_featured?: boolean;
  comments?: Comment[];
  reading_time: number;  // Still required for FeaturedPost
  word_count: number;    // Still required for FeaturedPost
  meta_description?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
