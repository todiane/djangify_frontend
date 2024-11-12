// src/app/blog/[slug]/BlogPost.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/blog";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const [imageError, setImageError] = useState(false);

  const getAbsoluteImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    const baseUrl = process.env.NODE_ENV === 'development'
      ? `http://${process.env.NEXT_PUBLIC_BACKEND_HOST || 'localhost'}:${process.env.NEXT_PUBLIC_BACKEND_PORT || '8000'}`
      : `https://${process.env.NEXT_PUBLIC_BACKEND_HOST}`;

    return imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;
  };

  const processContent = (content: string) => {
    return content.replace(
      /(src=["'])(\/media\/[^"']*)(["'])/g,
      (match, start, url, end) => start + getAbsoluteImageUrl(url) + end
    );
  };

  const formattedDate = formatDate(post.published_date);
  const processedContent = processContent(post.content);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Post Header */}
      <header className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          {formattedDate && (
            <>
              <time dateTime={post.published_date}>
                {formattedDate}
              </time>
              <span>•</span>
            </>
          )}
          {post.reading_time && <span>{post.reading_time} min read</span>}
          {post.word_count && (
            <>
              <span>•</span>
              <span>{post.word_count} words</span>
            </>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.featured_image && !imageError && (
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={getAbsoluteImageUrl(post.featured_image)}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* Post Content */}
      <div
        className="prose prose-lg max-w-none prose-img:rounded-lg prose-a:text-blue-600 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />

      {/* Tags and Category */}
      <footer className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag.slug}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        {post.category && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Posted in {post.category.name}
          </p>
        )}
      </footer>
    </article>
  );
}
