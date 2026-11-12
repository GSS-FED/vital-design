import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType, SVGProps } from 'react';
import { AngleLeftIcon } from './AngleLeftIcon';
import { AngleLeftSolidIcon } from './AngleLeftSolidIcon';
import { AngleLeftToLineSolidIcon } from './AngleLeftToLineSolidIcon';
import { AngleRightIcon } from './AngleRightIcon';
import { AngleRightSolidIcon } from './AngleRightSolidIcon';
import { AngleRightToLineSolidIcon } from './AngleRightToLineSolidIcon';
import { AnglesLeftIcon } from './AnglesLeftIcon';
import { AnglesRightIcon } from './AnglesRightIcon';
import { BarsIcon } from './BarsIcon';
import { BellIcon } from './BellIcon';
import { CalendarIcon } from './CalendarIcon';
import { CaretDownIcon } from './CaretDownIcon';
import { CaretUpIcon } from './CaretUpIcon';
import { CheckIcon } from './CheckIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { ChevronUpIcon } from './ChevronUpIcon';
import { CircleUserIcon } from './CircleUserIcon';
import { ClearIcon } from './ClearIcon';
import { ClockIcon } from './ClockIcon';
import { CloseIcon } from './CloseIcon';
import { DisabledIcon } from './DisabledIcon';
import { EllipsisIcon } from './EllipsisIcon';
import { EyeIcon } from './EyeIcon';
import { EyeSlashIcon } from './EyeSlashIcon';
import { FlagIcon } from './FlagIcon';
import { HomeIcon } from './HomeIcon';
import { InboxIcon } from './InboxIcon';
import { InfoIcon } from './InfoIcon';
import { LifeRingIcon } from './LifeRingIcon';
import { MinusIcon } from './MinusIcon';
import { PanelLeftIcon } from './PanelLeftIcon';
import { PlanetRingedIcon } from './PlanetRingedIcon';
import { PlusIcon } from './PlusIcon';
import { SearchIcon } from './SearchIcon';
import { ShieldCheckIcon } from './ShieldCheckIcon';
import { SidebarIcon } from './SidebarIcon';
import { SpinnerIcon } from './SpinnerIcon';
import { SquareArrowOutUpRightIcon } from './SquareArrowOutUpRightIcon';
import { ThumbtackIcon } from './ThumbtackIcon';
import { ThumbtackSolidIcon } from './ThumbtackSolidIcon';
import { UserIcon } from './UserIcon';

type IconEntry = {
  name: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const icons: IconEntry[] = [
  { name: 'AngleLeftIcon', Icon: AngleLeftIcon },
  { name: 'AngleLeftSolidIcon', Icon: AngleLeftSolidIcon },
  {
    name: 'AngleLeftToLineSolidIcon',
    Icon: AngleLeftToLineSolidIcon,
  },
  { name: 'AngleRightIcon', Icon: AngleRightIcon },
  { name: 'AngleRightSolidIcon', Icon: AngleRightSolidIcon },
  {
    name: 'AngleRightToLineSolidIcon',
    Icon: AngleRightToLineSolidIcon,
  },
  { name: 'AnglesLeftIcon', Icon: AnglesLeftIcon },
  { name: 'AnglesRightIcon', Icon: AnglesRightIcon },
  { name: 'BarsIcon', Icon: BarsIcon },
  { name: 'BellIcon', Icon: BellIcon },
  { name: 'CalendarIcon', Icon: CalendarIcon },
  { name: 'CaretDownIcon', Icon: CaretDownIcon },
  { name: 'CaretUpIcon', Icon: CaretUpIcon },
  { name: 'CheckIcon', Icon: CheckIcon },
  { name: 'ChevronDownIcon', Icon: ChevronDownIcon },
  { name: 'ChevronUpIcon', Icon: ChevronUpIcon },
  { name: 'CircleUserIcon', Icon: CircleUserIcon },
  { name: 'ClearIcon', Icon: ClearIcon },
  { name: 'ClockIcon', Icon: ClockIcon },
  { name: 'CloseIcon', Icon: CloseIcon },
  { name: 'DisabledIcon', Icon: DisabledIcon },
  { name: 'EllipsisIcon', Icon: EllipsisIcon },
  { name: 'EyeIcon', Icon: EyeIcon },
  { name: 'EyeSlashIcon', Icon: EyeSlashIcon },
  { name: 'FlagIcon', Icon: FlagIcon },
  { name: 'HomeIcon', Icon: HomeIcon },
  { name: 'InboxIcon', Icon: InboxIcon },
  { name: 'InfoIcon', Icon: InfoIcon },
  { name: 'LifeRingIcon', Icon: LifeRingIcon },
  { name: 'MinusIcon', Icon: MinusIcon },
  { name: 'PanelLeftIcon', Icon: PanelLeftIcon },
  { name: 'PlanetRingedIcon', Icon: PlanetRingedIcon },
  { name: 'PlusIcon', Icon: PlusIcon },
  { name: 'SearchIcon', Icon: SearchIcon },
  { name: 'ShieldCheckIcon', Icon: ShieldCheckIcon },
  { name: 'SidebarIcon', Icon: SidebarIcon },
  { name: 'SpinnerIcon', Icon: SpinnerIcon },
  {
    name: 'SquareArrowOutUpRightIcon',
    Icon: SquareArrowOutUpRightIcon,
  },
  { name: 'ThumbtackIcon', Icon: ThumbtackIcon },
  { name: 'ThumbtackSolidIcon', Icon: ThumbtackSolidIcon },
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
