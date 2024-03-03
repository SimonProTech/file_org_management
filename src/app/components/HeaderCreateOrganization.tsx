'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import React, { FC } from 'react';
import CreateOrganizationForm from '@/app/components/forms/CreateOrganizationForm';

interface HeaderCreateOrganizationProps {
    openDialog: boolean;
    setOpenDialog: (x: boolean) => void;
}

const HeaderCreateOrganization:
    FC<HeaderCreateOrganizationProps> = ({
      setOpenDialog, openDialog,
    }) => (
      <Dialog
        onOpenChange={setOpenDialog}
        open={openDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-5">Create Organization</DialogTitle>
          </DialogHeader>
          <CreateOrganizationForm setOpenDialog={setOpenDialog} />
        </DialogContent>
      </Dialog>
    );

export default HeaderCreateOrganization;
