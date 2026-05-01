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
        <DialogTrigger render={<Button>Open Dialog</Button>} />
        <DialogPortal>
          <DialogBackdrop />
          <DialogViewport>
            <DialogPopup>
              <DialogHeader>
                <div className="space-y-1">
                  <DialogTitle>Delete project?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. The project and all
                    related records will be permanently removed.
                  </DialogDescription>
                </div>
                <DialogClose />
              </DialogHeader>
              <DialogBody>
                Make sure every teammate has exported anything they
                need before continuing.
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
                  render={<Button theme="alarm">Delete</Button>}
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
