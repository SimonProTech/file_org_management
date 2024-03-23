'use client';

import React, { useState } from 'react';
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
  organizationId,
} : {name: string, sessionId: string, organizationId: Id<'organizations'>}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-x-5">
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogTrigger>
          <PencilLineIcon className="text-white hover:scale-105 transition-all cursor-pointer" size={30} />
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
    </div>
  );
};

export default SettingName;
