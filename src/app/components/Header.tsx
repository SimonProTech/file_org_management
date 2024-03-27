import React from 'react';
import Link from 'next/link';
import HeaderButtonsComponent from '@/app/components/HeaderButtonsComponent';
import { getServerSession } from 'next-auth';
import UserHeader from '@/app/components/UserHeader';
import options from '@/app/api/auth/[...nextauth]/options';
import Image from 'next/image';

const Header = async () => {
  const session = await getServerSession(options);
  return (
    <div className="p-2 fixed left-1/2 max-w-lg w-full z-[999999999] -translate-x-1/2">
      <div className="flex bg-white border-indigo-600 border-2 mx-auto w rounded-3xl p-3">
        <div className="flex justify-between text-black w-full items-center">
          <Link className="flex gap-x-2 font-bold text-lg items-center" href="/">
            <Image width={140} height={100} src="/assets/logo.svg" alt="Logo" />
          </Link>
          {!session ? (
            <HeaderButtonsComponent />
          ) : (
            <UserHeader user={session.user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
