// src/components/blog/BlogCard.tsx
import { OptimizedImage } from '@/components/common/OptimizedImage';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/types/blog';

interface BlogCardProps {
  post: Post;
  priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
      aria-labelledby={`post-title-${post.id}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <OptimizedImage
          src={post.featured_image}
          alt={post.title}
          type="blog"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          {post.category && (
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 hover:bg-blue-200">
              {post.category.name}
            </span>
          )}
          <time className="text-sm text-gray-500" dateTime={post.published_date}>
            {new Date(post.published_date).toLocaleDateString()}
          </time>
        </div>

        <h3
          id={`post-title-${post.id}`}
          className="mb-2 text-lg font-semibold tracking-tight"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 text-gray-900 hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {post.reading_time && (
              <>
                <span>{post.reading_time} min read</span>
                <span>•</span>
              </>
            )}
            {post.word_count && (
              <span>{post.word_count.toLocaleString()} words</span>
            )}
          </div>

          <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
            Read More
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}