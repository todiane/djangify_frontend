// src/components/blog/BlogContent.tsx
'use client';

import { Post } from '@/types/blog';
import { blogApi } from '@/lib/api/blog';
import { FeaturedPosts, BlogCard } from '@/components/blog';

export async function BlogContent() {
  try {
    const data = await blogApi.getBlogPosts();
    const featuredPosts = data.data.results.filter((post: Post): post is Post => post.is_featured === true);
    const recentPosts = data.data.results.filter((post: Post) => !post.is_featured);

    return (
      <>
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <FeaturedPosts posts={featuredPosts.slice(0, 3)} />
          </div>
        )}

        <div className="bg-slate-50 rounded-lg p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-slate-600 mb-6">
              Subscribe to our newsletter for the latest articles, tutorials, and insights
              about web development, React, and Next.js.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post: Post) => (
              <BlogCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <p className="flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          Failed to load blog posts. Please try again later.
        </p>
      </div>
    );
  }
}
