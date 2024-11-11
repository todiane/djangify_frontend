'use client';

import { useState, useEffect } from 'react';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { PostsLoadingSkeleton } from '@/components/blog/PostsLoadingSkeleton';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  published_date: string;
  author: {
    name: string;
    avatar_url?: string;
  };
  slug: string;
  reading_time?: number;
  word_count?: number;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const LatestPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts?limit=4');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PaginatedResponse<Post> = await response.json();
        setPosts(data.results);
      } catch (err) {
        setError('Failed to load recent posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <PostsLoadingSkeleton />;
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="text-center p-4 bg-red-50 text-red-600 rounded-md">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 px-4 py-2 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const leftColumnPosts = posts.filter((_, index) => index % 2 === 0);
  const rightColumnPosts = posts.filter((_, index) => index % 2 === 1);

  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold text-[#403f3f] mb-6">Latest Posts</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[leftColumnPosts, rightColumnPosts].map((columnPosts, idx) => (
          <div key={idx} className="space-y-8">
            {columnPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestPosts;
