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
  File, SettingsIcon, Users2Icon,
} from 'lucide-react';
import HeaderLogout from '@/app/components/HeaderLogout';
import HeaderOrganization from '@/app/components/HeaderOrganization';
import { Session } from 'next-auth';
import Link from 'next/link';
import useOrganization from '@/app/store/useOrg';
import { useQuery } from 'convex/react';
import HeaderIsAdminAddMembers from '@/app/components/HeaderIsAdminAddMembers';
import BellIconWithNotificationComponent from '@/app/components/BellIconWithNotificationComponent';
import useUser from '@/app/store/useUser';
import { Roles } from '@/app/types/types';
import { usePathname } from 'next/navigation';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

const UserHeader: FC<Pick<Session, 'user'>> = ({ user }) => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const { organizationId } = useOrganization();
  const organizationDetails = useQuery(api.organization.getOrganization, { orgId: organizationId } || 'skip');
  const { role } = useUser();
  const path = usePathname();
  const handleDropDownMenu = () => {
    setSheetOpen(true);
  };

  return (
    <div className="flex items-center gap-x-4">
      {path !== '/' ? (
        <HeaderOrganization
          adminName={user.name as string}
          image={user.image as string}
          id={user.id}
        />
      ) : null}
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
        <DropdownMenuContent className="w-96 z-[9999999999999] relative">
          {organizationId === user.id ? (
            <DropdownMenuLabel className="p-2 text-md">
              Personal
              {' '}
              <span className="font-bold text-indigo-600 underline">{user?.name}</span>
              {' '}
              account
            </DropdownMenuLabel>
          ) : (
            <DropdownMenuLabel className="p-2 text-md">
              Business account -
              {' '}
              <span className="font-bold cursor-default text-indigo-600 underline">{organizationDetails?.orgName}</span>
            </DropdownMenuLabel>
          )}
          {!organizationDetails ? (
            <div className="p-2">
              <span className="text-[14px] text-indigo-600 font-bold">{user?.email}</span>
            </div>
          ) : null}
          <DropdownMenuSeparator />
          <Link href="/files">
            <DropdownMenuItem className={`${path === '/files' && 'active-path'} cursor-pointer p-2 text-md gap-x-2`}>
              <File size="20" />
              Files
            </DropdownMenuItem>
          </Link>
          {path !== '/' && role === Roles.admin ? (
            <DropdownMenuItem onClick={handleDropDownMenu} className="cursor-pointer p-2 text-md gap-x-2">
              <Users2Icon size="20" />
              <span>Add members to</span>
              {' '}
              <span className="font-bold text-indigo-600 underline">{organizationDetails?.orgName}</span>
            </DropdownMenuItem>
          ) : null}
          {(path !== '/' && !path.includes('/settings')) && role !== Roles.personal ? (
            <Link href={`/settings/${organizationId}`}>
              <DropdownMenuItem className="cursor-pointer p-2 text-md gap-x-2">
                <SettingsIcon size="20" />
                Settings
              </DropdownMenuItem>
            </Link>
          ) : null}
          <DropdownMenuSeparator />
          <HeaderLogout />
        </DropdownMenuContent>
      </DropdownMenu>
      <BellIconWithNotificationComponent
        userGoogleId={user.id as Id<'user'>}
        userImage={user.image as string}
        userEmail={user.email as string}
      />
      <HeaderIsAdminAddMembers organizationId={organizationId as Id<'organizations'>} setSheetOpen={setSheetOpen} sheetOpen={sheetOpen} />
    </div>
  );
};

export default UserHeader;
