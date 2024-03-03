import React, { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import getFileUrl from '@/lib/getUrl';
import Image from 'next/image';
import FilesAction from '@/app/components/files/FilesAction';
import {
  File, FileTextIcon, GanttChartIcon, ImageIcon, Star,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatRelative } from 'date-fns';
import { Doc } from '../../../../convex/_generated/dataModel';

const FIleCard = ({ file }: {file: Doc<'files'>}) => {
  const imageUrl = getFileUrl(file.fileId);

  const fileType = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
    default: <File />,
  } as Record<Doc<'files'>['type'], ReactNode>;

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row mb-5">
        <CardTitle className="flex items-center gap-x-2">
          <div>{fileType[file.type]}</div>
          {file.fileName}
        </CardTitle>
        <div className="flex items-center gap-x-2">
          <Star className="cursor-pointer" />
          <FilesAction file={file} />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {file.type === 'image' && (
        <Image
          alt={file.fileName}
          width="200"
          height="100"
          src={imageUrl}
        />
        )}
        {file.type === 'pdf' && <FileTextIcon className="w-20 h-32" />}
        {file.type === 'csv' && <FileTextIcon className="w-20 h-32" />}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          simon
        </div>
        <div className="text-xs text-gray-700">
          Uploaded on
          {' '}
          {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FIleCard;
