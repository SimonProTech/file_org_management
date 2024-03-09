'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  DownloadIcon, Eye, MoreVertical, Trash2Icon, Undo2Icon,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutation } from 'convex/react';
import { toast } from '@/components/ui/use-toast';
import { Doc } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';

const FilesAction = ({ file, imageUrl, favorite }: {file: Doc<'files'>, imageUrl: string, favorite: boolean}) => {
  const permDelete = useMutation(api.files.permDelete);
  const restoreFileFromDb = useMutation(api.files.restoreFile);
  const [open, setOpen] = useState<boolean>(false);

  const openView = () => {
    window.open(imageUrl, '_blank');
  };

  const restoreFile = async () => {
    try {
      await restoreFileFromDb({
        id: file._id,
        fileId: file.fileId,
        orgId: file.orgId,
      });
      toast({
        variant: 'success',
        description: 'File was restored successfully',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        description: 'There was an error restoring the file, please try again later',
      });
    }
  };

  const fileDeleteFunction = async () => {
    try {
      await permDelete({
        id: file._id,
        fileId: file.fileId,
      });
      toast({
        variant: 'success',
        description: 'File was moved to delete folder.',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        description: 'Delete file failed, please try again.',
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          {!file.shouldBeDeleted ? (
            <DropdownMenuItem className="gap-x-2 font-medium mb-2 cursor-pointer">
              <Eye className="text-indigo-600" />
              View
            </DropdownMenuItem>
          ) : null}
          {!file.shouldBeDeleted ? (
            <DropdownMenuItem onClick={openView} className="gap-x-2 font-medium mb-2 cursor-pointer">
              <DownloadIcon className="text-green-600" />
              Download
            </DropdownMenuItem>
          ) : null}
          {file.shouldBeDeleted && (
            <DropdownMenuItem
              onClick={() => {
                restoreFile();
              }}
              className="gap-x-2 font-medium cursor-pointer"
            >
              <Undo2Icon className="text-green-500" />
              Restore
            </DropdownMenuItem>
          )}
          {!favorite ? (
            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
              }}
              className="gap-x-2 font-medium cursor-pointer"
            >
              <Trash2Icon className="text-red-500" />
              Delete
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to
              {' '}
              delete
              {' '}
              <strong className="underline text-red-600">{file.fileName}</strong>
              {' '}
              ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black">
              {file.shouldBeDeleted ? <span>This action will delete the file permanently!</span> : (
                <span>
                  This action will mark the file for our deletion process. Files are
                  deleted periodically
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={fileDeleteFunction}
              className="bg-red-600 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>

  );
};
export default FilesAction;
