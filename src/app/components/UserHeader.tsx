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
  File, LogOut, SettingsIcon, UserIcon,
} from 'lucide-react';
import { User } from 'next-auth';
import HeaderLogout from '@/app/components/HeaderLogout';

const UserHeader: FC<Omit<User, 'id'>> = ({
  name, image, email,
}) => (
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          className="rounded hover:scale-105 transition-all border-white border-2"
          src={image as string}
          width={40}
          height={40}
          alt="google user icon"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96  z-[99999] relative">
        <DropdownMenuLabel className="p-2 text-md">
          Personal
          {' '}
          <span className="font-bold text-indigo-600 underline">{name}</span>
          {' '}
          account
        </DropdownMenuLabel>
        <div className="p-2">
          <span className="text-[14px] text-indigo-600 font-bold">{email}</span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer hover:bg-indigo-500 hover:text-white p-2 text-md gap-x-2">
          <UserIcon size="20" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer p-2 text-md gap-x-2">
          <File size="20" />
          Files
        </DropdownMenuItem>
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
