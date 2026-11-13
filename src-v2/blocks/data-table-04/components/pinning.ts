import type { Column, Table } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

/** Header order: left pins, unpinned center, then right pins. */
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
 * Sticky offset for a pinned column. This table does not resize, so a
 * pixel offset stays in sync with layout. One left pin (select) sits
 * at 0; one right pin (actions) sits at 0.
 */
export function getPinningStyles<TData>(
  column: Column<TData>,
  zIndex = 1,
): CSSProperties {
  const pinned = column.getIsPinned();
  if (!pinned) return {};

  const isLeft = pinned === 'left';

  return {
    position: 'sticky',
    left: isLeft ? `${column.getStart('left')}px` : undefined,
    right: isLeft ? undefined : `${column.getAfter('right')}px`,
    width: column.getSize(),
    zIndex,
    // Stays on the pinned column while other columns scroll under it.
    // The column beside it does not also draw this edge.
    boxShadow: isLeft
      ? undefined
      : column.getIsFirstColumn('right')
        ? 'inset 1px 0 0 var(--grayscale-opacity-300)'
        : undefined,
  };
}
