import type { Column } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

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
        ? `${column.getStart('left')}px`
        : undefined,
    right:
      isPinned === 'right'
        ? `${column.getAfter('right')}px`
        : undefined,
    top: stickyTop,
    opacity: 1,
    position: isSticky ? 'sticky' : 'relative',
    width: column.getSize(),
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
