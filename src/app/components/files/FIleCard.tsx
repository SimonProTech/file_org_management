'use client';

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
  File, FileHeart, FileImage, FileSpreadsheet, FileTextIcon, GanttChartIcon, ImageIcon, Star,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatRelative } from 'date-fns';
import { useMutation } from 'convex/react';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import { ConvexError } from 'convex/values';
import { Doc } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';

const FIleCard = ({ file, favorite }: {file: Doc<'files'>; favorite: boolean}) => {
  const { data } = useSession();
  const imageUrl = getFileUrl(file.fileId);
  const addToFav = useMutation(api.favorite.addToFavorite);
  const unfavorite = useMutation(api.favorite.unfavorite);

  const fileType = {
    image: <FileImage />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
    xlsx: <FileSpreadsheet />,
    svg: <ImageIcon />,
    doc: <FileTextIcon />,
    default: <File />,
  } as Record<Doc<'files'>['type'], ReactNode>;

  const addToFavorite = async () => {
    if (favorite) return;

    try {
      await addToFav({ fileId: file.fileId, orgId: file.orgId, userId: data?.user.id as string });
      toast({
        variant: 'success',
        description: 'Product added successfully to favorites',
      });
    } catch (e) {
      if (e instanceof ConvexError) {
        toast({
          variant: 'destructive',
          description: e.data,
        });
        return;
      }
      toast({
        variant: 'destructive',
        description: 'There was an error while adding to favorites',
      });
    }
  };

  const markFileAsNotFavorite = async () => {
    await unfavorite({
      fileId: file.fileId,
      orgId: file.orgId,
    });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row mb-5">
        <CardTitle className="flex items-center gap-x-2">
          <div>{fileType[file.type]}</div>
          {file.fileName}
        </CardTitle>
        <div className="flex items-center gap-x-2">
          {favorite ? (
            <Star onClick={markFileAsNotFavorite} className="text-yellow-400 fill-amber-500" />
          ) : (
            <Star onClick={addToFavorite} className="cursor-pointer " />
          )}
          <FilesAction favorite={favorite} imageUrl={imageUrl} file={file} />
        </div>
      </CardHeader>
      <CardContent className="flex min-h-[200px] relative justify-center items-center">
        {file.type === 'image' && (
        <Image
          alt={file.fileName}
          fill
          src={imageUrl}
          style={{ objectFit: 'contain' }}
        />
        )}
        {file.type === 'svg' && <FileHeart className="w-20 h-32" />}
        {file.type === 'pdf' && <FileTextIcon className="w-20 h-32" />}
        {(file.type === 'csv' || file.type === 'xlsx') && <FileTextIcon className="w-20 h-32" />}
      </CardContent>
      <CardFooter className="flex pt-5 justify-between">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6 relative">
            <AvatarImage src={file?.fileAuthorImage} />
            <AvatarFallback>{file?.fileAuthor.slice(0, 2)}</AvatarFallback>
          </Avatar>
          {file.fileAuthor}
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
