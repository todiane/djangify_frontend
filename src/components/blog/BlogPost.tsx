// src/components/blog/BlogPost.tsx
'use client';

import { useState } from 'react';
import { formatDate } from "@/lib/utils";
import Image from 'next/image';
import type { Post } from "@/types/blog";

interface BlogPostProps {
  post: Post;
}

const BlogPost = ({ post }: BlogPostProps) => {
  const [imageError, setImageError] = useState(false);

  const getFullImageUrl = (src: string) => {
    if (src.startsWith('http')) return src;
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    return src.startsWith('/') ? `${baseUrl}${src}` : `${baseUrl}/${src}`;
  };

  const processContent = (content: string) => {
    return content.replace(
      /<img.*?src=["'](\/[^"']*?)["'].*?>/g,
      (match, src) => {
        const fullUrl = getFullImageUrl(src);
        return `<img src="${fullUrl}" class="w-full h-auto rounded-lg" alt="Content image" />`;
      }
    );
  };

  const formattedDate = formatDate(post.published_date);
  const processedContent = processContent(post.content);

  return (
    <article className="max-w-3xl mx-auto">
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
          {post.category && (
            <span className="text-blue-600">{post.category.name}</span>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.featured_image && !imageError && (
        <div className="mb-8">
          <div className="relative aspect-[16/9]">
            <Image
              src={getFullImageUrl(post.featured_image)}
              alt={post.title}
              fill
              className="rounded-lg object-cover"
              priority
              onError={() => setImageError(true)}
            />
          </div>
        </div>
      )}

      <div
        className="prose prose-lg max-w-none prose-img:rounded-lg prose-a:text-blue-600 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />

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
};

export default BlogPost;
