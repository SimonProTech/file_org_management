import React, { ReactNode } from 'react';

const SettingsLayout = ({ children }: {children: ReactNode}) => (
  <div className="pt-32 p-12">
    {children}
  </div>
);

export default SettingsLayout;
