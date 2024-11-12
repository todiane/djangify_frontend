
// src/components/blog/PostGrid.tsx
'use client';

import { useState } from 'react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post, PaginatedResponse } from '@/types/blog';

interface PostGridProps {
  initialPosts: Post[];
  onLoadMore: (page: number) => Promise<PaginatedResponse<Post>>;
}

export function PostGrid({ initialPosts, onLoadMore }: PostGridProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMorePosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const nextPage = page + 1;
      const response = await onLoadMore(nextPage);

      setPosts(currentPosts => [...currentPosts, ...response.results]);
      setPage(nextPage);
      setHasMore(!!response.next);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load posts'));
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600 mb-2">Error loading posts</p>
        <button
          onClick={() => {
            setError(null);
            loadMorePosts();
          }}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-video">
              <OptimizedImage
                src={post.featured_image}
                alt={post.title}
                type="blog"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {post.category && (
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                    {post.category.name}
                  </span>
                )}
                <time className="text-sm text-gray-500" dateTime={post.published_date}>
                  {new Date(post.published_date).toLocaleDateString()}
                </time>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center">
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"></div>
          </div>
        ) : hasMore ? (
          <button
            onClick={loadMorePosts}
            className="min-w-[200px] px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            Load More Posts
          </button>
        ) : (
          <p className="text-gray-500">No more posts to load</p>
        )}
      </div>
    </div>
  );
}