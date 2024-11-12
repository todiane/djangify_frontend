// src/types/blog.ts

// Keep these interfaces as they are
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

// Full post type extending base post - removed [x: string]: unknown
export interface Post extends BasePost {
  content: string;
  tags?: Tag[];
  status?: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
  is_featured?: boolean;
  comments?: Comment[];
  reading_time?: number;
  word_count?: number;
  meta_description?: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  views_count?: number;
  likes_count?: number;
  short_description?: string;  // Some components use this
}

// Featured post type can stay the same but inherit from Post
export interface FeaturedPost extends Post {
  is_featured: true;  // Override to make it required and true
  reading_time: number;  // Required for FeaturedPost
  word_count: number;    // Required for FeaturedPost
  content: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  page_size?: number;
  current_page?: number;
  total_pages?: number;
}

// Add a type for filtering/sorting
export interface BlogFilter {
  category?: string;
  tag?: string;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}
