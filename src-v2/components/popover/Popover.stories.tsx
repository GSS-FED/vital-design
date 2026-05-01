import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button>Open</Button>} />
      <PopoverContent className="w-72">
        <PopoverTitle>Popover title</PopoverTitle>
        <PopoverDescription className="mt-1">
          Popovers are floating panels that appear when triggered. Use
          them for short bits of information, action menus, or rich
          content overlays.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  ),
};

export const SidePlacement: Story = {
  render: () => (
    <div className="flex gap-4 p-12">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger
            render={<Button size="md">{side}</Button>}
          />
          <PopoverContent side={side} className="w-48">
            Anchored on the {side} side.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button>View profile</Button>} />
      <PopoverContent className="w-72">
        <PopoverTitle>Yuki Tanaka</PopoverTitle>
        <PopoverDescription className="mt-1">
          Senior Engineer · Tokyo
        </PopoverDescription>
        <p className="mt-3 text-sm text-grayscale-600">
          Joined the platform team in 2021. Owns the registry pipeline
          and the storybook deployment.
        </p>
      </PopoverContent>
    </Popover>
  ),
};
