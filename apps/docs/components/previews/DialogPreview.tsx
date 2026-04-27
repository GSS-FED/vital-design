'use client';

import { Button } from '@/components/button/Button';
import { Dialog } from '@/components/dialog/Dialog';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const sizes = ['small', 'medium', 'large'] as const;

export function DialogPreview() {
  return (
    <ComponentPreview>
      <Dialog>
        <Dialog.Trigger render={<Button>Open dialog</Button>} />
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Viewport>
            <Dialog.Popup>
              <Dialog.Header>
                <div className="space-y-1">
                  <Dialog.Title>Submit request?</Dialog.Title>
                  <Dialog.Description>
                    Review the details before sending this request for
                    approval.
                  </Dialog.Description>
                </div>
                <Dialog.Close />
              </Dialog.Header>
              <Dialog.Body>
                This action will notify approvers and lock the current
                draft while it is being reviewed.
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close
                  render={
                    <Button variant="text" theme="default">
                      Cancel
                    </Button>
                  }
                />
                <Dialog.Close
                  render={<Button theme="primary">Submit</Button>}
                />
              </Dialog.Footer>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog>
    </ComponentPreview>
  );
}

export function DialogSizesPreview() {
  return (
    <ComponentPreview>
      {sizes.map((size) => (
        <Dialog key={size}>
          <Dialog.Trigger
            render={
              <Button variant="text" theme="default">
                {size}
              </Button>
            }
          />
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Viewport>
              <Dialog.Popup size={size}>
                <Dialog.Header>
                  <Dialog.Title className="capitalize">
                    {size} dialog
                  </Dialog.Title>
                  <Dialog.Close />
                </Dialog.Header>
                <Dialog.Body>
                  Use the popup size prop to match the density and
                  amount of content in the dialog.
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Close
                    render={
                      <Button variant="text" theme="default">
                        Close
                      </Button>
                    }
                  />
                </Dialog.Footer>
              </Dialog.Popup>
            </Dialog.Viewport>
          </Dialog.Portal>
        </Dialog>
      ))}
    </ComponentPreview>
  );
}
