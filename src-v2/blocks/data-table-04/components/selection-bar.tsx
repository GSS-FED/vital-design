import { CloseIcon } from '@/icons/CloseIcon';
import { useLayoutEffect, useRef, useState } from 'react';

type Counts = { selected: number; total: number };

/**
 * Floats over the table while rows are selected. The zero-height
 * wrapper sits at the end of the card and sticks to the screen bottom,
 * so the bar stays 12px above whichever comes first: the card's bottom
 * edge or the bottom of the screen.
 *
 * It slides in like a toast. When the selection empties it keeps the
 * last counts on screen and unmounts after it has slid out.
 */
export function SelectionBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onDelete,
  onClear,
}: {
  selectedCount: number;
  /** Rows the current search shows. */
  totalCount: number;
  onSelectAll: () => void;
  onDelete: () => void;
  onClear: () => void;
}) {
  const open = selectedCount > 0;
  const [shown, setShown] = useState<Counts | null>(
    open ? { selected: selectedCount, total: totalCount } : null,
  );
  const barRef = useRef<HTMLDivElement>(null);

  // While open, follow the live counts. While closing, keep the last
  // ones, so the bar does not read 已選擇 0 筆 on its way out.
  if (
    open &&
    (shown?.selected !== selectedCount || shown.total !== totalCount)
  ) {
    setShown({ selected: selectedCount, total: totalCount });
  }

  // The closed state rests at opacity 0. Once the exit animation ends,
  // the bar would otherwise show at full opacity for the frame before
  // React removes it.
  //
  // No exit animation to wait for (reduced motion, or no Web
  // Animations API): unmount right away instead of waiting for an
  // animationend that never comes.
  useLayoutEffect(() => {
    if (open || !shown) return;
    const bar = barRef.current;
    if (
      !bar ||
      typeof bar.getAnimations !== 'function' ||
      bar.getAnimations().length === 0
    ) {
      setShown(null);
    }
  }, [open, shown]);

  if (!shown) return null;

  return (
    <div
      data-slot="data-table-selection-bar"
      className="pointer-events-none sticky bottom-0 z-40 h-0"
    >
      <div
        ref={barRef}
        role="toolbar"
        aria-label="已選取的任務"
        data-state={open ? 'open' : 'closed'}
        inert={!open}
        onAnimationEnd={(event) => {
          if (!open && event.target === event.currentTarget) {
            setShown(null);
          }
        }}
        className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-10 rounded-lg bg-grayscale-opacity-900/85 py-3 pr-4 pl-6 text-sm leading-5 whitespace-nowrap text-white shadow-emphasis backdrop-blur-[4px] duration-300 ease-out data-[state=closed]:opacity-0 data-[state=open]:pointer-events-auto motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=closed]:slide-out-to-bottom motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=open]:slide-in-from-bottom"
      >
        <div className="flex items-center gap-4">
          <span role="status">
            已選擇{' '}
            <span className="font-medium text-info-400">
              {shown.selected}
            </span>{' '}
            筆
          </span>
          {shown.selected < shown.total ? (
            <button
              type="button"
              onClick={onSelectAll}
              className="cursor-pointer font-medium text-info-400 hover:underline focus-visible:shadow-focus-primary focus-visible:outline-none"
            >
              全選 {shown.total} 筆
            </button>
          ) : null}
        </div>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onDelete}
            className="cursor-pointer font-medium text-destructive-400 hover:underline focus-visible:shadow-focus-primary focus-visible:outline-none"
          >
            刪除
          </button>
          <span className="flex items-center border-l border-white/25 pl-4">
            <button
              type="button"
              aria-label="取消選取"
              onClick={onClear}
              className="flex size-5 cursor-pointer items-center justify-center text-white/85 hover:text-white focus-visible:shadow-focus-primary focus-visible:outline-none"
            >
              <CloseIcon className="size-3" />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
