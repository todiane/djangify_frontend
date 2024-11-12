// src/components/loading/LoadingPortfolio.tsx
export function LoadingPortfolio() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
        >
          <div className="aspect-video bg-gray-200 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-200 animate-pulse rounded-md w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded-md w-full" />
              <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/2" />
            </div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="h-6 w-16 bg-gray-200 animate-pulse rounded-md"
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
  );
}
