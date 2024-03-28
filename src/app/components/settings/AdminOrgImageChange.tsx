import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Images } from 'lucide-react';
import Image from 'next/image';
import { fetchQuery } from 'convex/nextjs';
import AdminUploadOrgImageUpdate from '@/app/components/settings/AdminUploadOrgImageUpdate';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface AdminUploadOrgImageUpdateProps {
  fileId: Id<'_storage'>,
  sessionId: string;
  orgName: string;
  organizationId: string;
}

export const revalidate = 10; // revalidate the data at most every hour

const AdminOrgImageChange = async ({
  organizationId, sessionId, fileId, orgName,
}: AdminUploadOrgImageUpdateProps) => {
  const imageUrl = await fetchQuery(api.files.getFileUrl, {
    storageId: fileId,
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Images className="text-white cursor-pointer" size={30} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center mb-2 text-2xl">Update your organization image 😉</AlertDialogTitle>
          <div className="flex justify-center items-center w-full">
            {imageUrl ? <Image className="rounded-full" src={imageUrl as string} width={130} height={130} alt={orgName} /> : null}
          </div>
          <AdminUploadOrgImageUpdate organizationId={organizationId} sessionId={sessionId} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AdminOrgImageChange;
