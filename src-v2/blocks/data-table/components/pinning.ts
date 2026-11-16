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

const PIN_START_SHADOW = '--data-table-pin-start-shadow';
const PIN_END_SHADOW = '--data-table-pin-end-shadow';

/**
 * Sticky offset for a pinned column. Resizing runs in `onChange` mode,
 * which re-renders on every move, so a pixel offset stays in sync with
 * layout. One left pin (select) sits at 0; one right pin (actions) sits at 0.
 */
export function getPinningStyles<TData>(
  column: Column<TData>,
  zIndex = 1,
): CSSProperties {
  const pinned = column.getIsPinned();
  if (!pinned) return {};

  const isLeft = pinned === 'left';
  // The pinned edge that columns scroll under. The table sets the shadow
  // variables only while content is hidden on that side.
  const startEdge = isLeft && column.getIsLastColumn('left');
  const endEdge = !isLeft && column.getIsFirstColumn('right');

  return {
    position: 'sticky',
    left: isLeft ? `${column.getStart('left')}px` : undefined,
    right: isLeft ? undefined : `${column.getAfter('right')}px`,
    width: column.getSize(),
    zIndex,
    // The end edge line stays on the pinned column while other columns
    // scroll under it. The column beside it does not also draw this edge.
    boxShadow: endEdge
      ? `inset 1px 0 0 var(--grayscale-opacity-300), var(${PIN_END_SHADOW}, 0 0 #0000)`
      : startEdge
        ? `var(${PIN_START_SHADOW}, 0 0 #0000)`
        : undefined,
    // Keeps each cell's shadow on its outer side, so the cells of one
    // column read as one shadow with no seams between rows.
    clipPath: endEdge
      ? 'inset(0 0 0 -16px)'
      : startEdge
        ? 'inset(0 -16px 0 0)'
        : undefined,
  };
}

/**
 * Turns on the pinned-column shadows (Figma `Depth1 點綴`) on the side
 * where columns are scrolled out of view.
 */
export function pinShadowVars(edges: {
  start: boolean;
  end: boolean;
}): CSSProperties {
  return {
    ...(edges.start
      ? { [PIN_START_SHADOW]: 'var(--shadow-accent)' }
      : {}),
    ...(edges.end
      ? { [PIN_END_SHADOW]: 'var(--shadow-accent)' }
      : {}),
  } as CSSProperties;
}
