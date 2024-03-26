import React from 'react';
import useOrganization from '@/app/store/useOrg';
import { useSession } from 'next-auth/react';
import { useQuery } from 'convex/react';
import { v4 as uuid } from 'uuid';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useType from '@/app/store/useType';
import { api } from '../../../../convex/_generated/api';

const FilesTypes = () => {
  const { organizationId } = useOrganization();
  const user = useSession();
  const filesType = useQuery(api.files.filesType, { orgId: organizationId || user.data?.user.id as string });
  const setType = useType((state) => state.setType);

  return (
    <div className="w-full">
      <Select onValueChange={setType}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Select a file type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>File types</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            {filesType?.map((type) => (
              <SelectItem key={uuid()} value={type}>{type}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>
  );
};

export default FilesTypes;
