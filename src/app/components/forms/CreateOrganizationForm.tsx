'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl, FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { ConvexError } from 'convex/values';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { api } from '../../../../convex/_generated/api';

const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
];

const formSchema = z.object({
  defaultImage: z.boolean().default(true).optional(),
  orgImage:
    z
      .custom<FileList>((val) => val instanceof FileList, 'File is required')
      .refine(
        (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.',
      ).optional(),
  orgName: z.string().min(3, {
    message: 'Organization name is too short',
  }).max(50, {
    message: 'Organization name is too long',
  }),
}).refine((data) => data.defaultImage || !data.orgImage, {
  message: 'Yes',
});

const CreateOrganizationForm = ({ setOpenDialog, id, adminName }: {setOpenDialog: (x: boolean) => void, id: string, adminName: string}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgImage: undefined,
      orgName: '',
      defaultImage: true,
    },
  });
  const fileRef = form.register('orgImage');
  const createOrg = useMutation(api.organization.createOrg);
  const generateUploadUrl = useMutation(api.organization.generateUploadUrl);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const postUrl = await generateUploadUrl();
      let storageId;
      if (!values.orgImage) {
        storageId = process.env.NEXT_PUBLIC_DEFAULT_IMAGE;
      } else {
        const result = await fetch(postUrl, {
          method: 'POST',
          headers: { 'Content-Type': values.orgImage[0].type },
          body: values.orgImage[0],
        });
        storageId = await result.json();
      }

      await createOrg({
        orgName: values.orgName,
        fileId: storageId,
        adminId: id,
        adminName,
      });

      form.reset();

      setOpenDialog(false);

      return toast({
        variant: 'success',
        title: 'Organization success',
        description: 'Organization created successfully',
      });
    } catch (error) {
      if (error instanceof ConvexError) {
        return toast({
          variant: 'destructive',
          title: 'Organization error',
          description: error.data,
        });
      }
      return toast({
        variant: 'destructive',
        title: 'Organization error',
        description: 'Organization failed, please try again later.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="orgName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization name</FormLabel>
              <FormControl>
                <Input placeholder="Organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getFieldState('defaultImage').isDirty ? (
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
        ) : null}
        <FormField
          control={form.control}
          name="defaultImage"
          render={({ field }) => (
            <FormItem className="flex flex-row relative items-start space-x-3 space-y-0 rounded-md border p-4">
              <Badge
                className={`sm:absolute sm:block hidden
                ${form.getFieldState('defaultImage').isDirty ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'text-black'}
              right-5 top-5 h-max cursor-default`}
                variant="secondary"
              >
                {form.getFieldState('defaultImage').isDirty ? 'Optional' : 'Great ❤️'}
              </Badge>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Use default image for this organization.
                </FormLabel>
                <FormDescription>
                  You can change it later in the setting page.
                </FormDescription>
              </div>
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
  );
};
export default CreateOrganizationForm;
