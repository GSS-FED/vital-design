import { Button } from '@/components/button/Button';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './Collapsible';

type Story = StoryObj<typeof Collapsible>;

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  args: {
    defaultOpen: false,
    disabled: false,
    onOpenChange: fn(),
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    return (
      <Collapsible {...args} className="w-80 space-y-2">
        <CollapsibleTrigger
          render={
            <Button
              variant="text"
              theme="default"
              className="w-full [&[data-panel-open]_[data-icon]]:rotate-180"
            >
              <span className="flex-1 text-left">
                Can I use this in my project?
              </span>
              <ChevronDownIcon
                data-icon="inline-end"
                className="transition-transform duration-150"
              />
            </Button>
          }
        />
        <CollapsibleContent className="rounded-sm bg-grayscale-50 p-4 text-grayscale-700">
          Yes. Free to use for personal and commercial projects. No
          attribution required.
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const ProductDetails: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="w-96 space-y-4 rounded-sm border border-grayscale-200 p-4">
        <div>
          <div className="font-medium text-grayscale-900">
            Vital Design Hoodie
          </div>
          <div className="text-sm text-grayscale-600">$48</div>
        </div>
        <Collapsible className="space-y-2">
          <CollapsibleTrigger
            render={
              <Button
                variant="text"
                theme="default"
                size="md"
                className="w-full justify-between"
              >
                <span>Show details</span>
                <ChevronDownIcon data-icon="inline-end" />
              </Button>
            }
          />
          <CollapsibleContent className="space-y-1 text-grayscale-700">
            <p>100% cotton, double-stitched seams.</p>
            <p>Ships within 2 business days.</p>
            <p>Free returns within 30 days.</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};
