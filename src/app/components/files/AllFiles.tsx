'use client';

import React from 'react';
import { useQuery } from 'convex/react';
import useOrganization from '@/app/store/useOrg';
import Image from 'next/image';
import FileHeader from '@/app/components/common/FileHeader';
import UploadFile from '@/app/components/files/UploadFile';
import { GridIcon, Loader2, RowsIcon } from 'lucide-react';
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs';
import FIleCard from '@/app/components/files/FIleCard';
import { api } from '../../../../convex/_generated/api';

const AllFiles = () => {
  const { organizationId } = useOrganization();
  const allFiles = useQuery(api.files.allFiles, organizationId ? { orgId: organizationId } : 'skip');
  const isLoading = allFiles === undefined;
  return (
    <>
      {isLoading && (
      <div className="w-full flex flex-col items-center pt-20">
        <Loader2 className="w-28 mb-5 text-indigo-600 h-28 animate-spin" />
        <p className="text-xl">Processing your images...</p>
      </div>
      )}

      {allFiles && allFiles?.length === 0 && (
        <div className="w-full flex flex-col items-center pt-20">
          <Image src="/assets/empty.svg" alt="empty storage image" width={300} height={300} />
          <div className="text-xl my-5">There are no files, upload them now</div>
          <UploadFile />
        </div>
      )}

      {allFiles && allFiles.length > 0 && (
      <>
        <FileHeader title="All files" />
        <Tabs defaultValue="grid">
          <TabsList className="mb-2 w-max">
            <TabsTrigger value="grid" className="flex gap-2 items-center">
              <GridIcon />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2 items-center">
              <RowsIcon />
              {' '}
              Table
            </TabsTrigger>
          </TabsList>
          <TabsContent value="grid">
            <div className="grid grid-cols-3 gap-4">
              {allFiles?.map((file) => (
                <FIleCard
                  key={file._id}
                  file={file}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </>
      )}
    </>
  );
};

// {allFiles.map((file) => (
//             <FileHeader title="All files" />
//             <FIleCard file={file} key={file._id} />
//             ))}
export default AllFiles;
