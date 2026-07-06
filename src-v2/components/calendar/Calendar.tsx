'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover/Popover';
import { ChevronDoubleLeftIcon } from '@/icons/ChevronDoubleLeftIcon';
import { ChevronDoubleRightIcon } from '@/icons/ChevronDoubleRightIcon';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import { cn } from '@/lib/utils';
import * as React from 'react';
import {
  type DayButtonProps,
  DayPicker,
  type DropdownProps,
  type NavProps,
  getDefaultClassNames,
  useDayPicker,
} from 'react-day-picker';

/* eslint-disable react/prop-types --
 * Calendar's parts are typed through react-day-picker's prop interfaces;
 * the react/prop-types rule can't follow the destructured props.
 */

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  components,
  ...rest
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-white p-3 [--cell-size:--spacing(9)] [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-4 md:flex-row',
          defaultClassNames.months,
        ),
        month: cn(
          'flex w-full flex-col gap-4',
          defaultClassNames.month,
        ),
        nav: cn(
          // `pointer-events-none` so the full-width absolute bar does not
          // block clicks on the centered caption/dropdowns beneath it; the
          // arrow groups re-enable pointer events on themselves.
          'pointer-events-none absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          'inline-flex size-(--cell-size) cursor-pointer items-center justify-center rounded p-0 text-grayscale-opacity-700 transition-colors duration-200 outline-none select-none',
          'hover:bg-grayscale-opacity-100',
          'aria-disabled:pointer-events-none aria-disabled:opacity-50',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          'inline-flex size-(--cell-size) cursor-pointer items-center justify-center rounded p-0 text-grayscale-opacity-700 transition-colors duration-200 outline-none select-none',
          'hover:bg-grayscale-opacity-100',
          'aria-disabled:pointer-events-none aria-disabled:opacity-50',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium',
          defaultClassNames.dropdowns,
        ),
        caption_label: cn(
          'text-sm font-medium text-grayscale-opacity-800 select-none',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 rounded text-xs font-normal text-grayscale-opacity-500 select-none',
          defaultClassNames.weekday,
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn(
          'w-(--cell-size) select-none',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-xs text-grayscale-opacity-500 select-none',
          defaultClassNames.week_number,
        ),
        day: cn(
          'group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]]:rounded-r-full',
          rest.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]]:rounded-l-full'
            : '[&:first-child[data-selected=true]]:rounded-l-full',
          defaultClassNames.day,
        ),
        range_start: cn(
          'rounded-l-full bg-primary-100',
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          'bg-primary-100',
          defaultClassNames.range_middle,
        ),
        range_end: cn(
          'rounded-r-full bg-primary-100',
          defaultClassNames.range_end,
        ),
        today: cn(defaultClassNames.today),
        outside: cn(
          'text-grayscale-opacity-400 aria-selected:text-grayscale-opacity-400',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-grayscale-opacity-400 opacity-50',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        MonthsDropdown: CalendarMonthsDropdown,
        Nav: CalendarNav,
        WeekNumber: CalendarWeekNumber,
        YearsDropdown: CalendarYearsDropdown,
        ...components,
      }}
      {...rest}
    />
  );
}

type CalendarRootComponentProps = React.ComponentProps<'div'> & {
  rootRef?: React.Ref<HTMLDivElement>;
};

function CalendarRoot(props: CalendarRootComponentProps) {
  const { className, rootRef, ...rest } = props;
  return (
    <div
      data-slot="calendar"
      ref={rootRef}
      className={cn(className)}
      {...rest}
    />
  );
}

function CalendarWeekNumber(props: React.ComponentProps<'td'>) {
  const { children, ...rest } = props;
  return (
    <td {...rest}>
      <div className="flex size-(--cell-size) items-center justify-center text-center">
        {children}
      </div>
    </td>
  );
}

type CalendarChevronProps = {
  className?: string;
  size?: number;
  disabled?: boolean;
  orientation?: 'up' | 'down' | 'left' | 'right';
};

