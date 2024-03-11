import React, { FC } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Bell } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface BellIconWithNotificationComponentProps {
  userEmail: string;
  userId: string;
}

const BellIconWithNotificationComponent:
    FC<BellIconWithNotificationComponentProps> = ({ userId, userEmail }) => {
      const getUserAddedToOrganization = useQuery(api.user.getUserAddedToOrganization, {
        userId,
        userEmail,
      } || 'skip');

      console.log(getUserAddedToOrganization);

      return (
        <Drawer activeSnapPoint={50} direction="bottom">
          <DrawerTrigger className="relative flex items-center">
            {/* {getUserAddedToOrganization && getUserAddedToOrganization.length > 0 ? ( */}
            {/*  <> */}
            {/*    <span className="animate-ping bg-gray-700 absolute inline-flex right-0 w-3 -top-1 h-3 rounded-full opacity-75" /> */}
            {/*    <span className="absolute right-0 -top-1 inline-flex rounded-full h-3 w-3 bg-indigo-600" /> */}
            {/*  </> */}
            {/* ) : null} */}
            <Bell className="cursor-pointer" />
          </DrawerTrigger>
          <DrawerContent className="p-5">
            <DrawerHeader className="px-0">
              <DrawerTitle className="text-indigo-600 text-2xl">Notifications</DrawerTitle>
            </DrawerHeader>
            <div className="pb-10">
              <p className="mb-2">1</p>
              <p>1</p>
            </div>
          </DrawerContent>
        </Drawer>
      );
    };
export default BellIconWithNotificationComponent;
