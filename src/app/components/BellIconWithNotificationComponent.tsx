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
import { toast } from '@/components/ui/use-toast';
import useOrganization from '@/app/store/useOrg';
import AddedToNewOrganizationNotification from '@/app/components/notifications/AddedToNewOrganizationNotification';
import NewFileNotification from '@/app/components/notifications/NewFileNotification';
import NotFoundNotification from '@/app/components/notifications/NotFoundNotification';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

interface BellIconWithNotificationComponentProps {
  userEmail: string;
  userGoogleId: Id<'user'>;
  userImage: string;
}

const BellIconWithNotificationComponent:
    FC<BellIconWithNotificationComponentProps> = ({ userEmail, userImage, userGoogleId }) => {
      const { organizationId } = useOrganization();
      const [openDrawer, setOpenDrawer] = useState(false);
      const getUserAddedToOrganization = useQuery(api.user.getUserAddedToOrganization, {
        userEmail,
      });

      const getNotifications = useQuery(api.notifications.getNotifications, {
        userId: userGoogleId,
        orgId: organizationId,
      });

      const joinOrganization = useMutation(api.user.joinOrganization);

      const joinOrg = async (id: Id<'user'>) => {
        try {
          await joinOrganization({
            objId: id,
            userImage,
            userId: userGoogleId,
          });

          setOpenDrawer(false);

          toast({
            variant: 'success',
            description: 'You joined the organization',
          });
        } catch (err) {
          toast({
            variant: 'destructive',
            description: 'Error while joining the organization',
          });
        }
      };

      const getNotificationsValidation = getNotifications
          && getNotifications
            .filter((x) => x.users.some((user) => user.wasRead === false)).length > 0;

      return (
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer} activeSnapPoint={50} direction="bottom">
          <DrawerTrigger className="relative flex items-center">
            {(getNotificationsValidation)
             || (getUserAddedToOrganization && getUserAddedToOrganization.length > 0) ? (
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
              {(getNotifications?.length === 0
                  && getUserAddedToOrganization?.length === 0) && <NotFoundNotification />}
              {getUserAddedToOrganization && getUserAddedToOrganization.length > 0 ? (
                getUserAddedToOrganization.map((user) => (
                  <AddedToNewOrganizationNotification
                    key={user._id}
                    joinOrg={() => joinOrg(user._id)}
                    adminName={user?.organization?.adminName as string}
                    orgName={user?.organization?.orgName as string}
                    _id={user._id}
                  />
                ))
              ) : null}
              {getNotifications && getNotifications.length > 0 ? (
                getNotifications.map((notification) => (
                  <NewFileNotification
                    key={notification._id}
                    _creationTime={notification._creationTime}
                    userId={userGoogleId}
                    users={notification.users}
                    id={notification._id}
                    message={notification.message}
                  />
                ))
              ) : null}
            </div>
          </DrawerContent>
        </Drawer>
      );
    };
export default BellIconWithNotificationComponent;
