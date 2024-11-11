// src/components/blog/BlogPostCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apiUtils } from '@/lib/api';
import type { FeaturedPost } from '@/types/blog';

interface BlogPostCardProps {
  post: FeaturedPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const imageUrl = apiUtils.getMediaUrl(post.featured_image);

  return (
    <div className="group rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="relative h-48">
        <Image
          src={imageUrl || '/api/placeholder/400/200'}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <time>{new Date(post.published_date).toLocaleDateString()}</time>
          {post.reading_time && (
            <>
              <span>•</span>
              <span>{post.reading_time} min read</span>
            </>
          )}
          {post.word_count && (
            <>
              <span>•</span>
              <span>{post.word_count} words</span>
            </>
          )}
        </div>
      </div>
      <div className="px-6 pb-6">
        <p className="text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Read More <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <div className="text-sm text-gray-500">
            in <Link href={`/blog/category/${post.category.slug}`} className="hover:text-blue-600">{post.category.name}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
