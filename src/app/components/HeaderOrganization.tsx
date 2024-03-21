'use client';

import React, { FC, useEffect, useState } from 'react';
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
import getFileUrl from '@/lib/getUrl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import randomColorPick from '@/lib/randomColorPick';
import useUser from '@/app/store/useUser';
import { Roles } from '@/app/types/types';
import { usePathname } from 'next/navigation';
import { api } from '../../../convex/_generated/api';
import { Doc } from '../../../convex/_generated/dataModel';

interface IsAdmin {
  id: string;
  image: string;
  adminName: string;
}

const HeaderOrganization: FC<IsAdmin> = ({
  id, image, adminName,
}) => {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const pathname = usePathname();
  const getAllOrganizations = useQuery(api.organization.getAllOrganization, {
    userId: id,
  });
  const { organizationId } = useOrganization();

  const setOrganization = useOrganization((state) => state.setOrganization);
  const organizationDetails = useQuery(api.organization.getOrganization, { orgId: organizationId } || 'skip');
  const setRole = useUser((state) => state.setRole);

  const userFromDb = useQuery(api.user.getUserFromOrganization, {
    orgId: organizationId as string,
    userId: id,
  });

  const onValueChange = (value: string) => {
    setOrganization(value);
  };

  useEffect(() => {
    if (organizationDetails) {
      if (organizationDetails?.adminId === id) {
        setRole(Roles.admin);
      }
    } else if (organizationId === id) {
      setRole(Roles.personal);
    } else if (userFromDb) {
      setRole(userFromDb.role);
    }
  }, [organizationId, id, userFromDb?.role, organizationDetails]);

  return (
    <>
      <Select
        disabled={pathname.includes('/settings')}
        defaultValue=""
        open={openSelect}
        onOpenChange={setOpenSelect}
        onValueChange={(value) => onValueChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select organization" />
        </SelectTrigger>
        <SelectContent className="p-2">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage width={30} height={30} src={image} alt="Avatar" />
              <AvatarFallback className={`${randomColorPick()} text-white`}>{}</AvatarFallback>
            </Avatar>
            <SelectItem
              value={id}
            >
              Personal account
            </SelectItem>
          </div>
          {getAllOrganizations && (getAllOrganizations as Doc<'organizations'>[])?.map(({ orgName, _id, fileId }) => (
            <div key={_id} className="flex items-center mt-2">
              <Avatar>
                <AvatarImage width={30} height={30} src={getFileUrl(fileId)} alt="@shadcn" />
                <AvatarFallback className={`${randomColorPick()} text-white`}>{orgName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <SelectItem
                value={_id}
              >
                {orgName}
              </SelectItem>
            </div>

          ))}
          <Button
            className="mt-5 gap-x-2"
            onClick={() => {
              setOpenDialog(true);
              setOpenSelect(false);
            }}
          >
            <PlusIcon size="20" />
            Create organization
          </Button>
        </SelectContent>
      </Select>
      {openDialog
        ? (
          <HeaderCreateOrganization
            id={id}
            openDialog={openDialog}
            adminName={adminName}
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
