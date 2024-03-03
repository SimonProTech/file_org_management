'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
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
import { api } from '../../../../convex/_generated/api';

const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  orgImage: z.instanceof(FileList)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
  orgName: z.string().min(3, {
    message: 'Organization name is too short',
  }).max(50, {
    message: 'Organization name is too long',
  }),
});

const CreateOrganizationForm = ({ setOpenDialog }: {setOpenDialog: (x: boolean) => void}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgImage: undefined,
      orgName: '',
    },
  });
  const fileRef = form.register('orgImage');
  const createOrg = useMutation(api.organization.createOrg);
  const generateUploadUrl = useMutation(api.organization.generateUploadUrl);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': values.orgImage[0].type },
        body: values.orgImage[0],
      });
      const { storageId } = await result.json();

      await createOrg({
        orgName: values.orgName,
        fileId: storageId,
      });

      form.reset();

      setOpenDialog(false);

      toast({
        variant: 'success',
        title: 'Organization success',
        description: 'Organization created successfully',
      });
    } catch (error) {
      toast({
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
        <Button disabled={form.formState.isLoading} type="submit">
          {form.formState.isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default CreateOrganizationForm;