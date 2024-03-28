'use client';

import React, { FC, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { ACCEPTED_IMAGE_MIME_TYPES } from '@/lib/acceptedFileType';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { AlertDialogCancel, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { useMutation } from 'convex/react';
import { ConvexError } from 'convex/values';
import { useRouter } from 'next/navigation';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface AdminUploadOrgImageUpdateProps {
    sessionId: string;
    organizationId: string;
}

const uploadOrgImageSchema = z.object({
  orgImage:
        z
          .custom<FileList>((val) => val instanceof FileList, 'File is required')
          .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            'Only .jpg, .jpeg, .png and .webp formats are supported.',
          ),
});
const AdminUploadOrgImageUpdate:
    FC<AdminUploadOrgImageUpdateProps> = ({ organizationId, sessionId }) => {
      const generateUploadUrl = useMutation(api.organization.generateUploadUrl);
      const router = useRouter();
      const [error, setError] = useState<string | null>(null);
      const [success, setSuccess] = useState<boolean>(false);
      const updateImageOrganization = useMutation(api.organization.updateImageOrganization);
      const form = useForm<z.infer<typeof uploadOrgImageSchema>>({
        resolver: zodResolver(uploadOrgImageSchema),
        defaultValues: {
          orgImage: undefined,
        },
      });
      const fileRef = form.register('orgImage');

      async function onSubmit(values: z.infer<typeof uploadOrgImageSchema>) {
        try {
          setSuccess(true);
          const postUrl = await generateUploadUrl();
          const result = await fetch(postUrl, {
            method: 'POST',
            headers: { 'Content-Type': values.orgImage[0].type },
            body: values.orgImage[0],
          });
          const { storageId } = await result.json();

          await updateImageOrganization({
            adminId: sessionId,
            organizationId: organizationId as Id<'organizations'>,
            fileId: storageId,
          });

          form.reset();
          setSuccess(false);
        } catch (err) {
          setSuccess(false);
          if (err instanceof ConvexError) {
            setError(err.data);
          }
          setError('Error while updating organization image');
        }
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="orgImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="orgImage">Organization image</FormLabel>
                  <FormControl>
                    <Input
                      {...fileRef}
                      type="file"
                      placeholder="Organization name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <small className="font-bold text-red-500">{error}</small>}
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || success}
                className={`flex gap-1 ${success ? 'bg-green-700' : ''}`}
              >
                {form.formState.isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {success ? 'Upload successfully' : 'Upload'}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      );
    };

export default AdminUploadOrgImageUpdate;
