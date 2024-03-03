import Controllers from '@/app/components/common/Controllers';
import React from 'react';

export default function FilesRootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className="pt-32 mx-auto w-full p-12">
      <div className="flex gap-x-10">
        <Controllers />
        {children}
      </div>
    </div>
  );
}
