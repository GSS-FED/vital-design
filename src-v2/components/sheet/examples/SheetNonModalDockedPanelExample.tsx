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

export function SheetNonModalDockedPanelExample() {
  return (
    <Sheet modal={false}>
      <SheetTrigger render={<Button>Open docked panel</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Docked panel</SheetTitle>
          <SheetDescription>
            The page stays interactive and is not dimmed while this
            sheet is open.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          Use a non-modal Sheet for filters, inspectors, or side
          panels that should coexist with the main content.
        </SheetBody>
        <SheetFooter>
          <SheetClose
            render={
              <Button variant="text" theme="default">
                Close
              </Button>
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
