import React, { FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import AddUserMemberForm from '@/app/components/forms/AddUserMemberForm';

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
      <AddUserMemberForm />
    </SheetContent>
  </Sheet>
);

export default HeaderIsAdminAddMembers;
