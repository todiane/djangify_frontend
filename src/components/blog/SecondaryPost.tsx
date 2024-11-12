
// src/components/blog/SecondaryPost.tsx
import Link from 'next/link';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/types/blog';

interface SecondaryPostProps {
  post: Post;
}

export function SecondaryPost({ post }: SecondaryPostProps) {
  return (
    <article className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-video">
          <OptimizedImage
            src={post.featured_image}
            alt={post.title}
            type="blog"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <time className="text-sm text-gray-500" dateTime={post.published_date}>
            {new Date(post.published_date).toLocaleDateString()}
          </time>
          <h3 className="text-lg font-semibold mt-2 mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}