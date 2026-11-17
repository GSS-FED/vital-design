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

const sides = ['top', 'right', 'bottom', 'left'] as const;

export function SheetSidesExample() {
  return (
    <div className="flex flex-wrap gap-3">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger
            render={<Button className="capitalize">{side}</Button>}
          />
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="capitalize">
                {side} sheet
              </SheetTitle>
              <SheetDescription>
                Sheet position is controlled by the side prop.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              The sheet slides in from the {side} edge.
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
      ))}
    </div>
  );
}
