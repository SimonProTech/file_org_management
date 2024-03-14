'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import useOrganization from '@/app/store/useOrg';
import { useMutation, useQuery } from 'convex/react';
import { toast } from '@/components/ui/use-toast';
import getFileMimeType from '@/lib/getFileMimeType';
import { useSession } from 'next-auth/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

const uploadFileSchema = z.object({
  file: z
    .custom<FileList>((val) => val instanceof FileList, 'File is required')
    .refine((files) => files.length > 0, 'Required'),
  fileName:
      z.string().min(3, {
        message: 'File name is too short',
      }).max(50, {
        message: 'File name is too long',
      }),
});

const UploadFile = () => {
  const createFile = useMutation(api.files.createFile);
  const createNotification = useMutation(api.notifications.createNotification);
  const { organizationId } = useOrganization();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const session = useSession();

  const getAllUsersAddedToOrganization = useQuery(api.user.getAllUsersAddedToOrganization, {
    orgId: organizationId,
  });

  const form = useForm<z.infer<typeof uploadFileSchema>>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      file: undefined,
      fileName: '',
    },
  });

  const fileRef = form.register('file');

  async function onSubmit(values: z.infer<typeof uploadFileSchema>) {
    try {
      const postUrl = await generateUploadUrl();
      const users: {id: string, wasRead: boolean}[] = [];

      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': values.file[0].type },
        body: values.file[0],
      });
      const { storageId } = await result.json();

      const type = getFileMimeType(values.file[0]);

      await createFile({
        fileName: values.fileName,
        fileId: storageId,
        orgId: organizationId || session.data?.user.id as string,
        fileAuthor: session.data?.user.name as string,
        fileAuthorImage: session.data?.user.image as string,
        type,
      });

      getAllUsersAddedToOrganization?.forEach((user) => {
        users.push({
          wasRead: false,
          id: user.userId,
        });
      });

      if (organizationId && Number.isNaN(+organizationId)) {
        await createNotification({
          orgId: organizationId as Id<'organizations'>,
          users,
          message: 'Hey, someone has added a new file to organization you are part of.',
        });
      }

      form.reset();

      setOpenDialog(false);

      toast({
        variant: 'success',
        title: 'Uploaded file successfully',
        description: 'File was successfully uploaded',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uploaded file failed',
        description: 'File was failed while uploading',
      });
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="default">Upload file</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-5 text-2xl">Upload your file</DialogTitle>
          <DialogDescription>
            This file will be uploaded and accessible by anyone in your organization
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex gap-1"
              >
                {form.formState.isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UploadFile;
