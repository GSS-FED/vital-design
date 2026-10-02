import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType, SVGProps } from 'react';
import { BellIcon } from './BellIcon';
import { CheckIcon } from './CheckIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { ChevronLeftIcon } from './ChevronLeftIcon';
import { ChevronRightIcon } from './ChevronRightIcon';
import { ChevronUpIcon } from './ChevronUpIcon';
import { ClearIcon } from './ClearIcon';
import { CloseIcon } from './CloseIcon';
import { DisabledIcon } from './DisabledIcon';
import { EyeIcon } from './EyeIcon';
import { EyeSlashIcon } from './EyeSlashIcon';
import { FlagIcon } from './FlagIcon';
import { InfoIcon } from './InfoIcon';
import { MinusIcon } from './MinusIcon';
import { PanelLeftIcon } from './PanelLeftIcon';
import { PlusIcon } from './PlusIcon';
import { SearchIcon } from './SearchIcon';
import { ShieldCheckIcon } from './ShieldCheckIcon';
import { SpinnerIcon } from './SpinnerIcon';
import { SquareArrowOutUpRightIcon } from './SquareArrowOutUpRightIcon';
import { UserIcon } from './UserIcon';

type IconEntry = {
  name: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const icons: IconEntry[] = [
  { name: 'BellIcon', Icon: BellIcon },
  { name: 'CheckIcon', Icon: CheckIcon },
  { name: 'ChevronDownIcon', Icon: ChevronDownIcon },
  { name: 'ChevronUpIcon', Icon: ChevronUpIcon },
  { name: 'ChevronLeftIcon', Icon: ChevronLeftIcon },
  { name: 'ChevronRightIcon', Icon: ChevronRightIcon },
  { name: 'ClearIcon', Icon: ClearIcon },
  { name: 'CloseIcon', Icon: CloseIcon },
  { name: 'DisabledIcon', Icon: DisabledIcon },
  { name: 'EyeIcon', Icon: EyeIcon },
  { name: 'EyeSlashIcon', Icon: EyeSlashIcon },
  { name: 'FlagIcon', Icon: FlagIcon },
  { name: 'InfoIcon', Icon: InfoIcon },
  { name: 'MinusIcon', Icon: MinusIcon },
  { name: 'PanelLeftIcon', Icon: PanelLeftIcon },
  { name: 'PlusIcon', Icon: PlusIcon },
  { name: 'SearchIcon', Icon: SearchIcon },
  { name: 'ShieldCheckIcon', Icon: ShieldCheckIcon },
  { name: 'SpinnerIcon', Icon: SpinnerIcon },
  {
    name: 'SquareArrowOutUpRightIcon',
    Icon: SquareArrowOutUpRightIcon,
  },
  { name: 'UserIcon', Icon: UserIcon },
];

const meta: Meta = {
  title: 'Icons/Gallery',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Gallery: Story = {
  render: function Render() {
    return (
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {icons.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center gap-2 rounded-md border border-grayscale-opacity-200 bg-white p-4 text-grayscale-opacity-800"
          >
            <Icon className="size-6" />
            <span className="font-mono text-xs text-grayscale-opacity-600">
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    return (
      <div className="flex items-end gap-4 text-grayscale-opacity-800">
        <SearchIcon className="size-3" />
        <SearchIcon className="size-4" />
        <SearchIcon className="size-5" />
        <SearchIcon className="size-6" />
        <SearchIcon className="size-8" />
      </div>
    );
  },
};

export const Colors: Story = {
  render: function Render() {
    return (
      <div className="flex items-center gap-4">
        <FlagIcon className="size-5 text-primary-500" />
        <FlagIcon className="size-5 text-success-500" />
        <FlagIcon className="size-5 text-warning-500" />
        <FlagIcon className="size-5 text-destructive-500" />
        <FlagIcon className="size-5 text-grayscale-opacity-700" />
      </div>
    );
  },
};

export const Spinner: Story = {
  render: function Render() {
    return (
      <div className="flex items-center gap-4">
        <SpinnerIcon className="size-6 animate-spin text-primary-500" />
        <SpinnerIcon className="size-6 text-grayscale-opacity-500" />
      </div>
    );
  },
};
