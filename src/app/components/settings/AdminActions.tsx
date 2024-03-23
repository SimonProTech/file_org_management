'use client';

import React, { FC, ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertDialogType } from '@/app/types/types';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import useOrganization from '@/app/store/useOrg';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface AdminActionsProps {
  adminId: string;
  organizationId: Id<'organizations'>;
    opener: ReactNode;
    message: string;
    type: AlertDialogType;
}

const AdminActions: FC<AdminActionsProps> = ({
  opener, message, type, adminId, organizationId,
}) => {
  const removeOrganization = useMutation(api.organization.removeOrganization);
  const setOrganization = useOrganization((state) => state.setOrganization);

  const router = useRouter();
  const { toast } = useToast();
  const adminAction = async () => {
    switch (type) {
      case AlertDialogType.deleteAll: {
        await removeOrganization({
          adminId,
          organizationId,
        });
        toast({
          variant: 'success',
          description: 'Deleted successfully',
        });

        setOrganization(adminId);

        router.refresh();

        return router.push('/files');
      }
      default: {
        console.log('xd');
      }
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {opener}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-red-500">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-600" type="button" onClick={adminAction}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminActions;
