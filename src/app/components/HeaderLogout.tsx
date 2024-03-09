'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const HeaderLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer p-2 text-md gap-x-2">
      <LogOut size="20" />
      Logout
    </DropdownMenuItem>
  );
};

export default HeaderLogout;
