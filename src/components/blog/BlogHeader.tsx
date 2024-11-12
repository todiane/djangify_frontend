// src/components/blog/BlogHeader.tsx
import { OptimizedImage } from '@/components/common/OptimizedImage';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { Post } from '@/types/blog';

interface BlogHeaderProps {
  post: Post;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="space-y-8 mb-12">
      <div className="relative aspect-[2/1] rounded-lg overflow-hidden">
        <OptimizedImage
          src={post.featured_image}
          alt={post.title}
          type="blog"
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          {post.category && (
            <Link href={`/blog/category/${post.category.slug}`}>
              <span className="inline-flex px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                {post.category.name}
              </span>
            </Link>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {post.title}
          </h1>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <time dateTime={post.published_date}>
            {new Date(post.published_date).toLocaleDateString()}
          </time>
          <span>•</span>
          {post.reading_time && (
            <>
              <span>{post.reading_time} min read</span>
              <span>•</span>
            </>
          )}
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments?.length || 0} comments</span>
          </div>
        </div>
      </div>
    </header>
  );
}
