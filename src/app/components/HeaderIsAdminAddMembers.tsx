import React, { FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import AddUserMemberForm from '@/app/components/forms/AddUserMemberForm';
import { Id } from '../../../convex/_generated/dataModel';

interface HeaderIsAdminAddMembersProps {
  sheetOpen: boolean;
  setSheetOpen: (x: boolean) => void
  organizationId: Id<'organizations'>;
}

const HeaderIsAdminAddMembers:
    FC<HeaderIsAdminAddMembersProps> = ({ setSheetOpen, sheetOpen, organizationId }) => (
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add members to your organization</SheetTitle>
            <SheetDescription>
              Add some of your members here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <AddUserMemberForm organizationId={organizationId} />
        </SheetContent>
      </Sheet>
    );

export default HeaderIsAdminAddMembers;
