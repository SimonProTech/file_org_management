import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HeaderIsAdminAddMembersProps {
  sheetOpen: boolean;
  setSheetOpen: (x: boolean) => void
}

const HeaderIsAdminAddMembers: FC<HeaderIsAdminAddMembersProps> = ({ setSheetOpen, sheetOpen }) => (
  <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Add members to your organization</SheetTitle>
        <SheetDescription>
          Add some of your members here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" value="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Email
          </Label>
          <Input id="name" value="@email" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Role
          </Label>
          <Select>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent className="col-span-4">
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="apple">Admin</SelectItem>
                <SelectItem value="banana">User</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export default HeaderIsAdminAddMembers;
