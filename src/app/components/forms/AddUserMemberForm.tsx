import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

enum Roles {
  admin = 'admin',
  user = 'user',
}

const addMemberSchema = z.object({
  name: z.string().min(3, 'Name cannot be shorter than 3 characters'),
  email: z.string().email('Email must be a valid email address - xxx@example.com'),
  role: z.enum(['admin', 'user']).default('user'),
});

const AddUserMemberForm = () => {
  const form = useForm<z.infer<typeof addMemberSchema>>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
    },
  });

  const onSubmit = async (values: z.infer<typeof addMemberSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>@Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role / Permissions</FormLabel>
                <FormControl>
                  <Select defaultValue={Roles.user} onValueChange={(role) => field.onChange(role)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="col-span-4">
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value={Roles.user}>User</SelectItem>
                        <SelectItem value={Roles.admin}>Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Add new member</Button>
      </form>
    </Form>

  );
};

export default AddUserMemberForm;
