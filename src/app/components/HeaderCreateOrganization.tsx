'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import React, { FC } from 'react';
import CreateOrganizationForm from '@/app/components/forms/CreateOrganizationForm';

interface HeaderCreateOrganizationProps {
    openDialog: boolean;
    setOpenDialog: (x: boolean) => void;
    id: string;
}

const HeaderCreateOrganization:
    FC<HeaderCreateOrganizationProps> = ({
      setOpenDialog, openDialog, id,
    }) => (
      <Dialog
        onOpenChange={setOpenDialog}
        open={openDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-5">Create Organization</DialogTitle>
          </DialogHeader>
          <CreateOrganizationForm id={id} setOpenDialog={setOpenDialog} />
        </DialogContent>
      </Dialog>
    );
export default HeaderCreateOrganization;
