'use client';

import React, { FC, ReactNode, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertDialogType } from '@/app/types/types';
import { useMutation } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import useOrganization from '@/app/store/useOrg';
import { Check, Loader2, Trash2Icon } from 'lucide-react';
import { ConvexError } from 'convex/values';
import { api } from '../../../../convex/_generated/api';
import { Doc, Id } from '../../../../convex/_generated/dataModel';

interface AdminActionsProps {
    adminId: string;
    organizationId: Id<'organizations'>;
    opener: ReactNode;
    message: string;
    type: AlertDialogType;
    allUsers?: Doc<'user'>[]
}

const AdminActions: FC<AdminActionsProps> = ({
  opener, message, type, adminId, organizationId, allUsers,
}) => {
  const removeOrganization = useMutation(api.organization.removeOrganization);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const setOrganization = useOrganization((state) => state.setOrganization);
  const params = useParams<{id: Id<'organizations'>}>();
  const removeUser = useMutation(api.user.removeUser);
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
        console.error('Error deleting organization');
      }
    }
  };

  const removeUserFromOrg = async (id: Id<'user'>) => {
    try {
      setLoading(true);
      await removeUser({
        userId: id,
        adminId,
        orgId: params.id,
      });
      setLoading(false);
      setSuccess(true);
      return router.refresh();
    } catch (err) {
      setLoading(false);
      if (err instanceof ConvexError) {
        return setError(err.data);
      }
      return setError('Error while removing user from organization!');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {opener}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-red-500">
            Are you absolutely
            sure?
          </AlertDialogTitle>
          {type === AlertDialogType.deleteUser ? (
            <div className="relative">
              <AlertDialogDescription className="text-black">
                After clicking the delete icon, user will be deleted immediately!
              </AlertDialogDescription>
              <div className="flex flex-col mt-2 gap-y-4 max-h-40 admin-user-scroll overflow-y-scroll pr-5">
                {allUsers && allUsers?.length === 0 ? <p className="text-indigo-600 font-bold">There are no users in that organization!</p> : allUsers?.map((user) => (
                  <div key={user._id} className="p-2 flex items-center text-white justify-between bg-indigo-600/80 rounded-md w-full">
                    <p>{user.userName}</p>
                    {loading && !success && <Loader2 className="h-4 w-4 animate-spin" />}
                    {!loading && success && <Check className="text-green-600" size={20} />}
                    {!loading && !success && <Trash2Icon onClick={() => removeUserFromOrg(user._id)} className="cursor-pointer" size={20} />}
                  </div>
                ))}
                {error && <span className="text-red-400 font-bold text-sm underline underline-offset-4">{error}</span>}
                {success && <span className="text-red-400 font-bold text-sm underline underline-offset-4">''</span>}
              </div>
              <AlertDialogCancel onClick={() => setError(null)} className="cancel-button-user-admin w-full">Cancel</AlertDialogCancel>
            </div>
          ) : (
            <AlertDialogDescription className="text-black">
              {message}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {type === AlertDialogType.deleteAll ? (
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setError(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-600"
              type="button"
              onClick={adminAction}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        ) : null}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminActions;
