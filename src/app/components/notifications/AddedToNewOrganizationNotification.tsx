import { Button } from '@/components/ui/button';
import React, { FC } from 'react';
import { Id } from '../../../../convex/_generated/dataModel';

interface AddedToNewOrganizationNotificationProps {
    orgName: string;
    adminName: string;
    joinOrg: (id: Id<'user'>) => Promise<void>;
    _id: Id<'user'>
}

const AddedToNewOrganizationNotification:
    FC<AddedToNewOrganizationNotificationProps> = ({
      orgName, adminName, joinOrg, _id,
    }) => (
      <div className="flex gap-x-2 items-center">
        <p className="list-item list-inside">
          You have been invited to the
          {' '}
          <span className="font-bold text-indigo-600">{orgName}</span>
          {' '}
          organization by
          {' '}
          <span className="font-bold underline">{adminName}</span>
        </p>
        <Button onClick={() => joinOrg(_id)} className="bg-orange-500 hover:bg-orange-600">Join now</Button>
      </div>
    );

export default AddedToNewOrganizationNotification;
