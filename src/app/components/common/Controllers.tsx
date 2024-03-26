'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { File, Star, Trash } from 'lucide-react';

const Controllers = () => {
  const path = usePathname();

  return (
    <div className="flex lg:flex-col flex-col md:flex-row lg:pb-0 pb-12  lg:justify-start justify-center w-full lg:w-60 gap-4">
      <Link className="md:border-none md:border-black border-2 border-black rounded-xl" href="/files">
        <Button className={`flex ${path === '/files' ? 'text-indigo-600 font-bold' : ''} gap-4 text-lg hover:no-underline items-center`} variant="link">
          <File size="25" />
          {' '}
          All files
        </Button>
      </Link>
      <Link className="md:border-none md:border-black border-2 border-black rounded-xl" href="/files/favorites">
        <Button className={`flex ${path.includes('/favorites') ? 'text-indigo-600 font-bold' : ''} gap-4 hover:no-underline items-center text-lg`} variant="link">
          <Star size="25" />
          {' '}
          Favorites
        </Button>
      </Link>
      <Link className="md:border-none md:border-black border-2 border-black rounded-xl" href="/files/bin">
        <Button className={`flex ${path.includes('/bin') ? 'text-indigo-600 font-bold' : ''} gap-4 hover:no-underline items-center text-lg`} variant="link">
          <Trash size="25" />
          {' '}
          Trash
        </Button>
      </Link>
    </div>
  );
};

export default Controllers;
