import React, { FC } from 'react';
import SettingsHeader from '@/app/components/settings/SettingsHeader';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

interface Params {
    params: {
        id: string;
    }
}

const Page: FC<Params> = async ({ params }) => (
  <div>
    <SettingsHeader />
  </div>
);

export default Page;