function CalendarChevron(props: CalendarChevronProps) {
  const { className, orientation, ...rest } = props;
  if (orientation === 'left') {
    return (
      <ChevronLeftIcon
        className={cn('size-3.5', className)}
        {...rest}
      />
    );
  }
  if (orientation === 'right') {
    return (
      <ChevronRightIcon
        className={cn('size-3.5', className)}
        {...rest}
      />
    );
  }
  return (
    <ChevronDownIcon
      className={cn('size-3.5', className)}
      {...rest}
    />
  );
}

const navButtonClassName = cn(
  'inline-flex size-(--cell-size) cursor-pointer items-center justify-center rounded p-0 text-grayscale-opacity-700 transition-colors duration-200 outline-none select-none',
  'hover:bg-grayscale-opacity-100',
  'disabled:pointer-events-none disabled:opacity-50',
);

function monthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function clampMonth(date: Date, start?: Date, end?: Date) {
  const time = monthStart(date).getTime();
  if (start && time < monthStart(start).getTime())
    return monthStart(start);
  if (end && time > monthStart(end).getTime()) return monthStart(end);
  return date;
}

function CalendarNav({
  className,
  onPreviousClick,
  onNextClick,
  previousMonth,
  nextMonth,
  ...rest
}: NavProps) {
  const { months, goToMonth, dayPickerProps } = useDayPicker();
  const visibleMonth = months[0]?.date;
  const { startMonth, endMonth } = dayPickerProps;

  const goToYear = (delta: number) => {
    if (!visibleMonth) return;
    const target = new Date(visibleMonth);
    target.setFullYear(target.getFullYear() + delta);
    goToMonth(clampMonth(target, startMonth, endMonth));
  };

  return (
    <nav data-slot="calendar-nav" className={cn(className)} {...rest}>
      <div className="pointer-events-auto flex">
        <button
          type="button"
          aria-label="Go to the previous year"
          disabled={!previousMonth}
          onClick={() => goToYear(-1)}
          className={navButtonClassName}
        >
          <ChevronDoubleLeftIcon className="size-3.5" />
        </button>
        <button
          type="button"
          aria-label="Go to the previous month"
          disabled={!previousMonth}
          onClick={onPreviousClick}
          className={navButtonClassName}
        >
          <ChevronLeftIcon className="size-3.5" />
        </button>
      </div>
      <div className="pointer-events-auto flex">
        <button
          type="button"
          aria-label="Go to the next month"
          disabled={!nextMonth}
          onClick={onNextClick}
          className={navButtonClassName}
        >
          <ChevronRightIcon className="size-3.5" />
        </button>
        <button
          type="button"
          aria-label="Go to the next year"
          disabled={!nextMonth}
          onClick={() => goToYear(1)}
          className={navButtonClassName}
        >
          <ChevronDoubleRightIcon className="size-3.5" />
        </button>
      </div>
    </nav>
  );
}

const captionDropdownTriggerClassName = cn(
  'inline-flex h-8 cursor-pointer items-center gap-0.5 rounded px-1.5 text-sm font-medium text-grayscale-opacity-800 outline-none transition-colors duration-200 select-none',
  'hover:bg-grayscale-opacity-100',
  'focus-visible:ring-2 focus-visible:ring-primary-500/40',
  'disabled:pointer-events-none disabled:opacity-50',
  '[&>svg]:text-grayscale-opacity-500',
);

const captionDropdownItemClassName = cn(
  'flex h-9 cursor-pointer items-center justify-center rounded text-sm text-grayscale-opacity-800 outline-none transition-colors duration-150 select-none',
  'hover:bg-grayscale-opacity-100',
  'data-[selected=true]:font-medium data-[selected=true]:text-primary-500',
  'disabled:pointer-events-none disabled:text-grayscale-opacity-300',
);

