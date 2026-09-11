export const CardSkeleton = () => (
  <div className="p-5 border border-gray-200 rounded-xl animate-pulse space-y-3 bg-white shadow-sm">
    <div className="flex justify-between items-center">
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-12"></div>
    </div>
    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
    <div className="h-2 bg-gray-200 rounded w-full mt-4"></div>
    <div className="flex justify-between items-center pt-2">
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);