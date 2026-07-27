import { cn } from '@/lib/utils';
import type { Header } from '@tanstack/react-table';
import type { MouseEvent, TouchEvent } from 'react';

const NUDGE_STEP = 8;
const NUDGE_STEP_LARGE = 40;
const RAISED_Z = '60';

/**
 * The drag guide runs from the header down through the body, so its height
 * cannot come from the `th` it lives in. Measure the scroll container once per
 * drag and hand the value to CSS.
 *
 * Measuring (instead of using a huge value) keeps the guide from adding
 * scrollable overflow, and keeping it inside the `th` means a pinned column's
 * guide inherits that cell's sticky offset for free.
 *
 * A layout can repeat the header row per group (see `data-table-group-02`), and
 * those later rows are sticky with a z-index, so a single segment drawn from
 * the grabbed handle gets painted over and the line comes out broken. Every
 * copy of the column therefore draws its own segment from its own row down to
 * the end of the content; overlapped, they read as one continuous line.
 *
 * In `onEnd` mode the guide has to track the pointer, and it does so
 * imperatively: a layout may memoize its rows and freeze them for the drag
 * (`data-table-group-01` / `-02` do), which would freeze a React-driven ghost
 * offset along with them and leave the drag with no feedback at all.
 */
function startResizeGuide(
  handle: HTMLElement,
  ghost: {
    startX: number;
    size: number;
    minSize: number;
    maxSize: number;
  } | null,
) {
  const container = handle.closest<HTMLElement>(
    '[data-slot="table-container"]',
  );
  if (!container) return;

  const { columnId } = handle.dataset;
  const containerTop = container.getBoundingClientRect().top;
  const guides = Array.from(
    container.querySelectorAll<HTMLElement>(
      '[data-slot="data-table-resize-handle"]',
    ),
  ).filter((guide) => guide.dataset.columnId === columnId);

  // Sticky group-title rows sit above the header rows and would clip the
  // segments, so the cells hosting a guide are lifted for the drag and put back
  // afterwards. `RAISED_Z` clears the highest layer these layouts use (the
  // group title at z-50 in `data-table-group-01`).
  const raised: { el: HTMLElement; zIndex: string }[] = [];
  const raise = (el: Element | null) => {
    if (!(el instanceof HTMLElement)) return;
    raised.push({ el, zIndex: el.style.zIndex });
    el.style.zIndex = RAISED_Z;
  };

  for (const guide of guides) {
    const top =
      guide.getBoundingClientRect().top -
      containerTop +
      container.scrollTop;
    guide.style.setProperty(
      '--table-resize-guide-height',
      `${container.scrollHeight - top}px`,
    );
    guide.dataset.guide = 'true';
    raise(guide.closest('th, td'));
    raise(guide.closest('tr'));
  }

  const track = (
    event: globalThis.MouseEvent | globalThis.TouchEvent,
  ) => {
    if (!ghost) return;
    const clientX =
      'touches' in event ? event.touches[0]?.clientX : event.clientX;
    if (clientX === undefined) return;
    // Clamp against the column's bounds so the guide never promises a width
    // the column cannot take.
    const next = Math.min(
      Math.max(ghost.size + clientX - ghost.startX, ghost.minSize),
      ghost.maxSize,
    );
    for (const guide of guides) {
      guide.style.transform = `translateX(${next - ghost.size}px)`;
    }
  };

  const clear = () => {
    for (const guide of guides) {
      delete guide.dataset.guide;
      guide.style.removeProperty('--table-resize-guide-height');
      guide.style.removeProperty('transform');
    }
    for (const { el, zIndex } of raised) {
      el.style.zIndex = zIndex;
    }
    window.removeEventListener('mousemove', track);
    window.removeEventListener('touchmove', track);
    window.removeEventListener('mouseup', clear);
    window.removeEventListener('touchend', clear);
  };

  if (ghost) {
    window.addEventListener('mousemove', track);
    window.addEventListener('touchmove', track);
  }
  window.addEventListener('mouseup', clear);
  window.addEventListener('touchend', clear);
}

export interface DataTableResizeHandleProps<TData, TValue> {
  header: Header<TData, TValue>;
  /** Accessible name. Defaults to the column id. */
  label?: string;
  className?: string;
}

/**
 * Drag target that sits on the right edge of a `TableHead`.
 *
 * - pointer / touch drag resizes the column
 * - double click or `Home` resets it to the column's `size`
 * - `ArrowLeft` / `ArrowRight` nudge by 8px (40px with `Shift`)
 *
 * With `columnResizeMode: 'onEnd'` the guide follows the pointer and the column
 * only commits on release.
 */
export function DataTableResizeHandle<TData, TValue>({
  header,
  label,
  className,
}: DataTableResizeHandleProps<TData, TValue>) {
  const { column } = header;
  const { table } = header.getContext();

  if (!column.getCanResize()) {
    return null;
  }

  const isResizing = column.getIsResizing();
  const minSize =
    column.columnDef.minSize ??
    table.options.defaultColumn?.minSize ??
    20;
  const maxSize =
    column.columnDef.maxSize ?? table.options.defaultColumn?.maxSize;

  const resize = (delta: number) => {
    const next = Math.min(
      Math.max(column.getSize() + delta, minSize),
      maxSize ?? Number.MAX_SAFE_INTEGER,
    );
    table.setColumnSizing((sizing) => ({
      ...sizing,
      [column.id]: next,
    }));
  };

  const startDrag = (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
  ) => {
    // Without this the drag selects the header text it passes over.
    if (event.type === 'mousedown') event.preventDefault();
    const startX =
      'touches' in event ? event.touches[0]?.clientX : event.clientX;
    // In `onEnd` mode the column stays put during the drag, so the guide
    // itself moves to show where the edge will land.
    const ghost =
      table.options.columnResizeMode === 'onEnd' &&
      startX !== undefined
        ? {
            startX,
            size: column.getSize(),
            minSize,
            maxSize: maxSize ?? Number.MAX_SAFE_INTEGER,
          }
        : null;
    startResizeGuide(event.currentTarget, ghost);
    header.getResizeHandler()(event);
  };

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={label ?? `Resize ${column.id} column`}
      aria-valuenow={column.getSize()}
      aria-valuemin={minSize}
      aria-valuemax={maxSize}
      tabIndex={0}
      data-slot="data-table-resize-handle"
      data-column-id={column.id}
      data-resizing={isResizing || undefined}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onClick={(event) => event.stopPropagation()}
      onDoubleClick={(event) => {
        event.stopPropagation();
        column.resetSize();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          const step = event.shiftKey ? NUDGE_STEP_LARGE : NUDGE_STEP;
          resize(event.key === 'ArrowLeft' ? -step : step);
          return;
        }
        if (event.key === 'Home') {
          event.preventDefault();
          column.resetSize();
        }
      }}
      className={cn(
        'absolute inset-y-0 right-0 z-30 w-2 cursor-col-resize touch-none select-none',
        'after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-transparent after:content-[""]',
        // Hover shows nothing but the col-resize cursor; the only blue line is
        // the drag guide.
        'focus-visible:outline-none focus-visible:after:w-0.5 focus-visible:after:bg-primary-500',
        // While dragging, the grabbed handle becomes a guide line that runs
        // down the whole body.
        'data-[guide]:after:h-[var(--table-resize-guide-height,100%)] data-[guide]:after:w-0.5 data-[guide]:after:bg-primary-500',
        className,
      )}
    />
  );
}
