'use client';

import { AngleLeftIcon } from '@/icons/AngleLeftIcon';
import { AngleLeftSolidIcon } from '@/icons/AngleLeftSolidIcon';
import { AngleLeftToLineSolidIcon } from '@/icons/AngleLeftToLineSolidIcon';
import { AngleRightIcon } from '@/icons/AngleRightIcon';
import { AngleRightSolidIcon } from '@/icons/AngleRightSolidIcon';
import { AngleRightToLineSolidIcon } from '@/icons/AngleRightToLineSolidIcon';
import { AnglesLeftIcon } from '@/icons/AnglesLeftIcon';
import { AnglesRightIcon } from '@/icons/AnglesRightIcon';
import { BarsIcon } from '@/icons/BarsIcon';
import { BellIcon } from '@/icons/BellIcon';
import { CalendarIcon } from '@/icons/CalendarIcon';
import { CaretDownIcon } from '@/icons/CaretDownIcon';
import { CaretUpIcon } from '@/icons/CaretUpIcon';
import { CheckIcon } from '@/icons/CheckIcon';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/icons/ChevronUpIcon';
import { CircleUserIcon } from '@/icons/CircleUserIcon';
import { ClearIcon } from '@/icons/ClearIcon';
import { ClockIcon } from '@/icons/ClockIcon';
import { CloseIcon } from '@/icons/CloseIcon';
import { DisabledIcon } from '@/icons/DisabledIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { EyeIcon } from '@/icons/EyeIcon';
import { EyeSlashIcon } from '@/icons/EyeSlashIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { HomeIcon } from '@/icons/HomeIcon';
import { InboxIcon } from '@/icons/InboxIcon';
import { InfoIcon } from '@/icons/InfoIcon';
import { LifeRingIcon } from '@/icons/LifeRingIcon';
import { MinusIcon } from '@/icons/MinusIcon';
import { PanelLeftIcon } from '@/icons/PanelLeftIcon';
import { PlanetRingedIcon } from '@/icons/PlanetRingedIcon';
import { PlusIcon } from '@/icons/PlusIcon';
import { SearchIcon } from '@/icons/SearchIcon';
import { ShieldCheckIcon } from '@/icons/ShieldCheckIcon';
import { SidebarIcon } from '@/icons/SidebarIcon';
import { SpinnerIcon } from '@/icons/SpinnerIcon';
import { SquareArrowOutUpRightIcon } from '@/icons/SquareArrowOutUpRightIcon';
import { ThumbtackIcon } from '@/icons/ThumbtackIcon';
import { ThumbtackSolidIcon } from '@/icons/ThumbtackSolidIcon';
import { UserIcon } from '@/icons/UserIcon';
import type { ComponentType, SVGProps } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

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

export function IconsGalleryPreview() {
  return (
    <ComponentPreview name="IconsGalleryPreview" centered={false}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
    </ComponentPreview>
  );
}

export function IconSizesPreview() {
  return (
    <ComponentPreview name="IconSizesPreview">
      <SearchIcon className="size-3" />
      <SearchIcon className="size-4" />
      <SearchIcon className="size-5" />
      <SearchIcon className="size-6" />
      <SearchIcon className="size-8" />
    </ComponentPreview>
  );
}

export function IconColorsPreview() {
  return (
    <ComponentPreview name="IconColorsPreview">
      <FlagIcon className="size-5 text-primary-500" />
      <FlagIcon className="size-5 text-success-500" />
      <FlagIcon className="size-5 text-warning-500" />
      <FlagIcon className="size-5 text-destructive-500" />
      <FlagIcon className="size-5 text-grayscale-opacity-700" />
    </ComponentPreview>
  );
}

export function IconSpinnerPreview() {
  return (
    <ComponentPreview name="IconSpinnerPreview">
      <SpinnerIcon className="size-6 animate-spin text-primary-500" />
      <SpinnerIcon className="size-6 text-grayscale-opacity-500" />
    </ComponentPreview>
  );
}
