// LoadingPortfolio.tsx
export function LoadingPortfolio() {
  return (
    <div className="space-y-8">
      {/* Technology Filter Skeleton */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 bg-gray-200 animate-pulse rounded-full"
          />
        ))}
      </div>

      {/* Projects Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-video bg-gray-200 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-7 bg-gray-200 animate-pulse rounded-md w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-full" />
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-2/3" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md" />
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
