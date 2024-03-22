import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => (
  <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {[...Array(4)].map(() => (
      <Skeleton className="h-20 bg-gray-300 w-full rounded-md p-3 flex items-center justify-between" />
    ))}
  </div>
);

export default LoadingSkeleton;
