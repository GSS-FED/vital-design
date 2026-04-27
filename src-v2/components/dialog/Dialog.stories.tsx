import Button from '@/components/button/Button';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import type { ComponentProps } from 'react';
import Dialog from './Dialog';

type Story = StoryObj<typeof Dialog>;
type DialogSize = NonNullable<
  ComponentProps<typeof Dialog.Popup>['size']
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
        <Dialog.Trigger render={<Button>Open Dialog</Button>} />
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Viewport>
            <Dialog.Popup>
              <Dialog.Header>
                <div className="space-y-1">
                  <Dialog.Title>Delete project?</Dialog.Title>
                  <Dialog.Description>
                    This action cannot be undone. The project and all
                    related records will be permanently removed.
                  </Dialog.Description>
                </div>
                <Dialog.Close />
              </Dialog.Header>
              <Dialog.Body>
                Make sure every teammate has exported anything they
                need before continuing.
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
                  render={<Button theme="alarm">Delete</Button>}
                />
              </Dialog.Footer>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog>
    );
  },
};

function SizeDialog({ size }: { size: DialogSize }) {
  return (
    <Dialog>
      <Dialog.Trigger
        render={<Button className="capitalize">{size}</Button>}
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
              Dialog popup width is controlled by the size prop.
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
