'use client';

import { Input } from '@/components/input/input/Input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/pagination/Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/Select';
import { cn } from '@/lib/utils';
import {
  type ChangeEvent,
  type ReactNode,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50];

export type TablePaginationProps = {
  /** Current page, starting at 1. */
  page: number;
  /** Rows shown per page. */
  pageSize: number;
  /** Total row count. */
  total: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
  /** Replaces the page controls. */
  pagination?: ReactNode;
  /** Replaces the jump-to-page field. */
  jump?: ReactNode;
  /** Replaces the page-size select and range summary. */
  summary?: ReactNode;
};

function digitsOnly(event: ChangeEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  const digits = input.value.replace(/\D/g, '');
  if (digits !== input.value) {
    input.value = digits;
  }
}

function columnGap(element: HTMLElement | null) {
  if (!element) {
    return 0;
  }
  const value = parseFloat(getComputedStyle(element).columnGap);
  return Number.isFinite(value) ? value : 0;
}

function usedWidth(element: HTMLElement) {
  const style = getComputedStyle(element);
  const gap = columnGap(element);
  const padding =
    (parseFloat(style.paddingLeft) || 0) +
    (parseFloat(style.paddingRight) || 0);
  const widths = [...element.children]
    .map((child) => (child as HTMLElement).offsetWidth)
    .filter((width) => width > 0);

  return (
    padding +
    widths.reduce(
      (total, width, index) => total + width + (index > 0 ? gap : 0),
      0,
    )
  );
}

function pageNumbers(from: number, to: number) {
  return Array.from(
    { length: Math.max(to - from + 1, 0) },
    (_, index) => from + index,
  );
}

function getPageWindow(page: number, totalPages: number) {
  const current = Math.min(Math.max(page, 1), totalPages);
  const groupStart = Math.floor((current - 1) / 5) * 5 + 1;
  const groupEnd = Math.min(totalPages, groupStart + 4);
  const hasLeftGap = groupStart > 1;
  const hasRightGap = groupEnd < totalPages;
  const bothGaps = hasLeftGap && hasRightGap;

  return {
    leadingPage: hasLeftGap && !bothGaps ? 1 : undefined,
    pages: pageNumbers(groupStart, groupEnd),
    trailingPage: hasRightGap && !bothGaps ? totalPages : undefined,
    leftHidden: hasLeftGap
      ? pageNumbers(bothGaps ? 1 : 2, groupStart - 1)
      : [],
    rightHidden: hasRightGap
      ? pageNumbers(
          groupEnd + 1,
          bothGaps ? totalPages : totalPages - 1,
        )
      : [],
  };
}

