// GalleryLoading.tsx
export function GalleryLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-lg"
        >
          <div className="aspect-square w-full bg-gray-200 animate-pulse rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="h-4 bg-white/20 rounded w-2/3 mb-2" />
              <div className="h-3 bg-white/20 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
