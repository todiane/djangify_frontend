// src/components/blog/FeaturedPostCard.tsx
import Link from 'next/link';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import type { Post } from '@/types/blog';

interface FeaturedPostCardProps {
  post: Post;
  isMain?: boolean;
  priority?: boolean;
}

export function FeaturedPostCard({
  post,
  isMain = false,
  priority = false
}: FeaturedPostCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
      aria-labelledby={`featured-post-${post.id}`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className={`relative ${isMain ? 'aspect-[16/9]' : 'aspect-[2/1]'}`}>
          <OptimizedImage
            src={post.featured_image}
            alt={post.title}
            type="blog"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {post.category && (
                <span className="inline-flex px-2.5 py-0.5 text-xs font-medium text-white bg-blue-600/80 rounded-full">
                  {post.category.name}
                </span>
              )}
              <time
                className="text-sm text-white/90"
                dateTime={post.published_date}
              >
                {new Date(post.published_date).toLocaleDateString()}
              </time>
              {post.reading_time && (
                <span className="text-sm text-white/90">
                  {post.reading_time} min read
                </span>
              )}
            </div>

            {/* Title and Excerpt */}
            <div className="space-y-2">
              <h3
                id={`featured-post-${post.id}`}
                className={`${isMain ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold text-white line-clamp-2`}
              >
                {post.title}
              </h3>

              {isMain && post.excerpt && (
                <p className="text-white/90 line-clamp-2 text-base md:text-lg">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
