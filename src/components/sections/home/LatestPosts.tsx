'use client';

import { useState, useEffect } from 'react';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { PostsLoadingSkeleton } from '@/components/blog/PostsLoadingSkeleton';
import type { Post, FeaturedPost, PaginatedResponse } from '@/types/blog';

const LatestPosts = () => {
  const [posts, setPosts] = useState<FeaturedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'http://localhost:8000/api/v1/blog/posts/?page_size=4&ordering=-published_date'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PaginatedResponse<Post> = await response.json();
        // Transform Post to FeaturedPost by adding required fields
        const featuredPosts: FeaturedPost[] = data.results.map(post => ({
          ...post,
          content: post.content || '',
          reading_time: post.reading_time || 5, // Default reading time
          word_count: post.word_count || post.content.split(/\s+/).length, // Calculate word count if missing
        }));
        setPosts(featuredPosts);
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
        <div className="text-center p-4 bg-red-50 text-red-500 rounded-md">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 px-4 py-2 border rounded-md hover:bg-gray-50"
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
};

export default LatestPosts;
