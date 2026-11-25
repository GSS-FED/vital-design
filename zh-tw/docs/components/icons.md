# Icons

> Vittal Design 元件共用的內建 SVG 圖示集。

## 圖庫

所有圖示都是 inline SVG，並繼承 `currentColor`，所以會跟著容器的文字顏色。

```tsx
import { AngleDownIcon } from '@/components/icons/AngleDownIcon';
import { AngleDownSolidIcon } from '@/components/icons/AngleDownSolidIcon';
import { AngleLeftIcon } from '@/components/icons/AngleLeftIcon';
import { AngleLeftSolidIcon } from '@/components/icons/AngleLeftSolidIcon';
import { AngleLeftToLineIcon } from '@/components/icons/AngleLeftToLineIcon';
import { AngleRightIcon } from '@/components/icons/AngleRightIcon';
import { AngleRightSolidIcon } from '@/components/icons/AngleRightSolidIcon';
import { AngleRightToLineIcon } from '@/components/icons/AngleRightToLineIcon';
import { AngleUpIcon } from '@/components/icons/AngleUpIcon';
import { AngleUpSolidIcon } from '@/components/icons/AngleUpSolidIcon';
import { AnglesLeftIcon } from '@/components/icons/AnglesLeftIcon';
import { AnglesRightIcon } from '@/components/icons/AnglesRightIcon';
import { ArrowRightLongIcon } from '@/components/icons/ArrowRightLongIcon';
import { ArrowUpRightFromSquareIcon } from '@/components/icons/ArrowUpRightFromSquareIcon';
import { ArrowUpRightFromSquareSolidIcon } from '@/components/icons/ArrowUpRightFromSquareSolidIcon';
import { BanIcon } from '@/components/icons/BanIcon';
import { BarsIcon } from '@/components/icons/BarsIcon';
import { BellIcon } from '@/components/icons/BellIcon';
import { BellSlashIcon } from '@/components/icons/BellSlashIcon';
import { CalendarDaysIcon } from '@/components/icons/CalendarDaysIcon';
import { CaretDownSolidIcon } from '@/components/icons/CaretDownSolidIcon';
import { CaretLeftSolidIcon } from '@/components/icons/CaretLeftSolidIcon';
import { CaretRightSolidIcon } from '@/components/icons/CaretRightSolidIcon';
import { CaretUpSolidIcon } from '@/components/icons/CaretUpSolidIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { CheckSolidIcon } from '@/components/icons/CheckSolidIcon';
import { CircleCheckIcon } from '@/components/icons/CircleCheckIcon';
import { CircleCheckSolidIcon } from '@/components/icons/CircleCheckSolidIcon';
import { CircleDashedIcon } from '@/components/icons/CircleDashedIcon';
import { CircleDotIcon } from '@/components/icons/CircleDotIcon';
import { CircleExclamationSolidIcon } from '@/components/icons/CircleExclamationSolidIcon';
import { CircleInfoIcon } from '@/components/icons/CircleInfoIcon';
import { CircleInfoSolidIcon } from '@/components/icons/CircleInfoSolidIcon';
import { CircleMinusSolidIcon } from '@/components/icons/CircleMinusSolidIcon';
import { CircleQuestionIcon } from '@/components/icons/CircleQuestionIcon';
import { CircleUserIcon } from '@/components/icons/CircleUserIcon';
import { CircleXmarkIcon } from '@/components/icons/CircleXmarkIcon';
import { CircleXmarkSolidIcon } from '@/components/icons/CircleXmarkSolidIcon';
import { ClearIcon } from '@/components/icons/ClearIcon';
import { ClockIcon } from '@/components/icons/ClockIcon';
import { ClockSolidIcon } from '@/components/icons/ClockSolidIcon';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { EllipsisVerticalIcon } from '@/components/icons/EllipsisVerticalIcon';
import { ExclamationSolidIcon } from '@/components/icons/ExclamationSolidIcon';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { EyeSlashIcon } from '@/components/icons/EyeSlashIcon';
import { FileArrowUpSolidIcon } from '@/components/icons/FileArrowUpSolidIcon';
import { FileLinesIcon } from '@/components/icons/FileLinesIcon';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { GearIcon } from '@/components/icons/GearIcon';
import { GripDotsVerticalIcon } from '@/components/icons/GripDotsVerticalIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { InboxIcon } from '@/components/icons/InboxIcon';
import { LifeRingIcon } from '@/components/icons/LifeRingIcon';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';
import { MinusIcon } from '@/components/icons/MinusIcon';
import { MinusSolidIcon } from '@/components/icons/MinusSolidIcon';
import { NoteIcon } from '@/components/icons/NoteIcon';
import { PanelLeftIcon } from '@/components/icons/PanelLeftIcon';
import { PlaceholderIcon } from '@/components/icons/PlaceholderIcon';
import { PlaceholderSolidIcon } from '@/components/icons/PlaceholderSolidIcon';
import { PlanetRingedIcon } from '@/components/icons/PlanetRingedIcon';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { ShieldCheckIcon } from '@/components/icons/ShieldCheckIcon';
import { SidebarIcon } from '@/components/icons/SidebarIcon';
import { SpinnerIcon } from '@/components/icons/SpinnerIcon';
import { SquareArrowOutUpRightIcon } from '@/components/icons/SquareArrowOutUpRightIcon';
import { ThumbtackIcon } from '@/components/icons/ThumbtackIcon';
import { ThumbtackSolidIcon } from '@/components/icons/ThumbtackSolidIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { XmarkIcon } from '@/components/icons/XmarkIcon';
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
```

