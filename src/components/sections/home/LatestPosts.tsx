// src/components/sections/home/LatestPosts.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { blogApi } from '@/lib/api/blog';
import { BlogCard } from '@/components/blog';
import { AlertCircle } from 'lucide-react';
import type { Post } from '@/types/blog';

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
    <div className="flex items-center gap-2 p-4 text-red-800 bg-red-50 rounded-md">
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}

export default function LatestPosts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['latestPosts'],
    queryFn: async () => {
      try {
        const response = await blogApi.getBlogPosts({
          page: 1,
          page_size: 3,
          ordering: '-published_date'
        });
        return response.data;
      } catch (err) {
        console.error('Error fetching latest posts:', err);
        throw err;
      }
    }
  });

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <LoadingPosts />
        </div>
      </section>
    );
  }

  if (error instanceof Error) {
    return (
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <ErrorMessage message="Failed to load latest posts. Please try again later." />
        </div>
      </section>
    );
  }

  if (!data?.results.length) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.results.map((post: Post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
