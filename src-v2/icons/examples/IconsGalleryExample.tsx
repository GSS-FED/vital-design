'use client';

import { AngleDownIcon } from '@/icons/AngleDownIcon';
import { AngleDownSolidIcon } from '@/icons/AngleDownSolidIcon';
import { AngleLeftIcon } from '@/icons/AngleLeftIcon';
import { AngleLeftSolidIcon } from '@/icons/AngleLeftSolidIcon';
import { AngleLeftToLineIcon } from '@/icons/AngleLeftToLineIcon';
import { AngleRightIcon } from '@/icons/AngleRightIcon';
import { AngleRightSolidIcon } from '@/icons/AngleRightSolidIcon';
import { AngleRightToLineIcon } from '@/icons/AngleRightToLineIcon';
import { AngleUpIcon } from '@/icons/AngleUpIcon';
import { AngleUpSolidIcon } from '@/icons/AngleUpSolidIcon';
import { AnglesLeftIcon } from '@/icons/AnglesLeftIcon';
import { AnglesRightIcon } from '@/icons/AnglesRightIcon';
import { ArrowRightLongIcon } from '@/icons/ArrowRightLongIcon';
import { ArrowUpRightFromSquareIcon } from '@/icons/ArrowUpRightFromSquareIcon';
import { ArrowUpRightFromSquareSolidIcon } from '@/icons/ArrowUpRightFromSquareSolidIcon';
import { BanIcon } from '@/icons/BanIcon';
import { BarsIcon } from '@/icons/BarsIcon';
import { BellIcon } from '@/icons/BellIcon';
import { BellSlashIcon } from '@/icons/BellSlashIcon';
import { CalendarDaysIcon } from '@/icons/CalendarDaysIcon';
import { CaretDownSolidIcon } from '@/icons/CaretDownSolidIcon';
import { CaretLeftSolidIcon } from '@/icons/CaretLeftSolidIcon';
import { CaretRightSolidIcon } from '@/icons/CaretRightSolidIcon';
import { CaretUpSolidIcon } from '@/icons/CaretUpSolidIcon';
import { CheckIcon } from '@/icons/CheckIcon';
import { CheckSolidIcon } from '@/icons/CheckSolidIcon';
import { CircleCheckIcon } from '@/icons/CircleCheckIcon';
import { CircleCheckSolidIcon } from '@/icons/CircleCheckSolidIcon';
import { CircleDashedIcon } from '@/icons/CircleDashedIcon';
import { CircleDotIcon } from '@/icons/CircleDotIcon';
import { CircleExclamationSolidIcon } from '@/icons/CircleExclamationSolidIcon';
import { CircleInfoIcon } from '@/icons/CircleInfoIcon';
import { CircleInfoSolidIcon } from '@/icons/CircleInfoSolidIcon';
import { CircleMinusSolidIcon } from '@/icons/CircleMinusSolidIcon';
import { CircleQuestionIcon } from '@/icons/CircleQuestionIcon';
import { CircleUserIcon } from '@/icons/CircleUserIcon';
import { CircleXmarkIcon } from '@/icons/CircleXmarkIcon';
import { CircleXmarkSolidIcon } from '@/icons/CircleXmarkSolidIcon';
import { ClearIcon } from '@/icons/ClearIcon';
import { ClockIcon } from '@/icons/ClockIcon';
import { ClockSolidIcon } from '@/icons/ClockSolidIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { EllipsisVerticalIcon } from '@/icons/EllipsisVerticalIcon';
import { ExclamationSolidIcon } from '@/icons/ExclamationSolidIcon';
import { EyeIcon } from '@/icons/EyeIcon';
import { EyeSlashIcon } from '@/icons/EyeSlashIcon';
import { FileArrowUpSolidIcon } from '@/icons/FileArrowUpSolidIcon';
import { FileLinesIcon } from '@/icons/FileLinesIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { GearIcon } from '@/icons/GearIcon';
import { GripDotsVerticalIcon } from '@/icons/GripDotsVerticalIcon';
import { HomeIcon } from '@/icons/HomeIcon';
import { InboxIcon } from '@/icons/InboxIcon';
import { LifeRingIcon } from '@/icons/LifeRingIcon';
import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';
import { MinusIcon } from '@/icons/MinusIcon';
import { MinusSolidIcon } from '@/icons/MinusSolidIcon';
import { NoteIcon } from '@/icons/NoteIcon';
import { PanelLeftIcon } from '@/icons/PanelLeftIcon';
import { PlaceholderIcon } from '@/icons/PlaceholderIcon';
import { PlaceholderSolidIcon } from '@/icons/PlaceholderSolidIcon';
import { PlanetRingedIcon } from '@/icons/PlanetRingedIcon';
import { PlusIcon } from '@/icons/PlusIcon';
import { ShieldCheckIcon } from '@/icons/ShieldCheckIcon';
import { SidebarIcon } from '@/icons/SidebarIcon';
import { SpinnerIcon } from '@/icons/SpinnerIcon';
import { SquareArrowOutUpRightIcon } from '@/icons/SquareArrowOutUpRightIcon';
import { ThumbtackIcon } from '@/icons/ThumbtackIcon';
import { ThumbtackSolidIcon } from '@/icons/ThumbtackSolidIcon';
import { UserIcon } from '@/icons/UserIcon';
import { XmarkIcon } from '@/icons/XmarkIcon';
import type { ComponentType, SVGProps } from 'react';

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
  { name: 'ArrowRightLongIcon', Icon: ArrowRightLongIcon },
  {
    name: 'ArrowUpRightFromSquareIcon',
    Icon: ArrowUpRightFromSquareIcon,
  },
  {
    name: 'ArrowUpRightFromSquareSolidIcon',
    Icon: ArrowUpRightFromSquareSolidIcon,
  },
  { name: 'BanIcon', Icon: BanIcon },
  { name: 'BarsIcon', Icon: BarsIcon },
  { name: 'BellIcon', Icon: BellIcon },
  { name: 'BellSlashIcon', Icon: BellSlashIcon },
  { name: 'CalendarDaysIcon', Icon: CalendarDaysIcon },
  { name: 'CaretDownSolidIcon', Icon: CaretDownSolidIcon },
  { name: 'CaretLeftSolidIcon', Icon: CaretLeftSolidIcon },
  { name: 'CaretRightSolidIcon', Icon: CaretRightSolidIcon },
  { name: 'CaretUpSolidIcon', Icon: CaretUpSolidIcon },
  { name: 'CheckIcon', Icon: CheckIcon },
  { name: 'CheckSolidIcon', Icon: CheckSolidIcon },
  { name: 'CircleCheckIcon', Icon: CircleCheckIcon },
  { name: 'CircleCheckSolidIcon', Icon: CircleCheckSolidIcon },
  { name: 'CircleDashedIcon', Icon: CircleDashedIcon },
  { name: 'CircleDotIcon', Icon: CircleDotIcon },
  {
    name: 'CircleExclamationSolidIcon',
    Icon: CircleExclamationSolidIcon,
  },
  { name: 'CircleInfoIcon', Icon: CircleInfoIcon },
  { name: 'CircleInfoSolidIcon', Icon: CircleInfoSolidIcon },
  { name: 'CircleMinusSolidIcon', Icon: CircleMinusSolidIcon },
  { name: 'CircleQuestionIcon', Icon: CircleQuestionIcon },
  { name: 'CircleUserIcon', Icon: CircleUserIcon },
  { name: 'CircleXmarkIcon', Icon: CircleXmarkIcon },
  { name: 'CircleXmarkSolidIcon', Icon: CircleXmarkSolidIcon },
  { name: 'ClearIcon', Icon: ClearIcon },
  { name: 'ClockIcon', Icon: ClockIcon },
  { name: 'ClockSolidIcon', Icon: ClockSolidIcon },
  { name: 'EllipsisIcon', Icon: EllipsisIcon },
  { name: 'EllipsisVerticalIcon', Icon: EllipsisVerticalIcon },
  { name: 'ExclamationSolidIcon', Icon: ExclamationSolidIcon },
  { name: 'EyeIcon', Icon: EyeIcon },
  { name: 'EyeSlashIcon', Icon: EyeSlashIcon },
  { name: 'FileArrowUpSolidIcon', Icon: FileArrowUpSolidIcon },
  { name: 'FileLinesIcon', Icon: FileLinesIcon },
  { name: 'FlagIcon', Icon: FlagIcon },
  { name: 'GearIcon', Icon: GearIcon },
  { name: 'GripDotsVerticalIcon', Icon: GripDotsVerticalIcon },
  { name: 'HomeIcon', Icon: HomeIcon },
  { name: 'InboxIcon', Icon: InboxIcon },
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

export function IconsGalleryExample() {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-3">
      {icons.map(({ name, Icon }) => (
        <div
          key={name}
          className="flex min-w-0 flex-col items-center justify-center gap-2 rounded-md border border-grayscale-opacity-200 bg-background px-2 py-4 text-grayscale-opacity-800"
        >
          <Icon className="size-6" />
          {/* One line so the name copies cleanly. text-fit shrinks long
              names to fit (Chromium 150+). Chromium skips shrinks under
              ~2.5%, so the label may spill a few px into the tile padding
              there. Other browsers truncate with an ellipsis; title shows
              the full name. */}
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
}