function CalendarMonthsDropdown({
  options,
  value,
  disabled,
  ...props
}: DropdownProps) {
  const { goToMonth, months, dayPickerProps } = useDayPicker();
  const [open, setOpen] = React.useState(false);
  const currentValue = Number(value);
  const referenceDate =
    months.find((m) => m.date.getMonth() === currentValue)?.date ??
    months[0]?.date ??
    new Date();
  const triggerLabel = options?.find(
    (o) => o.value === currentValue,
  )?.label;

  const handleSelect = (monthIndex: number) => {
    goToMonth(
      clampMonth(
        new Date(referenceDate.getFullYear(), monthIndex, 1),
        dayPickerProps.startMonth,
        dayPickerProps.endMonth,
      ),
    );
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={props['aria-label']}
        disabled={disabled}
        className={captionDropdownTriggerClassName}
      >
        {triggerLabel}
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={8}
        className="grid w-56 grid-cols-3 gap-1 p-2"
      >
        {options?.map((option) => (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            data-selected={option.value === currentValue || undefined}
            onClick={() => handleSelect(option.value)}
            className={captionDropdownItemClassName}
          >
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function CalendarYearsDropdown({
  options,
  value,
  disabled,
  ...props
}: DropdownProps) {
  const { goToMonth, months, dayPickerProps } = useDayPicker();
  const [open, setOpen] = React.useState(false);
  const currentValue = Number(value);
  const referenceDate =
    months.find((m) => m.date.getFullYear() === currentValue)?.date ??
    months[0]?.date ??
    new Date();
  const triggerLabel = options?.find(
    (o) => o.value === currentValue,
  )?.label;

  // Center the selected year once the portalled list is in the DOM. The
  // popup is `position: fixed`, which defeats `scrollIntoView`, so set
  // `scrollTop` directly. A double rAF defers past Base UI's open-focus,
  // which otherwise resets the scroll position back to the top.
  const scrollSelectedIntoView = React.useCallback(
    (node: HTMLButtonElement | null) => {
      const list = node?.parentElement;
      if (!node || !list) return;
      const center = () => {
        const offset =
          node.getBoundingClientRect().top -
          list.getBoundingClientRect().top;
        list.scrollTop +=
          offset - (list.clientHeight - node.offsetHeight) / 2;
      };
      requestAnimationFrame(() => requestAnimationFrame(center));
    },
    [],
  );

  const handleSelect = (year: number) => {
    goToMonth(
      clampMonth(
        new Date(year, referenceDate.getMonth(), 1),
        dayPickerProps.startMonth,
        dayPickerProps.endMonth,
      ),
    );
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={props['aria-label']}
        disabled={disabled}
        className={captionDropdownTriggerClassName}
      >
        {triggerLabel}
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={8}
        className="max-h-60 w-24 overflow-y-auto p-1"
      >
        {options?.map((option) => (
          <button
            key={option.value}
            ref={
              option.value === currentValue
                ? scrollSelectedIntoView
                : undefined
            }
            type="button"
            disabled={option.disabled}
            data-selected={option.value === currentValue || undefined}
            onClick={() => handleSelect(option.value)}
            className={cn(captionDropdownItemClassName, 'w-full')}
          >
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  children,
  ...props
}: DayButtonProps) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      type="button"
      data-slot="calendar-day-button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-today={
        modifiers.today && !modifiers.selected ? true : undefined
      }
      className={cn(
        'relative flex aspect-square size-auto w-full min-w-(--cell-size) flex-col items-center justify-center gap-1 rounded-full text-sm leading-none font-normal cursor-pointer text-grayscale-opacity-800 outline-none transition-colors duration-200',
        'hover:ring-1 hover:ring-inset hover:ring-primary-500',
        'focus-visible:relative focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary-500/40',
        'group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10',
        'data-[today=true]:text-primary-500',
        'data-[range-end=true]:bg-primary-500 data-[range-end=true]:text-white',
        'data-[range-middle=true]:text-grayscale-opacity-800',
        'data-[range-start=true]:bg-primary-500 data-[range-start=true]:text-white',
        'data-[selected-single=true]:bg-primary-500 data-[selected-single=true]:text-white',
        'aria-disabled:pointer-events-none aria-disabled:text-grayscale-opacity-300',
        '[&>span:not([data-slot=calendar-today-dot])]:text-xs [&>span:not([data-slot=calendar-today-dot])]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    >
      {children}
      {modifiers.today ? (
        <span
          aria-hidden="true"
          data-slot="calendar-today-dot"
          className="pointer-events-none absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current"
        />
      ) : null}
    </button>
  );
}

export { Calendar, CalendarDayButton, CalendarNav };
