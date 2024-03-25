import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SelectItem } from '@/components/ui/select';
import { useQuery } from 'convex/react';
import randomColorPick from '@/lib/randomColorPick';
import { Loader2 } from 'lucide-react';
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
        <Avatar>
          <AvatarImage width={30} height={30} src={imageUrl!} alt={`${orgName.slice(0, 2)}...`} />
          <AvatarFallback className={`${randomColorPick()} text-white`}>{orgName.slice(0, 2)}</AvatarFallback>
        </Avatar>
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
