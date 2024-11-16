// src/components/blog/BlogContent.tsx
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { blogApi } from '@/lib/api/blog';
import type { Post, PaginatedResponse } from '@/types/blog';
import { FeaturedPosts, BlogCard } from '@/components/blog';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { PostsLoadingSkeleton } from './PostsLoadingSkeleton';
import { AlertCircle } from 'lucide-react';

export function BlogContent() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error
  } = useInfiniteQuery({
    queryKey: ['blogPosts'],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        console.log('Fetching page:', pageParam);
        const response = await blogApi.getBlogPosts({
          page: pageParam,
          page_size: 9
        });
        console.log('API Response:', response.data);
        return response.data;
      } catch (err) {
        console.error('API Error:', err);
        throw err;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedResponse<Post>) => {
      if (!lastPage?.next) return undefined;
      try {
        console.log('Next URL:', lastPage.next);
        const url = new URL(lastPage.next);
        const nextPage = url.searchParams.get('page');
        return nextPage ? parseInt(nextPage, 10) : undefined;
      } catch {
        return undefined;
      }
    }
  });

  if (status === 'pending') {
    return <PostsLoadingSkeleton />;
  }

  if (status === 'error') {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <p>{error instanceof Error ? error.message : 'Failed to load blog posts'}</p>
        </div>
        <pre className="mt-2 text-sm">
          {error instanceof Error && error.stack}
        </pre>
      </div>
    );
  }

  const posts = data?.pages.flatMap(page => page.results) ?? [];
  const featuredPosts = posts.filter((post): post is Post => post.is_featured === true);
  const recentPosts = posts.filter(post => !post.is_featured);

  return (
    <>
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <FeaturedPosts posts={featuredPosts.slice(0, 3)} />
        </div>
      )}

      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>

        {(hasNextPage || isFetchingNextPage) && (
          <div className="flex justify-center pt-8">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetchingNextPage
                ? <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                : 'Load More Posts'
              }
            </button>
          </div>
        )}
      </div>
    </>
  );
}
