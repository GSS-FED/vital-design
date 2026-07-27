import type { Column, Table } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

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
    '--table-total-size': `${table.getTotalSize()}px`,
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

export function getCommonPinningStyles<TData>(
  column: Column<TData>,
  zIndex = 1,
  // When set, the cell also sticks vertically at this top offset (px).
  // Needed for header rows: pinned columns already use `position: sticky`
  // (horizontal), but unpinned columns default to `relative`, so a plain
  // CSS class can't make the whole header row stick under border-separate.
  stickyTop?: number,
): CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');
  const isSticky = Boolean(isPinned) || stickyTop !== undefined;
  // In a sticky header row, pinned columns sit at the top-left corner and must
  // stay above the unpinned headers when scrolling horizontally (unpinned cells
  // come later in the DOM, so equal z-index would let them paint on top).
  const zIndexValue = !isSticky
    ? 0
    : isPinned && stickyTop !== undefined
      ? zIndex + 10
      : zIndex;

  return {
    boxShadow: isLastLeftPinnedColumn
      ? 'inset -1px 0 0 var(--grayscale-opacity-300)'
      : isFirstRightPinnedColumn
        ? 'inset 1px 0 0 var(--grayscale-opacity-300)'
        : undefined,
    left:
      isPinned === 'left'
        ? `var(${columnStartVar(column.id)})`
        : undefined,
    right:
      isPinned === 'right'
        ? `${column.getAfter('right')}px`
        : undefined,
    top: stickyTop,
    opacity: 1,
    position: isSticky ? 'sticky' : 'relative',
    // Widths come from the colgroup; a pinned cell still needs its own width so
    // the sticky box matches the column while the rest scrolls under it.
    width: `var(${columnSizeVar(column.id)})`,
    zIndex: zIndexValue,
  };
}

export function getPinnedCellClassName<TData>(
  column: Column<TData>,
  className: string,
) {
  return [
    className,
    // Pinned cells keep their inline z-index (body = 20, header = 40) so they
    // stay below the sticky header (unpinned 30 / pinned 40). The hover/select
    // states only swap the background — they must NOT raise z-index, or a
    // hovered/selected frozen body cell would paint over the sticky header
    // while scrolling vertically.
    column.getIsPinned() &&
      'bg-white group-hover:bg-[#f8f8f9] group-data-[state=selected]:bg-[#f8f8f9]',
  ]
    .filter(Boolean)
    .join(' ');
}
