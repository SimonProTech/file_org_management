'use client';

import React, { FC } from 'react';
import UploadFile from '@/app/components/files/UploadFile';
import { usePathname } from 'next/navigation';
import FilesTypes from '@/app/components/files/FilesTypes';

interface FileHeaderProps {
    title: string;
}

const FileHeader: FC<FileHeaderProps> = ({ title }) => {
  const path = usePathname();
  return (
    <div className="flex lg:flex-row flex-col justify-between p-1 w-full mb-10">
      <h1 className="text-black lg:mb-0 mb-10 font-bold text-5xl">{title}</h1>
      <div className="flex flex-col md:flex-row gap-y-4 items-center gap-x-20">
        <FilesTypes />
        {path === '/files' ? <UploadFile /> : null}
      </div>
    </div>
  );
};

export default FileHeader;
