'use client';

import React, { FC } from 'react';
import useOrganization from '@/app/store/useOrg';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { Cog } from 'lucide-react';
import { api } from '../../../../convex/_generated/api';

interface SettingsHeaderProps {
    title?: string;
}

const SettingsHeader: FC<SettingsHeaderProps> = ({ title }) => {
  const { organizationId } = useOrganization();
  const router = useParams<{id: string}>();

  const getOrganization = useQuery(api.organization.getOrganization, {
    orgId: router.id || organizationId,
  });

  return (
    <div className="flex md:flex-row flex-col gap-x-2 items-center">
      <Cog className="hover:rotate-45 transition-all md:mb-0 mb-5 sm:w-14 sm:h-15 w-12 h-12" />
      <h1 className="text-black font-asap text-5xl">
        Settings
      </h1>
      <span className="text-black font-asap md:rotate-0 rotate-90 text-5xl">
        {' '}
        -
      </span>
      <span className="text-black font-asap underline decoration-wavy font-bold text-3xl sm:text-5xl">
        {getOrganization ? `${getOrganization.orgName}` : title }
      </span>
    </div>
  );
};

export default SettingsHeader;
