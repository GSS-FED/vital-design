import type { Column } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

export function getCommonPinningStyles<TData>(
  column: Column<TData>,
  zIndex = 1,
): CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: isLastLeftPinnedColumn
      ? 'inset -1px 0 0 var(--grayscale-300)'
      : isFirstRightPinnedColumn
        ? 'inset 1px 0 0 var(--grayscale-300)'
        : undefined,
    left:
      isPinned === 'left'
        ? `${column.getStart('left')}px`
        : undefined,
    right:
      isPinned === 'right'
        ? `${column.getAfter('right')}px`
        : undefined,
    opacity: 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? zIndex : 0,
  };
}

export function getPinnedCellClassName<TData>(
  column: Column<TData>,
  className: string,
) {
  return [
    className,
    column.getIsPinned() &&
      'bg-white group-hover:!z-40 group-hover:bg-[#f8f8f9] group-focus-within:!z-40 group-data-[state=selected]:!z-40 group-data-[state=selected]:bg-[#f8f8f9]',
  ]
    .filter(Boolean)
    .join(' ');
}
