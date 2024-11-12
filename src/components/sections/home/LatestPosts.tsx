// src/components/sections/home/LatestPosts.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { ArrowRight } from 'lucide-react';
import type { Post, FeaturedPost, PaginatedResponse } from '@/types/blog';

function LoadingPosts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 aspect-video rounded-lg mb-4" />
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <div className="mb-4 text-red-500">⚠️</div>
      <h3 className="text-lg font-semibold mb-2">Error Loading Posts</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

function EmptyPosts() {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold mb-2">No Posts Found</h3>
      <p className="text-gray-600">Check back later for new content!</p>
    </div>
  );
}

function BlogPostCard({ post }: { post: FeaturedPost }) {
  return (
    <article className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-video">
          <OptimizedImage
            src={post.featured_image}
            alt={post.title}
            type="blog"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          {post.category && (
            <span className="inline-block px-3 py-1 mb-2 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
              {post.category.name}
            </span>
          )}
          <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {post.reading_time} min read
            </span>
            <span className="inline-flex items-center text-blue-600 group-hover:text-blue-700">
              Read More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function LatestPosts() {
  const [posts, setPosts] = useState<FeaturedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts?is_featured=true');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data: PaginatedResponse<Post> = await response.json();

        // Transform Post to FeaturedPost by adding required fields and filtering
        const featuredPosts = data.results
          .filter((post): post is Post & { is_featured: true } =>
            post.is_featured === true
          )
          .map(post => ({
            ...post,
            is_featured: true as const,
            content: post.content || '',
            reading_time: post.reading_time || 5,
            word_count: post.word_count || post.content.split(/\s+/).length,
          } satisfies FeaturedPost));

        setPosts(featuredPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <LoadingPosts />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <ErrorMessage message={error} />
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <EmptyPosts />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestPosts;
