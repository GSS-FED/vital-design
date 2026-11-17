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
import { useState } from 'react';

const totalPages = 5;

export function PaginationExample() {
  const [page, setPage] = useState(2);

  return (
    <Pagination>
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
        {[1, 2, 3, 4, 5].map((value) => (
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
  );
}
