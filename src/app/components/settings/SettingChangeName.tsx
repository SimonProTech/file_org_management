'use client';

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

const formSchema = z.object({
  orgName: z.string().min(3, {
    message: 'Organization name must be at least 3 characters.',
  }),
});

interface SettingChangeNameProps {
    orgName: string;
    orgId: string;
    adminId: string
    setDialogOpen: (x: boolean) => void;
}

const SettingChangeName:
    FC<SettingChangeNameProps> = ({
      orgName, orgId, adminId, setDialogOpen,
    }) => {
      const changeOrganizationName = useMutation(api.organization.changeOrganizationName);
      const router = useRouter();
      const { toast } = useToast();
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          orgName: '',
        },
      });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          await changeOrganizationName({
            orgName: values.orgName,
            userId: adminId,
            organizationId: orgId as Id<'organizations'>,
          });
          form.reset();

          setDialogOpen(false);

          router.refresh();

          toast({
            variant: 'destructive',
            title: 'Organization name changed successfully',
          });
        } catch (err) {
          toast({
            variant: 'destructive',
            title: 'Organization name failed',
          });
        }
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-5">
            <FormField
              control={form.control}
              name="orgName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization name</FormLabel>
                  <FormControl>
                    <Input placeholder={`Current name: ${orgName}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
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

export default SettingChangeName;
