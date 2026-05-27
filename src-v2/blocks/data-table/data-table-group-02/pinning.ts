import type { Column } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import type { EmissionTreeRow } from './data';

export const RAIL_WIDTHS = [4, 28, 24, 24] as const;
export const RAIL_STARTS = [0, 4, 32, 56] as const; // cumulative left of each rail col
export const RAIL_OFFSET = RAIL_WIDTHS.reduce((sum, w) => sum + w, 0); // 80
export const CATEGORY_TITLE_LEFT = RAIL_STARTS[3]; // chevron in col 3, title starts at col 4
export const SUBCATEGORY_TITLE_LEFT = RAIL_OFFSET; // chevron in col 4, title starts at col 5

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
    left: `${RAIL_OFFSET + column.getStart('left')}px`,
    width: column.getSize(),
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
