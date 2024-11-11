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
  tags: Tag[];
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  comments?: Comment[];
  reading_time?: number;
  word_count?: number;
  meta_description?: string;
}

// Featured post with required reading metrics
export interface FeaturedPost extends Post {
  reading_time: number;  // Required for FeaturedPost
  word_count: number;    // Required for FeaturedPost
}
