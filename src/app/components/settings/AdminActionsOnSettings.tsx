import React, { FC } from 'react';
import { Trash2Icon, UserX2 } from 'lucide-react';
import SettingName from '@/app/components/settings/SettingName';
import AdminActions from '@/app/components/settings/AdminActions';
import { AlertDialogType } from '@/app/types/types';
import AdminOrgImageChange from '@/app/components/settings/AdminOrgImageChange';
import { Doc, Id } from '../../../../convex/_generated/dataModel';

interface AdminActionsOnSettingsProps {
    name: string;
    sessionId: string;
    organizationId: string;
    allUsers: Doc<'user'>[]
    fileId: Id<'_storage'>
}

const AdminActionsOnSettings: FC<AdminActionsOnSettingsProps> = ({
  organizationId, sessionId, name, allUsers, fileId,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
    <div
      className="border-2 bg-green-500/80 border-green-500 shadow-xl text-white rounded-md p-3 flex items-center justify-between"
    >
      <p className="font-bold cursor-pointer text-xl">Change organization name</p>
      <SettingName
        organizationId={organizationId as Id<'organizations'>}
        name={name}
        sessionId={sessionId}
      />
    </div>
    <div
      className="border-2 bg-orange-500/80 border-orange-500 shadow-xl text-white rounded-md p-3 flex items-center justify-between"
    >
      <p className="font-bold cursor-pointer text-xl">Remove user from organization</p>

      <AdminActions
        type={AlertDialogType.deleteUser}
        adminId={sessionId}
        allUsers={allUsers}
        organizationId={organizationId as Id<'organizations'>}
        opener={
          <UserX2 className="cursor-pointer hover:scale-105 transition-all" size={30} />
                }
        message="Your are going to delete one of your organization member."
      />
    </div>
    <div
      className="border-2 bg-red-600/60 col-start-1 shadow-xl border-red-500 rounded-md p-3 flex items-center justify-between"
    >
      <p className="font-bold cursor-default text-white text-xl">Delete organization</p>
      <AdminActions
        adminId={sessionId}
        organizationId={organizationId as Id<'organizations'>}
        type={AlertDialogType.deleteAll}
        opener={
          <Trash2Icon className="cursor-pointer hover:scale-105 transition-all text-white" size={30} />
        }
        message="Your are going to delete permanently your organization."
      />
    </div>
    <div className="border-2 bg-indigo-600/60 col-start-1 md:col-start-2 shadow-xl border-indigo-500 rounded-md p-3 flex items-center justify-between">
      <p className="font-bold cursor-default text-white text-xl">
        Update organization image
      </p>
      <AdminOrgImageChange
        sessionId={sessionId}
        orgName={name}
        organizationId={organizationId}
        fileId={fileId}
      />
    </div>
  </div>
);

export default AdminActionsOnSettings;
