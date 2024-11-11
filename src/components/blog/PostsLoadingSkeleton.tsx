// src/components/blog/PostsLoadingSkeleton.tsx
export function PostsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[0, 1].map((column) => (
        <div key={column} className="space-y-8">
          {[0, 1].map((row) => (
            <div
              key={`${column}-${row}`}
              className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="aspect-[16/9] bg-gray-200 animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
