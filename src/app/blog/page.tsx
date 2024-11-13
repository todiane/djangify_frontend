// src/app/blog/page.tsx
import { Suspense } from 'react';
import { BlogContent } from '@/components/blog';
import { PostsLoadingSkeleton } from '@/components/blog/PostsLoadingSkeleton';
import { generateMetadata } from '@/lib/metadata';
import Layout from '@/components/layout/Layout';

export const revalidate = 3600;

export const metadata = generateMetadata({
  title: 'Blog - Latest Posts and Updates',
  description: 'Welcome to my blog where I share insights and experiences about web development, coding tutorials, and tech industry perspectives.',
  path: '/blog'
});

export default function BlogPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-center tracking-tight">Blog</h1>
          <p className="text-lg text-center text-gray-600">
            Welcome to my blog where I share insights and experiences about web
            development, coding tutorials, and tech industry perspectives.
          </p>
        </div>

        <Suspense fallback={<PostsLoadingSkeleton />}>
          <BlogContent />
        </Suspense>
      </div>
    </Layout>
  );
}
