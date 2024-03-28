import React, { FC, Suspense } from 'react';
import { fetchQuery } from 'convex/nextjs';
import {
  Calendar, HomeIcon, LockKeyhole, Users,
} from 'lucide-react';
import { formatRelative } from 'date-fns';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';
import { Separator } from '@/components/ui/separator';
import AdminActionsOnSettings from '@/app/components/settings/AdminActionsOnSettings';
import { redirect } from 'next/navigation';
import LoadingSkeleton from '@/app/components/common/LoadingSkeleton';
import { api } from '../../../../convex/_generated/api';
import { Doc } from '../../../../convex/_generated/dataModel';

interface Params {
    params: {
        id: string;
    }
}

const Page: FC<Params> = async ({ params }) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/');
  }

  const organization = await fetchQuery(api.organization.getOrganization, {
    orgId: params.id,
  }) as Doc<'organizations'>;

  const allUsers = await fetchQuery(api.user.getAllUsersAddedToOrganization, {
    orgId: params.id,
  });

  return (
    <div className="flex flex-col relative">
      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="border-black border-2  text-black rounded-md p-3 flex items-center justify-between">
          <HomeIcon className="text-indigo-600" size={30} />
          <HoverCard>
            <HoverCardTrigger>
              <span className="font-bold cursor-pointer text-xl">
                {organization.orgName}
              </span>
            </HoverCardTrigger>
            <HoverCardContent>
              Name of the organization.
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="border-black border-2 text-black rounded-md p-3 flex items-center justify-between">
          <LockKeyhole className="text-indigo-600" size={30} />
          <HoverCard>
            <HoverCardTrigger>
              <span className="font-bold cursor-pointer text-xl">
                {organization.adminName}
              </span>
            </HoverCardTrigger>
            <HoverCardContent>
              Information about the administrator of the organization.
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="border-2 border-black text-black rounded-md p-3 flex items-center justify-between">
          <Calendar className="text-indigo-600" size={30} />
          <HoverCard>
            <HoverCardTrigger>
              <span className="font-bold cursor-pointer text-xl">
                {formatRelative(new Date(organization._creationTime), new Date())}
              </span>
            </HoverCardTrigger>
            <HoverCardContent>
              Information about date when organization was created.
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="border-2 border-black text-black rounded-md p-3 flex items-center justify-between">
          <Users className="text-indigo-600" size={30} />
          <HoverCard>
            <HoverCardTrigger>
              <span className="font-bold cursor-pointer text-xl">
                {allUsers.length}
              </span>
            </HoverCardTrigger>
            <HoverCardContent>
              Information about how many users are in the organization.
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <Separator className="my-10" />
      {organization.adminId === session?.user.id ? (
        <Suspense fallback={<LoadingSkeleton className="odd:col-start-1" />}>
          <AdminActionsOnSettings
            allUsers={allUsers}
            organizationId={organization._id}
            fileId={organization.fileId}
            sessionId={session?.user.id as string}
            name={organization.orgName}
          />
        </Suspense>
      ) : null}
    </div>
  );
};

export default Page;
