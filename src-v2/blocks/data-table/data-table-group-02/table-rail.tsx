import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { RAIL_STARTS, RAIL_WIDTHS } from './pinning';

export function RailVertical() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border"
    />
  );
}

export function RailBranch() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 h-[22px] w-3 rounded-bl-lg border-b border-l border-border"
    />
  );
}

export function RailCells({
  variant,
  trailingCell,
  bgClassName = 'bg-white',
}: {
  variant: 'vertical' | 'branch';
  trailingCell?: ReactNode;
  bgClassName?: string;
}) {
  const cellClass = cn('sticky z-10 p-0', bgClassName);
  return (
    <>
      <td
        className={cellClass}
        style={{ left: RAIL_STARTS[0], width: RAIL_WIDTHS[0] }}
      />
      <td
        className={cellClass}
        style={{ left: RAIL_STARTS[1], width: RAIL_WIDTHS[1] }}
      />
      <td
        className={cellClass}
        style={{ left: RAIL_STARTS[2], width: RAIL_WIDTHS[2] }}
      >
        <RailVertical />
        {variant === 'branch' && <RailBranch />}
      </td>
      {trailingCell ?? (
        <td
          className={cellClass}
          style={{ left: RAIL_STARTS[3], width: RAIL_WIDTHS[3] }}
        />
      )}
    </>
  );
}

export function ChevronCell({
  expanded,
  leftOffset,
  bgClassName = 'bg-white',
}: {
  expanded: boolean;
  leftOffset: number;
  bgClassName?: string;
}) {
  return (
    <td
      className={cn('sticky z-10 p-0 text-center', bgClassName)}
      style={{ left: leftOffset, width: 24 }}
    >
      <ChevronDownIcon
        className={cn(
          'mx-auto size-3 text-grayscale-700 transition-transform',
          !expanded && '-rotate-90',
        )}
      />
    </td>
  );
}
