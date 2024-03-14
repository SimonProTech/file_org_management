import { Badge } from '@/components/ui/badge';
import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { formatRelative } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface NewFileNotificationProps {
    message: string;
    id: Id<'notifications'>;
    userId: string;
    _creationTime: number;
    users: { id: string; wasRead: boolean; }[];
}

const NewFileNotification: FC<NewFileNotificationProps> = ({
  id, message, userId, _creationTime, users,
}) => {
  const markNotificationAsRode = useMutation(api.notifications.markNotificationAsRode);

  const markNotificationAsRodeAfterClick = async () => {
    try {
      await markNotificationAsRode({ notificationId: id, userId });
      toast({
        variant: 'success',
        description: 'Got it, thank you! ❤️',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        description: 'Error while marking notification as rode',
      });
    }
  };

  return (
    <div className="px-2 py-4 flex items-center justify-between relative mb-4 bg-gray-200 rounded-md">
      {users.map((item) => (
        !item.wasRead ? (
          <Badge key={uuid()} className="absolute bg-indigo-600 text-white -right-2 -top-2" variant="outline">New 🔥</Badge>
        ) : <Badge className="absolute bg-gray-500 text-white -right-2 -top-2" variant="outline">Older 😇</Badge>
      ))}
      <div className="flex items-center gap-x-4">
        <p>{message}</p>
        <small>
          (
          {formatRelative(new Date(_creationTime), new Date())}
          )
        </small>
      </div>
      <div className="pr-20">
        {users.map((item) => (
          !item.wasRead ? (
            <Button
              key={uuid()}
              onClick={markNotificationAsRodeAfterClick}
              className="h-8 hover:bg-orange-500 text-xs"
            >
              Got it!
            </Button>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default NewFileNotification;
