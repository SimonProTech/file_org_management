import React from 'react';
import FileHeader from '@/app/components/common/FileHeader';
import AllFiles from '@/app/components/files/AllFiles';

const Page = () => (
  <div className="relative w-full">
    <FileHeader title="Trash files" />
    <AllFiles deletedOnly />
  </div>
);

export default Page;
