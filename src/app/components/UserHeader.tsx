'use client';

import React, { FC, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import {
  Bell,
  File, SettingsIcon, Users2Icon,
} from 'lucide-react';
import HeaderLogout from '@/app/components/HeaderLogout';
import HeaderOrganization from '@/app/components/HeaderOrganization';
import { Session } from 'next-auth';
import Link from 'next/link';
import useOrganization from '@/app/store/useOrg';
import { useQuery } from 'convex/react';
import HeaderIsAdminAddMembers from '@/app/components/HeaderIsAdminAddMembers';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

const UserHeader: FC<Pick<Session, 'user'>> = ({ user }) => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const { organizationId } = useOrganization();
  const organizationDetails = useQuery(api.organization.getOrganization, { orgId: organizationId } || 'skip');

  const isAdmin = organizationDetails && organizationDetails.adminId === user.id;

  const handleDropDownMenu = () => {
    setSheetOpen(true);
  };

  return (
    <div className="flex items-center gap-x-4">
      <HeaderOrganization image={user.image as string} id={user.id} role={user?.role as string} />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            className="rounded-xl hover:scale-105 transition-all border-white border-2"
            src={user?.image as string}
            width={40}
            height={40}
            alt="google user icon"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96  z-[99999] relative">
          <DropdownMenuLabel className="p-2 text-md">
            Personal
            {' '}
            <span className="font-bold text-indigo-600 underline">{user?.name}</span>
            {' '}
            account
          </DropdownMenuLabel>
          <div className="p-2">
            <span className="text-[14px] text-indigo-600 font-bold">{user?.email}</span>
          </div>
          <DropdownMenuSeparator />
          <Link href="/files">
            <DropdownMenuItem className="cursor-pointer p-2 text-md gap-x-2">
              <File size="20" />
              Files
            </DropdownMenuItem>
          </Link>
          {isAdmin ? (
            <DropdownMenuItem onClick={handleDropDownMenu} className="cursor-pointer p-2 text-md gap-x-2">
              <Users2Icon size="20" />
              <span>Add members to</span>
              {' '}
              <span className="font-bold text-indigo-600 underline">{organizationDetails.orgName}</span>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem className="cursor-pointer p-2 text-md gap-x-2">
            <SettingsIcon size="20" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <HeaderLogout />
        </DropdownMenuContent>
      </DropdownMenu>
      <Bell className="cursor-pointer" />
      <HeaderIsAdminAddMembers organizationId={organizationId as Id<'organizations'>} setSheetOpen={setSheetOpen} sheetOpen={sheetOpen} />
    </div>
  );
};

export default UserHeader;
