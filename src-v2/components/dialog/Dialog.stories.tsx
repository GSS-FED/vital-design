import { Button } from '@/components/button/Button';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import type { ComponentProps } from 'react';
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
} from './Dialog';

type Story = StoryObj<typeof Dialog>;
type DialogSize = NonNullable<
  ComponentProps<typeof DialogPopup>['size']
>;

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    modal: true,
    disablePointerDismissal: false,
    onOpenChange: fn(),
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    return (
      <Dialog {...args}>
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
  },
};

function SizeDialog({ size }: { size: DialogSize }) {
  return (
    <Dialog>
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
  );
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex flex-wrap gap-3">
        {(['small', 'medium', 'large'] as const).map((size) => (
          <SizeDialog key={size} size={size} />
        ))}
      </div>
    );
  },
};
