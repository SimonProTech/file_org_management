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
    <div className="flex justify-between p-1 w-full mb-10">
      <h1 className="text-black font-bold text-5xl">{title}</h1>
      <div className="flex items-center gap-x-20">
        <FilesTypes />
        {path === '/files' ? <UploadFile /> : null}
      </div>
    </div>
  );
};

export default FileHeader;
