// src/components/blog/RelatedPosts.tsx
import Link from 'next/link';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import type { Post } from '@/types/blog';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts?.length) return null;

  return (
    <section className="space-y-6" aria-labelledby="related-posts-title">
      <h2 id="related-posts-title" className="text-2xl font-bold text-gray-900">
        Related Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
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
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
