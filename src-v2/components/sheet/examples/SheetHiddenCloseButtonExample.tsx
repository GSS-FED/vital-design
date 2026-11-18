'use client';

import { Button } from '@/components/button/Button';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/sheet/Sheet';

export function SheetHiddenCloseButtonExample() {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button>Open without close button</Button>}
      />
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>No corner close</SheetTitle>
          <SheetDescription>
            Use the footer action to dismiss this sheet.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          Useful for flows that require explicit confirmation.
        </SheetBody>
        <SheetFooter>
          <SheetClose render={<Button>Done</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
