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
import { CheckSolidIcon } from './CheckSolidIcon';
import { ChevronDownIcon } from './ChevronDownIcon';
import { ChevronDownSolidIcon } from './ChevronDownSolidIcon';
import { ChevronUpIcon } from './ChevronUpIcon';
import { ChevronUpSolidIcon } from './ChevronUpSolidIcon';
import { CircleUserIcon } from './CircleUserIcon';
import { ClearIcon } from './ClearIcon';
import { ClockIcon } from './ClockIcon';
import { CloseIcon } from './CloseIcon';
import { DisabledIcon } from './DisabledIcon';
import { EllipsisIcon } from './EllipsisIcon';
import { EyeIcon } from './EyeIcon';
import { EyeSlashIcon } from './EyeSlashIcon';
import { FlagIcon } from './FlagIcon';
import { GearIcon } from './GearIcon';
import { HomeIcon } from './HomeIcon';
import { InboxIcon } from './InboxIcon';
import { InfoIcon } from './InfoIcon';
import { LifeRingIcon } from './LifeRingIcon';
import { MinusIcon } from './MinusIcon';
import { MinusSolidIcon } from './MinusSolidIcon';
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
  { name: 'CheckSolidIcon', Icon: CheckSolidIcon },
  { name: 'ChevronDownIcon', Icon: ChevronDownIcon },
  { name: 'ChevronDownSolidIcon', Icon: ChevronDownSolidIcon },
  { name: 'ChevronUpIcon', Icon: ChevronUpIcon },
  { name: 'ChevronUpSolidIcon', Icon: ChevronUpSolidIcon },
  { name: 'CircleUserIcon', Icon: CircleUserIcon },
  { name: 'ClearIcon', Icon: ClearIcon },
  { name: 'ClockIcon', Icon: ClockIcon },
  { name: 'CloseIcon', Icon: CloseIcon },
  { name: 'DisabledIcon', Icon: DisabledIcon },
  { name: 'EllipsisIcon', Icon: EllipsisIcon },
  { name: 'EyeIcon', Icon: EyeIcon },
  { name: 'EyeSlashIcon', Icon: EyeSlashIcon },
  { name: 'FlagIcon', Icon: FlagIcon },
  { name: 'GearIcon', Icon: GearIcon },
  { name: 'HomeIcon', Icon: HomeIcon },
  { name: 'InboxIcon', Icon: InboxIcon },
  { name: 'InfoIcon', Icon: InfoIcon },
  { name: 'LifeRingIcon', Icon: LifeRingIcon },
  { name: 'MinusIcon', Icon: MinusIcon },
  { name: 'MinusSolidIcon', Icon: MinusSolidIcon },
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
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-3">
        {icons.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-grayscale-opacity-200 bg-white px-2 py-4 text-grayscale-opacity-800"
          >
            <Icon className="size-6" />
            {/* One line so the name copies cleanly. text-fit shrinks long names to
                fit (Chromium 150+). Chromium skips shrinks under ~2.5%, so the
                label may spill a few px into the tile padding there. Other
                browsers truncate with an ellipsis; title shows the full name. */}
            <span
              title={name}
              className="max-w-full truncate font-mono text-[11px] text-grayscale-opacity-600 [text-fit:shrink] supports-[text-fit:shrink]:overflow-visible"
            >
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
