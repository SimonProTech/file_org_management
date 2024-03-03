'use client';

import React, { FC, FormEvent, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusIcon } from 'lucide-react';
import HeaderCreateOrganization from '@/app/components/HeaderCreateOrganization';
import { useQuery } from 'convex/react';
import { Button } from '@/components/ui/button';
import useOrganization from '@/app/store/useOrg';
import { api } from '../../../convex/_generated/api';

interface IsAdmin {
  role: string;
}

const HeaderOrganization: FC<IsAdmin> = ({ role }) => {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const getAllOrganizations = useQuery(api.organization.getAllOrganization);
  const addToCart = useOrganization((state) => state.setOrganization);

  return (
    <>
      <Select
        defaultValue="personal"
        open={openSelect}
        onOpenChange={setOpenSelect}
        onValueChange={(value) => addToCart(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select organization" />
        </SelectTrigger>
        <SelectContent className="p-2">
          <SelectItem value="personal">Personal account</SelectItem>
          {getAllOrganizations?.map(({ orgName, _id }) => (
            <SelectItem
              key={_id}
              value={_id}
            >
              {orgName}
            </SelectItem>
          ))}
          <Button className="mt-5" onClick={() => setOpenDialog(true)}>
            <PlusIcon size="20" />
            Create organization
          </Button>
        </SelectContent>
      </Select>
      {openDialog
        ? (
          <HeaderCreateOrganization
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        ) : null}
    </>
  );
};

export default HeaderOrganization;

// <DropdownMenuItem onClick={() => setOpenDialog(true)} className="gap-x-2 p-2 cursor-pointer">
//               <PlusIcon size="20" />
//               Create organization
//             </DropdownMenuItem>
