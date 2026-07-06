import { type Meta, type StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

type Story = StoryObj<typeof Skeleton>;

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: {
    className: 'h-[20px] w-[100px] rounded-full',
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    return <Skeleton {...args} />;
  },
};

export const Avatar: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex w-80 items-center gap-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    );
  },
};

export const Card: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex w-80 flex-col gap-5 rounded-md border border-grayscale-opacity-300 p-5">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="aspect-square w-full" />
      </div>
    );
  },
};

export const Text: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex w-80 flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  },
};

export const Form: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex w-80 flex-col gap-7">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
    );
  },
};

export const Table: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex w-80 flex-col gap-2">
        {Array.from({ length: 3 }, (_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  },
};
