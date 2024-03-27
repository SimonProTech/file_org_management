import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SelectItem } from '@/components/ui/select';
import { useQuery } from 'convex/react';
import randomColorPick from '@/lib/randomColorPick';
import { Loader2 } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

const HeaderAvatar = ({ fileId, orgName, id }: {fileId: Id<'_storage'>, orgName: string, id: Id<'organizations'>}) => {
  const imageUrl = useQuery(api.files.getFileUrl, {
    storageId: fileId,
  });

  return (
    <div key={id} className="flex items-center mt-2">
      {imageUrl === undefined ? (
        <Loader2 size={50} className="animate-spin" />
      ) : (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar>
              <AvatarImage width={30} height={30} src={imageUrl!} alt={`${orgName.slice(0, 2)}...`} />
              <AvatarFallback className={`${randomColorPick()} text-white`}>{orgName.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent side="right" className="w-max">
            <div className="flex justify-between space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage width={40} height={40} src={imageUrl as string} />
                <AvatarFallback>{orgName.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
      <SelectItem
        value={id}
      >
        {orgName}
      </SelectItem>
    </div>
  );
};
export default HeaderAvatar;
