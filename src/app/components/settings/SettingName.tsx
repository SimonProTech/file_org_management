'use client';

import React, { useEffect, useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import useUser from '@/app/store/useUser';
import { Roles } from '@/app/types/types';
import { PencilLineIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SettingChangeName from '@/app/components/settings/SettingChangeName';
import { Id } from '../../../../convex/_generated/dataModel';

const SettingName = ({
  name,
  sessionId,
  orgFounderId,
  organizationId,
} : {name: string, sessionId: string, orgFounderId: string, organizationId: Id<'organizations'>}) => {
  const { role } = useUser();
  const setRole = useUser((state) => state.setRole);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (orgFounderId === sessionId) {
      setRole(Roles.admin);
    }
  }, [orgFounderId, sessionId]);

  return (
    <div className="flex items-center gap-x-5">
      {role === Roles.admin ? (
        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        >
          <DialogTrigger>
            <PencilLineIcon className="text-green-600 cursor-pointer" size={40} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl">Do you want to change organization name?</DialogTitle>
              <SettingChangeName
                adminId={sessionId}
                orgId={organizationId}
                setDialogOpen={setDialogOpen}
                orgName={name}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : null}
      <HoverCard>
        <HoverCardTrigger>
          <span className="underline font-bold cursor-pointer text-xl">
            {name}
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          Name of the organization.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default SettingName;
