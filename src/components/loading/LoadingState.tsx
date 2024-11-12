// LoadingState.tsx
export function LoadingState() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 animate-pulse rounded-lg w-2/3" />
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg w-1/2" />
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg bg-white shadow-md p-6"
            >
              <div className="aspect-video bg-gray-200 animate-pulse rounded-md" />
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 animate-pulse rounded-md w-3/4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-full" />
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
