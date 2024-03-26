'use client';

import React, { FC } from 'react';
import { useQuery } from 'convex/react';
import useOrganization from '@/app/store/useOrg';
import Image from 'next/image';
import UploadFile from '@/app/components/files/UploadFile';
import { GridIcon, Loader2, RowsIcon } from 'lucide-react';
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs';
import FIleCard from '@/app/components/files/FIleCard';
import { useSession } from 'next-auth/react';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip';
import useType from '@/app/store/useType';
import { api } from '../../../../convex/_generated/api';

interface AllFiles {
  deletedOnly?: boolean;
  favorite?: boolean;
}

const AllFiles: FC<AllFiles> = ({ deletedOnly = undefined, favorite = undefined }) => {
  const user = useSession();
  const { organizationId } = useOrganization();
  const { type } = useType();

  const allFiles = useQuery(api.files.allFiles, {
    orgId:
        organizationId || user.data?.user.id as string,
    shouldBeDeleted: deletedOnly,
    favorite,
    fileTypeQ: type === 'all' ? undefined : type,
  });

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
      <Tabs defaultValue="grid">
        <TabsList className="mb-2 w-max">
          <TabsTrigger value="grid" className="flex gap-2 items-center">
            <GridIcon />
            Grid
          </TabsTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="cursor-not-allowed">
                <TabsTrigger disabled value="table" className="flex gap-2 items-center">
                  <RowsIcon />
                  {' '}
                  Table
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent sideOffset={20} side="right" className="bg-indigo-600 text-white">
                <p>Feature in progress</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TabsList>
        <TabsContent value="grid">
          <div className="grid pb-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {allFiles?.map((file) => (
              <FIleCard
                key={file._id}
                file={file}
                favorite={favorite as boolean}
                deletedOnly={deletedOnly as boolean}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      )}
    </>
  );
};

export default AllFiles;
