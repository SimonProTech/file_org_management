import React from 'react';
import Link from 'next/link';
import HeaderButtonsComponent from '@/app/components/HeaderButtonsComponent';
import { FileBadge } from 'lucide-react';
import { getServerSession } from 'next-auth';
import UserHeader from '@/app/components/UserHeader';

const Header = async () => {
  const session = await getServerSession();

  return (
    <div className="p-2 fixed left-1/2 max-w-lg w-full z-[99999] -translate-x-1/2">
      <div className="flex bg-white/90 border-white border-2 shadow-xl mx-auto w rounded-3xl p-3">
        <div className="flex justify-between text-black w-full items-center">
          <Link className="flex gap-x-2 font-bold text-lg items-center" href="/">
            <FileBadge />
            TeamFileOrg
          </Link>
          {!session ? (
            <HeaderButtonsComponent />
          ) : (
            <UserHeader
              email={session?.user?.email}
              image={session?.user?.image}
              name={session?.user?.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