export function TablePagination({
  page,
  pageSize,
  total,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
  className,
  pagination,
  jump,
  summary,
}: TablePaginationProps) {
  const jumpId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef<HTMLDivElement>(null);
  const pageSizeRef = useRef<HTMLDivElement>(null);
  const hiddenWidthRef = useRef(0);
  const [compact, setCompact] = useState(false);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const {
    leadingPage,
    pages,
    trailingPage,
    leftHidden,
    rightHidden,
  } = getPageWindow(page, totalPages);

  function commitJump(raw: string) {
    if (!/^\d+$/.test(raw)) {
      return;
    }
    const nextPage = Math.min(totalPages, Math.max(1, Number(raw)));
    if (nextPage !== page) {
      onPageChange?.(nextPage);
    }
  }
  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const row = rowRef.current;
    if (!root || !row) {
      return;
    }

    const update = () => {
      const containerWidth = root.clientWidth;
      if (containerWidth <= 0) {
        return;
      }

      if (!compact) {
        hiddenWidthRef.current =
          (jumpRef.current?.offsetWidth ?? 0) +
          columnGap(jumpRef.current?.parentElement ?? null) +
          (pageSizeRef.current?.offsetWidth ?? 0) +
          columnGap(pageSizeRef.current?.parentElement ?? null);
      }

      const contentWidth = usedWidth(row);
      const nextCompact = compact
        ? contentWidth + hiddenWidthRef.current > containerWidth
        : contentWidth > containerWidth;
      if (nextCompact !== compact) {
        setCompact(nextCompact);
      }
    };

    update();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(update);
    observer.observe(root);
    return () => observer.disconnect();
  }, [compact, page, pageSize, total, totalPages]);

  return (
    <div
      ref={rootRef}
      data-slot="table-pagination"
      className={cn(
        'w-full overflow-x-auto rounded-b border-t border-grayscale-opacity-200 bg-grayscale-opacity-100',
        className,
      )}
    >
      <div
        ref={rowRef}
        className="flex w-max min-w-full items-center justify-between gap-6 px-4 py-2 font-sans text-sm leading-5 whitespace-nowrap text-grayscale-opacity-600"
      >
        <div className="flex shrink-0 items-center gap-6">
          {pagination ?? (
            <Pagination className="mx-0 w-auto shrink-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationFirst
                    render={<button type="button" />}
                    disabled={page <= 1}
                    onClick={() => onPageChange?.(1)}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious
                    render={<button type="button" />}
                    disabled={page <= 1}
                    onClick={() => onPageChange?.(page - 1)}
                  />
                </PaginationItem>
                {leadingPage !== undefined && (
                  <PaginationItem>
                    <PaginationLink
                      render={<button type="button" />}
                      isActive={page === leadingPage}
                      onClick={() => onPageChange?.(leadingPage)}
                      aria-label={`Page ${leadingPage}`}
                    >
                      {leadingPage}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {leftHidden.length > 0 && (
                  <PaginationItem>
                    <PaginationEllipsis
                      pages={leftHidden}
                      onPageSelect={onPageChange}
                    />
                  </PaginationItem>
                )}
                {pages.map((value) => (
                  <PaginationItem key={value}>
                    <PaginationLink
                      render={<button type="button" />}
                      isActive={page === value}
                      onClick={() => onPageChange?.(value)}
                      aria-label={`Page ${value}`}
                    >
                      {value}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {rightHidden.length > 0 && (
                  <PaginationItem>
                    <PaginationEllipsis
                      pages={rightHidden}
                      onPageSelect={onPageChange}
                    />
                  </PaginationItem>
                )}
                {trailingPage !== undefined && (
                  <PaginationItem>
                    <PaginationLink
                      render={<button type="button" />}
                      isActive={page === trailingPage}
                      onClick={() => onPageChange?.(trailingPage)}
                      aria-label={`Page ${trailingPage}`}
                    >
                      {trailingPage}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    render={<button type="button" />}
                    disabled={page >= totalPages}
                    onClick={() => onPageChange?.(page + 1)}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLast
                    render={<button type="button" />}
                    disabled={page >= totalPages}
                    onClick={() => onPageChange?.(totalPages)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
          <div
            ref={jumpRef}
            className={cn('shrink-0', compact && 'hidden')}
          >
            {jump ?? (
              <form
                className="flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  const value = new FormData(event.currentTarget).get(
                    'page',
                  );
                  commitJump(typeof value === 'string' ? value : '');
                }}
              >
                <label htmlFor={jumpId}>前往第</label>
                <Input
                  key={page}
                  id={jumpId}
                  name="page"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  required
                  defaultValue={page}
                  onBlur={(event) =>
                    commitJump(event.currentTarget.value)
                  }
                  onChange={digitsOnly}
                  className="w-[50px]"
                />
                <span>頁 / 共 {totalPages} 頁</span>
                <button
                  type="submit"
                  tabIndex={-1}
                  className="sr-only"
                >
                  前往
                </button>
              </form>
            )}
          </div>
        </div>
        {summary ?? (
          <div className="flex shrink-0 items-center gap-6">
            <div
              ref={pageSizeRef}
              className={cn(
                'flex items-center gap-2',
                compact && 'hidden',
              )}
            >
              <Select
                value={String(pageSize)}
                onValueChange={(value) => {
                  if (typeof value !== 'string') {
                    return;
                  }
                  onPageSizeChange?.(Number(value));
                }}
              >
                <SelectTrigger className="w-20" aria-label="每頁筆數">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>筆資料 / 頁</span>
            </div>
            <span aria-live="polite">
              第 {rangeStart} - {rangeEnd} 筆，共 {total} 筆
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
