import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { v4 as uuid } from 'uuid';

const LoadingSkeleton = ({ className }: {className?: string}) => (
  <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {[...Array(4)].map(() => (
      <Skeleton
        key={uuid()}
        className={cn('h-14 bg-gray-300 w-full rounded-md p-3 flex items-center justify-between', className)}
      />
    ))}
  </div>
);

export default LoadingSkeleton;
