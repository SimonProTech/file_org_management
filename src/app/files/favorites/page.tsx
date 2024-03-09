import React from 'react';
import FileHeader from '@/app/components/common/FileHeader';
import AllFiles from '@/app/components/files/AllFiles';

const Page = () => (
  <div className="relative w-full">
    <FileHeader title="Favorites files" />
    <AllFiles favorite />
  </div>
);

export default Page;
