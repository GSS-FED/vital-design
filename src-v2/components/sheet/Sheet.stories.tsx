import { Button } from '@/components/button/Button';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import type { ComponentProps } from 'react';
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
} from './Sheet';

type Story = StoryObj<typeof Sheet>;
type SheetSide = NonNullable<
  ComponentProps<typeof SheetContent>['side']
>;

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  args: {
    modal: true,
    onOpenChange: fn(),
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    return (
      <Sheet {...args}>
        <SheetTrigger render={<Button>Open Sheet</Button>} />
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
    );
  },
};

function SideSheet({ side }: { side: SheetSide }) {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button className="capitalize">{side}</Button>}
      />
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle className="capitalize">{side} sheet</SheetTitle>
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
  );
}

export const Sides: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex flex-wrap gap-3">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <SideSheet key={side} side={side} />
        ))}
      </div>
    );
  },
};

export const NonModalDockedPanel: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
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
            Pass <code>modal={'{false}'}</code> on the Sheet root to
            drop the backdrop and unlock the page underneath.
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
  },
};

export const HiddenCloseButton: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <Sheet>
        <SheetTrigger
          render={<Button>Open without close button</Button>}
        />
        <SheetContent showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>No corner close</SheetTitle>
            <SheetDescription>
              Use the footer action to dismiss this sheet.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
            Useful for flows that require explicit confirmation.
          </SheetBody>
          <SheetFooter>
            <SheetClose render={<Button>Done</Button>} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};
