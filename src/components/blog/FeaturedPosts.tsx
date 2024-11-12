// src/components/blog/FeaturedPosts.tsx
import type { Post } from '@/types/blog';
import { FeaturedPostCard } from './FeaturedPostCard';

interface FeaturedPostsProps {
  posts: Post[];
  className?: string;
}

export function FeaturedPosts({ posts, className = '' }: FeaturedPostsProps) {
  if (!posts?.length) return null;

  const [mainPost, ...secondaryPosts] = posts;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 ${className}`}>
      {/* Main Featured Post */}
      <div className="lg:col-span-8">
        <FeaturedPostCard
          post={mainPost}
          isMain={true}
          priority // Priority load the main image
        />
      </div>

      {/* Secondary Posts */}
      <div className="lg:col-span-4 space-y-6">
        {secondaryPosts.slice(0, 2).map((post) => (
          <FeaturedPostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}
