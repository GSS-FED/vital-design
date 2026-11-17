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

export function DialogExample() {
  return (
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
  );
}
