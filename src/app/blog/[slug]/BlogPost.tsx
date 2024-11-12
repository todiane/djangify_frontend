// src/app/blog/[slug]/BlogPost.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatDate } from "@/lib/utils";
import { getImageUrl, getImageProps } from "@/lib/utils/image";
import type { Post } from "@/types/blog";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const [imageError, setImageError] = useState(false);

  const processContent = (content: string) => {
    return content.replace(
      /(src=["'])(\/media\/[^"']*)(["'])/g,
      (match, start, url, end) => start + getImageUrl(url) + end
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

        <div className="flex items-center gap-2 text-sm text-gray-600">
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
            src={getImageUrl(post.featured_image)}
            alt={post.title}
            fill
            priority
            {...getImageProps('blog')}
            className="object-cover"
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
      <footer className="mt-8 pt-8 border-t">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag.slug}
                className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        {post.category && (
          <p className="text-sm text-gray-600">
            Posted in {post.category.name}
          </p>
        )}
      </footer>
    </article>
  );
}
