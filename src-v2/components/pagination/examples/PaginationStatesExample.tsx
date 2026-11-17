'use client';

import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/pagination/Pagination';

const states = [
  { label: 'Single page', page: 1, totalPages: 1 },
  { label: 'Right to left', page: 2, totalPages: 5, dir: 'rtl' },
] as const;

export function PaginationStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map((state) => (
        <div key={state.label} className="contents">
          <span>{state.label}</span>
          <div dir={'dir' in state ? state.dir : undefined}>
            <Pagination aria-label={state.label}>
              <PaginationContent>
                <PaginationItem>
                  <PaginationFirst
                    render={<button type="button" />}
                    disabled={state.page === 1}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious
                    render={<button type="button" />}
                    disabled={state.page === 1}
                  />
                </PaginationItem>
                {Array.from(
                  { length: state.totalPages },
                  (_, index) => index + 1,
                ).map((value) => (
                  <PaginationItem key={value}>
                    <PaginationLink
                      render={<button type="button" />}
                      aria-label={`Page ${value}`}
                      isActive={state.page === value}
                    >
                      {value}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    render={<button type="button" />}
                    disabled={state.page === state.totalPages}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLast
                    render={<button type="button" />}
                    disabled={state.page === state.totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      ))}
    </div>
  );
}
