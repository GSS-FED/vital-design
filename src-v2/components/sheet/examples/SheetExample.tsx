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

export function SheetExample() {
  return (
    <Sheet>
      <SheetTrigger render={<Button>Open Sheet</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you are
            done.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="space-y-3 py-2">
            <p>
              Sheet body content — drop forms, lists, or any custom
              layout here.
            </p>
            <p>
              It scrolls independently from the header and footer.
            </p>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose
            render={
              <Button variant="text" theme="default">
                Cancel
              </Button>
            }
          />
          <SheetClose render={<Button>Save</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
