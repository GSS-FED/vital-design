import type { Table } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

/**
 * Column ids come from accessor keys and may contain characters that are not
 * valid in a CSS custom property name (`user.name`, `建立日期 (UTC)`…), so they
 * are slugified before being used as a variable.
 */
function slug(columnId: string) {
  return columnId.replace(/[^\w-]/g, '-');
}

/** Rendered width of a leaf column. */
export function columnSizeVar(columnId: string) {
  return `--col-${slug(columnId)}-size`;
}

/** Left offset of a `left`-pinned column (sum of the pinned columns before it). */
function columnStartVar(columnId: string) {
  return `--col-${slug(columnId)}-start`;
}

/** Right offset of a `right`-pinned column. */
function columnEndVar(columnId: string) {
  return `--col-${slug(columnId)}-end`;
}

/**
 * Width for the trailing filler column.
 *
 * Under `table-fixed` a percentage column is clamped to the space the sized
 * columns leave over, so `100%` means "take the slack, or nothing": it is 0 when
 * the columns already fill the frame and exactly the leftover when they don't.
 * The sized columns therefore always render at the width they were dragged to.
 *
 * `auto` does NOT work here — Chrome hands an unsized column an equal share of
 * the table width (and widens the table to fit it) instead of the leftover.
 */
export const FILLER_COLUMN_WIDTH = '100%';

/**
 * Width of a header cell. Differs from the column width only for grouped
 * headers, where one header spans several leaf columns.
 */
function headerSizeVar(headerId: string) {
  return `--header-${slug(headerId)}-size`;
}

/**
 * Every width and pinned offset the table needs, as CSS variables.
 *
 * Resizing writes to a single `style` attribute on `<table>` instead of to
 * every cell, so a drag re-renders the table element and nothing else — cells
 * that read `var(--col-x-size)` / `var(--col-x-start)` follow along even when
 * their rows are memoized. Pinned offsets are included because they shift too:
 * widening a pinned column pushes the pinned columns after it to the right.
 */
export function getColumnSizeVars<TData>(
  table: Table<TData>,
): CSSProperties {
  const vars: Record<string, string> = {
    '--table-total-size': `${table.getTotalSize()}px`,
  };

  for (const column of table.getVisibleLeafColumns()) {
    vars[columnSizeVar(column.id)] = `${column.getSize()}px`;
    vars[columnStartVar(column.id)] = `${column.getStart('left')}px`;
    vars[columnEndVar(column.id)] = `${column.getAfter('right')}px`;
  }

  for (const header of table.getFlatHeaders()) {
    vars[headerSizeVar(header.id)] = `${header.getSize()}px`;
  }

  return vars as CSSProperties;
}
