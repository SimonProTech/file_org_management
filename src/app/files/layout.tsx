import Controllers from '@/app/components/common/Controllers';
import React from 'react';

export default function FilesRootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className="md:pt-32 pt-32 mx-auto w-full p-2 md:p-12">
      <div className="flex lg:flex-row flex-col gap-x-10">
        <Controllers />
        {children}
      </div>
    </div>
  );
}
