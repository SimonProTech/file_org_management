'use client';

import React, { FC } from 'react';
import useOrganization from '@/app/store/useOrg';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

interface SettingsHeaderProps {
    title?: string;
}

const SettingsHeader: FC<SettingsHeaderProps> = ({ title }) => {
  const { organizationId } = useOrganization();

  const getOrganization = useQuery(api.organization.getOrganization, {
    orgId: organizationId,
  });

  return (
    <h1 className="text-black font-bold text-5xl">
      Settings
      {' '}
      {getOrganization ? `- ${getOrganization.orgName}` : title }
    </h1>
  );
};

export default SettingsHeader;
