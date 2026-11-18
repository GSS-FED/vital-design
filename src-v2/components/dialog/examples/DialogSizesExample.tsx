'use client';

import { Button } from '@/components/button/Button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from '@/components/dialog/Dialog';

const sizes = ['small', 'medium', 'large'] as const;

export function DialogSizesExample() {
  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger
            render={<Button className="capitalize">{size}</Button>}
          />
          <DialogPortal>
            <DialogBackdrop />
            <DialogViewport>
              <DialogPopup size={size}>
                <DialogHeader>
                  <DialogTitle className="capitalize">
                    {size} dialog
                  </DialogTitle>
                  <DialogClose />
                </DialogHeader>
                <DialogBody>
                  Dialog popup width is controlled by the size prop.
                </DialogBody>
                <DialogFooter>
                  <DialogClose
                    render={
                      <Button variant="text" theme="default">
                        Close
                      </Button>
                    }
                  />
                </DialogFooter>
              </DialogPopup>
            </DialogViewport>
          </DialogPortal>
        </Dialog>
      ))}
    </div>
  );
}
