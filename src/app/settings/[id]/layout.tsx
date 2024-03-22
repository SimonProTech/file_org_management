import React, { ReactNode } from 'react';
import SettingsHeader from '@/app/components/settings/SettingsHeader';

const Layout = ({ children }: {
    children: ReactNode
}) => (
  <>
    <SettingsHeader />
    {children}
  </>
);

export default Layout;
