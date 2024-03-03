import React, { FC } from 'react';
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
  File, SettingsIcon, UserIcon,
} from 'lucide-react';
import HeaderLogout from '@/app/components/HeaderLogout';
import HeaderOrganization from '@/app/components/HeaderOrganization';
import { Session } from 'next-auth';
import Link from 'next/link';

const UserHeader: FC<Pick<Session, 'user'>> = ({ user }) => (
  <div className="flex items-center gap-x-4">
    <HeaderOrganization role={user?.role as string} />
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
        <DropdownMenuItem className="cursor-pointer hover:bg-indigo-500 hover:text-white p-2 text-md gap-x-2">
          <UserIcon size="20" />
          Profile
        </DropdownMenuItem>
        <Link href="/files">
          <DropdownMenuItem className="cursor-pointer p-2 text-md gap-x-2">
            <File size="20" />
            Files
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer p-2 text-md gap-x-2">
          <SettingsIcon size="20" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <HeaderLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default UserHeader;
