export function EpisodeSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-lg bg-gray-900 p-6 shadow-xl">
        {/* Close Button Skeleton */}
        <div className="absolute right-4 top-4 h-6 w-6 animate-pulse rounded-full bg-gray-700"></div>

        <div className="space-y-6">
          {/* Episode Info Skeleton */}
          <div className="space-y-2">
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-700"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-800"></div>
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-800"></div>
          </div>

          {/* Characters Grid Skeleton */}
          <div>
            <div className="mb-3 h-6 w-1/3 animate-pulse rounded bg-gray-700"></div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-800"></div>
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-700"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
