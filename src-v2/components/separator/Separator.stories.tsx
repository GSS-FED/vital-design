import { type Meta, type StoryObj } from '@storybook/react';
import { Separator } from './Separator';

type Story = StoryObj<typeof Separator>;

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-80">
      <Separator {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex h-16 items-stretch gap-4">
      <span className="text-sm text-grayscale-700">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-grayscale-700">Right</span>
    </div>
  ),
};

export const InList: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col">
      <span className="px-5 py-1.5 text-sm leading-5 text-grayscale-800">
        First row
      </span>
      <Separator />
      <span className="px-5 py-1.5 text-sm leading-5 text-grayscale-800">
        Second row
      </span>
    </div>
  ),
};
