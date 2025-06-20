export default function ChatsLoadingComponent() {
  return (
    <>
      {/* Header Bar Skeleton */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-pulse dark:bg-gray-900 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-32 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="h-4 w-32 bg-gray-100 rounded hidden sm:inline-block dark:bg-gray-800" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <div className="h-8 w-24 bg-gray-100 rounded dark:bg-gray-800" />
            </div>
            <div className="h-8 w-32 bg-gray-100 rounded dark:bg-gray-800" />
            <div className="h-8 w-8 bg-gray-100 rounded-full dark:bg-gray-800" />
            <div className="h-8 w-8 bg-gray-100 rounded-full dark:bg-gray-800" />
          </div>
        </div>
      </div>
      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        {/* Title and Button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="h-8 w-64 bg-gray-200 rounded mb-2 animate-pulse dark:bg-gray-700" />
            <div className="h-4 w-80 bg-gray-100 rounded animate-pulse dark:bg-gray-800" />
          </div>
          <div className="h-10 w-32 bg-gray-100 rounded animate-pulse dark:bg-gray-800" />
        </div>
        {/* Card Grid Skeletons */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-100 flex flex-col gap-0 rounded-xl border py-6 shadow-sm animate-pulse dark:bg-gray-900 dark:border-gray-800"
            >
              {/* Card Header */}
              <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-1 min-w-0">
                      <div className="h-5 w-32 bg-gray-200 rounded mb-2 dark:bg-gray-700" />
                    </div>
                  </div>
                  <div className="h-8 w-8 bg-gray-100 rounded ml-2 dark:bg-gray-800" />
                </div>
              </div>
              {/* Card Content */}
              <div className="px-6 pt-0">
                <div className="h-4 w-24 bg-gray-100 rounded mb-2 dark:bg-gray-800" />
              </div>
              {/* Card Footer */}
              <div className="flex items-center px-6 pt-4">
                <div className="h-8 w-full bg-gray-100 rounded dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
