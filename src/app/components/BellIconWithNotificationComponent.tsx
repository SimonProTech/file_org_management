'use client';

import React, { FC, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Bell } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

interface BellIconWithNotificationComponentProps {
  userEmail: string;
  userGoogleId: Id<'user'>;
  userImage: string;
}

const BellIconWithNotificationComponent:
    FC<BellIconWithNotificationComponentProps> = ({ userEmail, userImage, userGoogleId }) => {
      const [openDrawer, setOpenDrawer] = useState(false);
      const getUserAddedToOrganization = useQuery(api.user.getUserAddedToOrganization, {
        userEmail,
      });

      const joinOrganization = useMutation(api.user.joinOrganization);

      const joinOrg = async (id: Id<'user'>) => {
        try {
          await joinOrganization({
            userId: id,
            id: userGoogleId,
            userImage,
          });

          setOpenDrawer(false);

          toast({
            variant: 'success',
            description: 'You joined the organization',
          });
        } catch (err) {
          console.log(err);
          toast({
            variant: 'destructive',
            description: 'Error while joining the organization',
          });
        }
      };

      return (
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer} activeSnapPoint={50} direction="bottom">
          <DrawerTrigger className="relative flex items-center">
            {getUserAddedToOrganization && getUserAddedToOrganization.length > 0 ? (
              <>
                <span className="animate-ping bg-gray-700 absolute inline-flex right-0 w-3 -top-1 h-3 rounded-full opacity-75" />
                <span className="absolute right-0 -top-1 inline-flex rounded-full h-3 w-3 bg-indigo-600" />
              </>
            ) : null}
            <Bell className="cursor-pointer" />
          </DrawerTrigger>
          <DrawerContent className="p-5">
            <DrawerHeader className="px-0">
              <DrawerTitle className="text-indigo-600 text-2xl">Notifications</DrawerTitle>
            </DrawerHeader>
            <div className="pb-10">
              {getUserAddedToOrganization?.map((user) => (
                <div className="flex gap-x-2 items-center">
                  <p>
                    You have been invited to the
                    {' '}
                    <span className="font-bold text-indigo-600">{user?.organization?.orgName}</span>
                    {' '}
                    organization by
                    {' '}
                    <span className="font-bold underline">{user?.organization?.adminName}</span>
                  </p>
                  <Button onClick={() => joinOrg(user._id)} className="bg-orange-500 hover:bg-orange-600">Join now</Button>
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      );
    };
export default BellIconWithNotificationComponent;
