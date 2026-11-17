'use client';

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
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

// oxlint-disable jsx-a11y/control-has-associated-label -- useRender merges the accessible name onto this button
export function PaginationMorePagesPreview() {
  const [page, setPage] = useState(121);
  const totalPages = 200;
  const current = Math.min(Math.max(page, 1), totalPages);
  const groupStart = Math.floor((current - 1) / 5) * 5 + 1;
  const groupEnd = Math.min(totalPages, groupStart + 4);
  const hasLeftGap = groupStart > 1;
  const hasRightGap = groupEnd < totalPages;
  const bothGaps = hasLeftGap && hasRightGap;
  const pages = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, index) => groupStart + index,
  );
  const leadingPage = hasLeftGap && !bothGaps ? 1 : undefined;
  const trailingPage =
    hasRightGap && !bothGaps ? totalPages : undefined;
  const leftHidden = hasLeftGap
    ? Array.from(
        { length: groupStart - (bothGaps ? 1 : 2) },
        (_, index) => (bothGaps ? 1 : 2) + index,
      )
    : [];
  const rightHidden = hasRightGap
    ? Array.from(
        {
          length: (bothGaps ? totalPages : totalPages - 1) - groupEnd,
        },
        (_, index) => groupEnd + 1 + index,
      )
    : [];

  return (
    <ComponentPreview name="PaginationMorePagesPreview">
      <div className="flex max-w-full flex-col items-center gap-4">
        <div className="max-w-full overflow-x-auto p-1">
          <Pagination aria-label="More pages pagination">
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  render={<button type="button" />}
                  disabled={page === 1}
                  onClick={() => setPage(1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  render={<button type="button" />}
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                />
              </PaginationItem>
              {leadingPage !== undefined && (
                <PaginationItem>
                  <PaginationLink
                    render={<button type="button" />}
                    aria-label={`Page ${leadingPage}`}
                    isActive={page === leadingPage}
                    onClick={() => setPage(leadingPage)}
                  >
                    {leadingPage}
                  </PaginationLink>
                </PaginationItem>
              )}
              {leftHidden.length > 0 && (
                <PaginationItem>
                  <PaginationEllipsis
                    pages={leftHidden}
                    onPageSelect={setPage}
                  />
                </PaginationItem>
              )}
              {pages.map((value) => (
                <PaginationItem key={value}>
                  <PaginationLink
                    render={<button type="button" />}
                    aria-label={`Page ${value}`}
                    isActive={page === value}
                    onClick={() => setPage(value)}
                  >
                    {value}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {rightHidden.length > 0 && (
                <PaginationItem>
                  <PaginationEllipsis
                    pages={rightHidden}
                    onPageSelect={setPage}
                  />
                </PaginationItem>
              )}
              {trailingPage !== undefined && (
                <PaginationItem>
                  <PaginationLink
                    render={<button type="button" />}
                    aria-label={`Page ${trailingPage}`}
                    isActive={page === trailingPage}
                    onClick={() => setPage(trailingPage)}
                  >
                    {trailingPage}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  render={<button type="button" />}
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  render={<button type="button" />}
                  disabled={page === totalPages}
                  onClick={() => setPage(totalPages)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <p
          aria-live="polite"
          className="text-sm text-grayscale-opacity-600"
        >
          Page {page} of {totalPages}
        </p>
      </div>
    </ComponentPreview>
  );
}
