// src/app/blog/[slug]/loading.tsx
export default function BlogPostLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="space-y-8">
        {/* Title Skeleton */}
        <div className="space-y-4">
          <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
        </div>

        {/* Featured Image Skeleton */}
        <div className="w-full aspect-[16/9] bg-gray-200 animate-pulse rounded-lg" />

        {/* Content Skeletons */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-4/6 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
