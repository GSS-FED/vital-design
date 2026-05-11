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
import type { ComponentProps } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

type SheetSide = NonNullable<
  ComponentProps<typeof SheetContent>['side']
>;

const sides: readonly SheetSide[] = [
  'top',
  'right',
  'bottom',
  'left',
] as const;

export function SheetPreview() {
  return (
    <ComponentPreview>
      <Sheet>
        <SheetTrigger render={<Button>Open sheet</Button>} />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you
              are done.
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
    </ComponentPreview>
  );
}

export function SheetSidesPreview() {
  return (
    <ComponentPreview>
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
    </ComponentPreview>
  );
}

export function SheetNonModalPreview() {
  return (
    <ComponentPreview>
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
    </ComponentPreview>
  );
}
