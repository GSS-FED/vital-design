'use client';

import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import { cn } from '@/lib/utils';
import * as React from 'react';
import {
  type DayButtonProps,
  DayPicker,
  getDefaultClassNames,
} from 'react-day-picker';

/* eslint-disable react/prop-types */

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  formatters,
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
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
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
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          'inline-flex size-(--cell-size) cursor-pointer items-center justify-center rounded p-0 text-grayscale-700 transition-colors duration-200 outline-none select-none',
          'hover:bg-grayscale-100',
          'aria-disabled:pointer-events-none aria-disabled:opacity-50',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          'inline-flex size-(--cell-size) cursor-pointer items-center justify-center rounded p-0 text-grayscale-700 transition-colors duration-200 outline-none select-none',
          'hover:bg-grayscale-100',
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
        dropdown_root: cn(
          'relative rounded border border-grayscale-300 shadow-xs has-focus:border-primary-500 has-focus:ring-2 has-focus:ring-primary-500/30',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute inset-0 bg-white opacity-0',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'text-sm font-medium text-grayscale-800 select-none',
          captionLayout === 'label'
            ? ''
            : 'flex h-8 items-center gap-1 rounded pr-1 pl-2 [&>svg]:size-3.5 [&>svg]:text-grayscale-500',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 rounded text-xs font-normal text-grayscale-500 select-none',
          defaultClassNames.weekday,
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn(
          'w-(--cell-size) select-none',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-xs text-grayscale-500 select-none',
          defaultClassNames.week_number,
        ),
        day: cn(
          'group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r',
          rest.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l'
            : '[&:first-child[data-selected=true]_button]:rounded-l',
          defaultClassNames.day,
        ),
        range_start: cn(
          'rounded-l bg-primary-100',
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          'rounded-none',
          defaultClassNames.range_middle,
        ),
        range_end: cn(
          'rounded-r bg-primary-100',
          defaultClassNames.range_end,
        ),
        today: cn(
          'rounded text-primary-500 data-[selected=true]:rounded-none data-[selected=true]:text-white',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-grayscale-400 aria-selected:text-grayscale-400',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-grayscale-400 opacity-50',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        WeekNumber: CalendarWeekNumber,
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
        opacity={1}
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

function CalendarDayButton({
  className,
  day,
  modifiers,
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
      className={cn(
        'flex aspect-square size-auto w-full min-w-(--cell-size) flex-col items-center justify-center gap-1 rounded text-sm leading-none font-normal cursor-pointer text-grayscale-800 outline-none transition-colors duration-200',
        'hover:bg-grayscale-100',
        'focus-visible:relative focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary-500/40',
        'group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10',
        'data-[range-end=true]:rounded-r data-[range-end=true]:bg-primary-500 data-[range-end=true]:text-white',
        'data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-primary-100 data-[range-middle=true]:text-grayscale-800',
        'data-[range-start=true]:rounded-l data-[range-start=true]:bg-primary-500 data-[range-start=true]:text-white',
        'data-[selected-single=true]:bg-primary-500 data-[selected-single=true]:text-white',
        'aria-disabled:pointer-events-none aria-disabled:text-grayscale-300',
        '[&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
