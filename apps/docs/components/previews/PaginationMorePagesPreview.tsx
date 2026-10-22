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
import { Fragment, useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

// oxlint-disable jsx-a11y/control-has-associated-label -- useRender merges the accessible name onto this button
export function PaginationMorePagesPreview() {
  const [page, setPage] = useState(121);
  const totalPages = 200;
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter(
    (value) =>
      value === 1 ||
      value === totalPages ||
      Math.abs(value - page) <= 1 ||
      (page <= 3 && value <= 4) ||
      (page >= totalPages - 2 && value >= totalPages - 3),
  );

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
              {pages.map((value, index) => (
                <Fragment key={value}>
                  {index > 0 && value - pages[index - 1] > 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      render={<button type="button" />}
                      aria-label={`Page ${value}`}
                      isActive={page === value}
                      onClick={() => setPage(value)}
                    >
                      {value}
                    </PaginationLink>
                  </PaginationItem>
                </Fragment>
              ))}
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
