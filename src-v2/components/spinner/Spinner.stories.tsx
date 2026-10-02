import { type Meta, type StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

type Story = StoryObj<typeof Spinner>;

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  args: {
    'aria-label': 'Loading',
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    return <Spinner {...args} />;
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex items-center gap-4">
        <Spinner className="size-3" />
        <Spinner className="size-4" />
        <Spinner className="size-6" />
      </div>
    );
  },
};

export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex items-center gap-4">
        <Spinner className="text-primary-500" />
        <Spinner className="text-success-500" />
        <Spinner className="text-destructive-500" />
        <Spinner className="text-grayscale-opacity-500" />
      </div>
    );
  },
};
