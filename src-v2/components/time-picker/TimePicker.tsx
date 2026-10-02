'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useLayoutEffect, useMemo, useRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
} from 'react';

const padTime = (n: number) => n.toString().padStart(2, '0');

const rangeStep = (length: number, step: number) => {
  const out: number[] = [];
  for (let i = 0; i < length; i += step) out.push(i);
  return out;
};

type TimeColumnProps = {
  values: number[];
  selected: number;
  disabled?: boolean;
  onSelect: (value: number) => void;
  className?: string;
  itemClassName?: string;
  formatItem?: (value: number) => ReactNode;
};

function TimeColumn({
  values,
  selected,
  disabled,
  onSelect,
  className,
  itemClassName,
  formatItem,
}: TimeColumnProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const initialMount = useRef(true);

  useLayoutEffect(() => {
    const list = listRef.current;
    const target = list?.querySelector<HTMLElement>(
      '[data-selected="true"]',
    );
    if (!list || !target) return;

    const offset =
      target.getBoundingClientRect().top -
      list.getBoundingClientRect().top;

    if (initialMount.current) {
      list.scrollTop += offset;
      initialMount.current = false;
    } else {
      list.scrollBy({ top: offset, behavior: 'smooth' });
    }
  }, [selected]);

  return (
    <ul
      ref={listRef}
      data-slot="time-picker-column"
      role="listbox"
      aria-disabled={disabled || undefined}
      className={cn(
        'box-border h-full w-14 snap-y snap-proximity overflow-y-auto text-sm leading-5',
        '[&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent',
        'aria-disabled:pointer-events-none aria-disabled:opacity-60',
        className,
      )}
    >
      {values.map((value) => {
        const isSelected = value === selected;
        return (
          <li
            key={value}
            role="option"
            aria-selected={isSelected}
            data-value={value}
            data-slot="time-picker-item"
            data-selected={isSelected || undefined}
            className={cn(
              'flex h-8 cursor-pointer snap-start items-center justify-center font-normal text-grayscale-opacity-800 transition-colors duration-100 select-none',
              'hover:bg-primary-50',
              'data-[selected=true]:bg-primary-500 data-[selected=true]:text-white',
              'data-[selected=true]:hover:bg-primary-600',
              itemClassName,
            )}
            onClick={() => {
              if (disabled) return;
              onSelect(value);
            }}
          >
            {formatItem ? formatItem(value) : padTime(value)}
          </li>
        );
      })}
    </ul>
  );
}

export type TimePickerProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange'
> & {
  /**
   * The current time. Only the hours/minutes/seconds portion of the Date
   * is used; the date portion is preserved on emit.
   */
  value?: Date;
  /**
   * Called with a new Date that has the chosen time. Date portion is
   * preserved from `value`, or defaults to today when `value` is undefined.
   */
  onValueChange?: (value: Date) => void;
  showSeconds?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabled?: boolean;
};

const TimePicker = forwardRef<ElementRef<'div'>, TimePickerProps>(
  function TimePicker(
    {
      value,
      onValueChange,
      showSeconds = true,
      hourStep = 1,
      minuteStep = 1,
      secondStep = 1,
      disabled,
      className,
      ...props
    },
    ref,
  ) {
    const currentHours = value?.getHours() ?? 0;
    const currentMinutes = value?.getMinutes() ?? 0;
    const currentSeconds = value?.getSeconds() ?? 0;

    const hours = useMemo(() => rangeStep(24, hourStep), [hourStep]);
    const minutes = useMemo(
      () => rangeStep(60, minuteStep),
      [minuteStep],
    );
    const seconds = useMemo(
      () => rangeStep(60, secondStep),
      [secondStep],
    );

    const emit = (h: number, m: number, s: number) => {
      const out = value ? new Date(value) : new Date();
      out.setHours(h, m, s, 0);
      onValueChange?.(out);
    };

    return (
      <div
        ref={ref}
        data-slot="time-picker"
        className={cn(
          'box-border inline-flex h-75 divide-x divide-grayscale-opacity-200 overflow-hidden rounded bg-white',
          className,
        )}
        {...props}
      >
        <TimeColumn
          values={hours}
          selected={currentHours}
          disabled={disabled}
          onSelect={(h) => emit(h, currentMinutes, currentSeconds)}
        />
        <TimeColumn
          values={minutes}
          selected={currentMinutes}
          disabled={disabled}
          onSelect={(m) => emit(currentHours, m, currentSeconds)}
        />
        {showSeconds ? (
          <TimeColumn
            values={seconds}
            selected={currentSeconds}
            disabled={disabled}
            onSelect={(s) => emit(currentHours, currentMinutes, s)}
          />
        ) : null}
      </div>
    );
  },
);

export { TimePicker };