## 用法

每個圖示從自己的檔案引入。元件源碼不允許 barrel import（`@/icons`），registry 的使用者就只會帶入實際用到的圖示。

```tsx
import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';

<MagnifyingGlassIcon className="size-4 text-grayscale-opacity-700" />;
```

可用的圖示：

```ts
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
```

## Regular 與 Solid

圖示跟著 Figma 圖庫分成兩種粗細。Regular 沒有後綴，線寬 1.3。Solid 名稱以 `Solid` 結尾，線寬 1.75 或是填色形狀，例如 `AngleLeftIcon` 與 `AngleLeftSolidIcon`。依照 Figma 設計標的名稱（`Icons/Regular/…` 或 `Icons/Solid/…`）挑選，不要改用 `strokeWidth` 把 Regular 加粗。

## 尺寸

用 Tailwind 的 `size-*` utility 控制尺寸。每個圖示 SVG 會填滿 width / height 設定的容器。

```tsx
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';

export function IconsSizesExample() {
  return (
    <div className="flex items-end gap-4 text-grayscale-opacity-800">
      <MagnifyingGlassIcon className="size-3" />
      <MagnifyingGlassIcon className="size-4" />
      <MagnifyingGlassIcon className="size-5" />
      <MagnifyingGlassIcon className="size-6" />
      <MagnifyingGlassIcon className="size-8" />
    </div>
  );
}
```

## 顏色

圖示繼承 `currentColor`，任何 Tailwind 文字顏色 utility 都適用。

```tsx
import { FlagIcon } from '@/components/icons/FlagIcon';

export function IconsColorsExample() {
  return (
    <div className="flex items-center gap-4">
      <FlagIcon className="size-5 text-primary-500" />
      <FlagIcon className="size-5 text-success-500" />
      <FlagIcon className="size-5 text-warning-500" />
      <FlagIcon className="size-5 text-destructive-500" />
      <FlagIcon className="size-5 text-grayscale-opacity-700" />
    </div>
  );
}
```

## SpinnerIcon

`SpinnerIcon` 渲染靜態圖形。需要旋轉時加上 Tailwind 的 `animate-spin`，或用 `Spinner` 做載入狀態。

```tsx
import { SpinnerIcon } from '@/components/icons/SpinnerIcon';

export function IconsSpinnerExample() {
  return (
    <div className="flex items-center gap-4">
      <SpinnerIcon className="size-6 animate-spin text-primary-500" />
      <SpinnerIcon className="size-6 text-grayscale-opacity-500" />
    </div>
  );
}
```

## 屬性

所有圖示都接受標準 SVG 屬性。尺寸與顏色通常用 Tailwind class 控制。

| Prop          | Type                    | Default | 說明             |
| ------------- | ----------------------- | ------- | -------------- |
| `className`   | `string`                | —       | 額外的 CSS class  |
| `width`       | `number \| string`      | `'1em'` | SVG 寬度         |
| `height`      | `number \| string`      | `'1em'` | SVG 高度         |
| `aria-hidden` | `boolean`               | `true`  | 對輔助技術隱藏裝飾用圖示   |
| `...props`    | `ComponentProps<'svg'>` | —       | 原生 `svg` 屬性與事件 |
