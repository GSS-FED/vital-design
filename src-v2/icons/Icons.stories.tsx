import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType, SVGProps } from 'react';
import { AngleDownIcon } from './AngleDownIcon';
import { AngleDownSolidIcon } from './AngleDownSolidIcon';
import { AngleLeftIcon } from './AngleLeftIcon';
import { AngleLeftSolidIcon } from './AngleLeftSolidIcon';
import { AngleLeftToLineIcon } from './AngleLeftToLineIcon';
import { AngleRightIcon } from './AngleRightIcon';
import { AngleRightSolidIcon } from './AngleRightSolidIcon';
import { AngleRightToLineIcon } from './AngleRightToLineIcon';
import { AngleUpIcon } from './AngleUpIcon';
import { AngleUpSolidIcon } from './AngleUpSolidIcon';
import { AnglesLeftIcon } from './AnglesLeftIcon';
import { AnglesRightIcon } from './AnglesRightIcon';
import { BanIcon } from './BanIcon';
import { BarsIcon } from './BarsIcon';
import { BellIcon } from './BellIcon';
import { BellSlashIcon } from './BellSlashIcon';
import { CalendarDaysIcon } from './CalendarDaysIcon';
import { CaretDownSolidIcon } from './CaretDownSolidIcon';
import { CaretLeftSolidIcon } from './CaretLeftSolidIcon';
import { CaretRightSolidIcon } from './CaretRightSolidIcon';
import { CaretUpSolidIcon } from './CaretUpSolidIcon';
import { CheckIcon } from './CheckIcon';
import { CheckSolidIcon } from './CheckSolidIcon';
import { CircleUserIcon } from './CircleUserIcon';
import { ClearIcon } from './ClearIcon';
import { ClockIcon } from './ClockIcon';
import { EllipsisIcon } from './EllipsisIcon';
import { EyeIcon } from './EyeIcon';
import { EyeSlashIcon } from './EyeSlashIcon';
import { FlagIcon } from './FlagIcon';
import { GearIcon } from './GearIcon';
import { HomeIcon } from './HomeIcon';
import { InboxIcon } from './InboxIcon';
import { InfoIcon } from './InfoIcon';
import { LifeRingIcon } from './LifeRingIcon';
import { MagnifyingGlassIcon } from './MagnifyingGlassIcon';
import { MinusIcon } from './MinusIcon';
import { MinusSolidIcon } from './MinusSolidIcon';
import { NoteIcon } from './NoteIcon';
import { PanelLeftIcon } from './PanelLeftIcon';
import { PlaceholderIcon } from './PlaceholderIcon';
import { PlaceholderSolidIcon } from './PlaceholderSolidIcon';
import { PlanetRingedIcon } from './PlanetRingedIcon';
import { PlusIcon } from './PlusIcon';
import { ShieldCheckIcon } from './ShieldCheckIcon';
import { SidebarIcon } from './SidebarIcon';
import { SpinnerIcon } from './SpinnerIcon';
import { SquareArrowOutUpRightIcon } from './SquareArrowOutUpRightIcon';
import { ThumbtackIcon } from './ThumbtackIcon';
import { ThumbtackSolidIcon } from './ThumbtackSolidIcon';
import { UserIcon } from './UserIcon';
import { XmarkIcon } from './XmarkIcon';

type IconEntry = {
  name: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const icons: IconEntry[] = [
  { name: 'AngleDownIcon', Icon: AngleDownIcon },
  { name: 'AngleDownSolidIcon', Icon: AngleDownSolidIcon },
  { name: 'AngleLeftIcon', Icon: AngleLeftIcon },
  { name: 'AngleLeftSolidIcon', Icon: AngleLeftSolidIcon },
  { name: 'AngleLeftToLineIcon', Icon: AngleLeftToLineIcon },
  { name: 'AngleRightIcon', Icon: AngleRightIcon },
  { name: 'AngleRightSolidIcon', Icon: AngleRightSolidIcon },
  { name: 'AngleRightToLineIcon', Icon: AngleRightToLineIcon },
  { name: 'AngleUpIcon', Icon: AngleUpIcon },
  { name: 'AngleUpSolidIcon', Icon: AngleUpSolidIcon },
  { name: 'AnglesLeftIcon', Icon: AnglesLeftIcon },
  { name: 'AnglesRightIcon', Icon: AnglesRightIcon },
  { name: 'BanIcon', Icon: BanIcon },
  { name: 'BarsIcon', Icon: BarsIcon },
  { name: 'BellIcon', Icon: BellIcon },
  { name: 'BellSlashIcon', Icon: BellSlashIcon },
  { name: 'CalendarDaysIcon', Icon: CalendarDaysIcon },
  { name: 'CaretDownSolidIcon', Icon: CaretDownSolidIcon },
  { name: 'CaretUpSolidIcon', Icon: CaretUpSolidIcon },
  { name: 'CaretLeftSolidIcon', Icon: CaretLeftSolidIcon },
  { name: 'CaretRightSolidIcon', Icon: CaretRightSolidIcon },
  { name: 'CheckIcon', Icon: CheckIcon },
  { name: 'CheckSolidIcon', Icon: CheckSolidIcon },
  { name: 'CircleUserIcon', Icon: CircleUserIcon },
  { name: 'ClearIcon', Icon: ClearIcon },
  { name: 'ClockIcon', Icon: ClockIcon },
  { name: 'EllipsisIcon', Icon: EllipsisIcon },
  { name: 'EyeIcon', Icon: EyeIcon },
  { name: 'EyeSlashIcon', Icon: EyeSlashIcon },
  { name: 'FlagIcon', Icon: FlagIcon },
  { name: 'GearIcon', Icon: GearIcon },
  { name: 'HomeIcon', Icon: HomeIcon },
  { name: 'InboxIcon', Icon: InboxIcon },
  { name: 'InfoIcon', Icon: InfoIcon },
  { name: 'LifeRingIcon', Icon: LifeRingIcon },
  { name: 'MagnifyingGlassIcon', Icon: MagnifyingGlassIcon },
  { name: 'MinusIcon', Icon: MinusIcon },
  { name: 'MinusSolidIcon', Icon: MinusSolidIcon },
  { name: 'NoteIcon', Icon: NoteIcon },
  { name: 'PanelLeftIcon', Icon: PanelLeftIcon },
  { name: 'PlaceholderIcon', Icon: PlaceholderIcon },
  { name: 'PlaceholderSolidIcon', Icon: PlaceholderSolidIcon },
  { name: 'PlanetRingedIcon', Icon: PlanetRingedIcon },
  { name: 'PlusIcon', Icon: PlusIcon },
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
  { name: 'XmarkIcon', Icon: XmarkIcon },
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
        <MagnifyingGlassIcon className="size-3" />
        <MagnifyingGlassIcon className="size-4" />
        <MagnifyingGlassIcon className="size-5" />
        <MagnifyingGlassIcon className="size-6" />
        <MagnifyingGlassIcon className="size-8" />
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
