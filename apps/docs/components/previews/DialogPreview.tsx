'use client';

import { Button } from '@/components/button/Button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from '@/components/dialog/Dialog';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const sizes = ['small', 'medium', 'large'] as const;

export function DialogPreview() {
  return (
    <ComponentPreview name="DialogPreview">
      <Dialog>
        <DialogTrigger render={<Button>Open dialog</Button>} />
        <DialogPortal>
          <DialogBackdrop />
          <DialogViewport>
            <DialogPopup>
              <DialogHeader>
                <div className="space-y-1">
                  <DialogTitle>Submit request?</DialogTitle>
                  <DialogDescription>
                    Review the details before sending this request for
                    approval.
                  </DialogDescription>
                </div>
                <DialogClose />
              </DialogHeader>
              <DialogBody>
                This action will notify approvers and lock the current
                draft while it is being reviewed.
              </DialogBody>
              <DialogFooter>
                <DialogClose
                  render={
                    <Button variant="text" theme="default">
                      Cancel
                    </Button>
                  }
                />
                <DialogClose
                  render={<Button theme="primary">Submit</Button>}
                />
              </DialogFooter>
            </DialogPopup>
          </DialogViewport>
        </DialogPortal>
      </Dialog>
    </ComponentPreview>
  );
}

export function DialogSizesPreview() {
  return (
    <ComponentPreview name="DialogSizesPreview">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger
            render={
              <Button variant="text" theme="default">
                {size}
              </Button>
            }
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
                  Use the popup size prop to match the density and
                  amount of content in the dialog.
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
    </ComponentPreview>
  );
}
