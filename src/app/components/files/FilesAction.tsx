import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DownloadIcon, MoreVertical, Trash2Icon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Doc } from '../../../../convex/_generated/dataModel';

const FilesAction = ({ file }: {file: Doc<'files'>}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <DropdownMenuItem className="gap-x-2 font-medium mb-2 cursor-pointer">
            <DownloadIcon className="text-green-600" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setDeleteConfirmation(true);
            }}
            className="gap-x-2 font-medium cursor-pointer"
          >
            <Trash2Icon className="text-red-500" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={deleteConfirmation} onOpenChange={setDeleteConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to delete
              {' '}
              <strong className="underline text-red-600">{file.fileName}</strong>
              {' '}
              ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black">
              This action will mark the file for our deletion process. Files are
              deleted periodically
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>

  );
};
export default FilesAction;
