import React from 'react';
import SettingsHeader from '@/app/components/settings/SettingsHeader';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';

const Page = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/');
  }
  return (
    <div>
      <SettingsHeader title="(Personal account)" />
    </div>
  );
};
export default Page;
