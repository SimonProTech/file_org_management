import React from 'react';
import AllFiles from '@/app/components/files/AllFiles';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import options from '@/app/api/auth/[...nextauth]/options';
import FileHeader from '@/app/components/common/FileHeader';

const Files = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex flex-col flex-1 relative">
      <FileHeader title="All files" />
      <AllFiles />
    </div>
  );
};
export default Files;
