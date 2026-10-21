import type { Column, Table } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import type { EmissionTreeRow } from './data';

export const RAIL_WIDTHS = [4, 28, 24, 24] as const;
export const RAIL_STARTS = [0, 4, 32, 56] as const; // cumulative left of each rail col
export const RAIL_OFFSET = RAIL_WIDTHS.reduce((sum, w) => sum + w, 0); // 80
export const CATEGORY_TITLE_LEFT = RAIL_STARTS[3]; // chevron in col 3, title starts at col 4
export const SUBCATEGORY_TITLE_LEFT = RAIL_OFFSET; // chevron in col 4, title starts at col 5

/**
 * Column ids may contain characters that are not valid in a CSS custom
 * property name, so they are slugified before being used as a variable.
 */
function slug(columnId: string) {
  return columnId.replace(/[^\w-]/g, '-');
}

export function columnSizeVar(columnId: string) {
  return `--col-${slug(columnId)}-size`;
}

function columnStartVar(columnId: string) {
  return `--col-${slug(columnId)}-start`;
}

/** Same order as `getHeaderGroups()`: left pins, unpinned, right pins. */
export function getLeafColumnsInDisplayOrder<TData>(
  table: Table<TData>,
) {
  return [
    ...table.getLeftVisibleLeafColumns(),
    ...table.getCenterVisibleLeafColumns(),
    ...table.getRightVisibleLeafColumns(),
  ];
}

/**
 * Widths and pinned offsets as CSS variables, set once on `<table>`.
 *
 * Column resizing then only rewrites that one `style` attribute: the colgroup
 * widths and every pinned `left` offset read from these variables, so the rows
 * do not have to re-render mid-drag. Pinned offsets have to be included because
 * widening a pinned column pushes the pinned columns after it to the right.
 */
export function getColumnSizeVars<TData>(
  table: Table<TData>,
): CSSProperties {
  const vars: Record<string, string> = {
    // The rail occupies RAIL_OFFSET px before the first data column.
    '--table-total-size': `${RAIL_OFFSET + table.getTotalSize()}px`,
  };

  for (const column of table.getVisibleLeafColumns()) {
    vars[columnSizeVar(column.id)] = `${column.getSize()}px`;
    vars[columnStartVar(column.id)] = `${column.getStart('left')}px`;
  }

  return vars as CSSProperties;
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

export function titleStickyStyle(leftOffset: number): CSSProperties {
  return {
    position: 'sticky',
    left: leftOffset,
    width: `min(${1408 - leftOffset}px, calc(100vw - ${leftOffset + 48}px))`,
  };
}

export function getPinningStyles(
  column: Column<EmissionTreeRow>,
): CSSProperties {
  if (column.getIsPinned() !== 'left') {
    return {};
  }

  return {
    position: 'sticky',
    // Pinned columns start after the rail, then stack by their own widths.
    left: `calc(${RAIL_OFFSET}px + var(${columnStartVar(column.id)}))`,
    width: `var(${columnSizeVar(column.id)})`,
    zIndex: 10,
    boxShadow: column.getIsLastColumn('left')
      ? 'inset -1px 0 0 var(--grayscale-opacity-300)'
      : undefined,
  };
}

export function getPinnedClassName(column: Column<EmissionTreeRow>) {
  // Pinned cells need a solid bg so scrolling content doesn't bleed through.
  // We lose the TR hover bg for these cells — acceptable for identity columns.
  return column.getIsPinned() === 'left' ? 'bg-white' : undefined;
}
