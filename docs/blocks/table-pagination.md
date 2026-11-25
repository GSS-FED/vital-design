# Table Pagination

> Single-row table footer with page controls, a page jump, and rows per page.

## Preview

```tsx
import { TablePagination } from '@/blocks/table-pagination/table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useState } from 'react';

const STATUSES = ['Active', 'Done', 'Pending'] as const;
const OWNERS = ['Alex Chen', 'Riley Park', 'Jordan Lee'] as const;
const ROWS = Array.from({ length: 91 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  status: STATUSES[index % STATUSES.length],
  owner: OWNERS[index % OWNERS.length],
}));

export function TablePaginationExample() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const visibleRows = ROWS.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="w-full overflow-hidden rounded-md border border-grayscale-opacity-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        className="rounded-none"
        page={page}
        pageSize={pageSize}
        total={ROWS.length}
        onPageChange={setPage}
        onPageSizeChange={(nextPageSize) => {
          setPageSize(nextPageSize);
          setPage(1);
        }}
      />
    </div>
  );
}
```

## When to use

Use this block for the Vital table footer: page controls, a jump field, a page-size select, and the current range, in one row. When the row is too narrow, the jump field and the page-size select hide. The page controls and the range stay visible.

[Pagination](/docs/components/pagination) stays the primitive. Build a different footer from those parts when this row does not fit.

## Usage

Own `page`, `pageSize`, and `total` in the screen. Reset the page when the page size changes.

```tsx
import { TablePagination } from '@/blocks/table-pagination/table-pagination';
import { useState } from 'react';

export function OrdersFooter() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <TablePagination
      page={page}
      pageSize={pageSize}
      total={91}
      onPageChange={setPage}
      onPageSizeChange={(nextPageSize) => {
        setPageSize(nextPageSize);
        setPage(1);
      }}
    />
  );
}
```

`pagination`, `jump`, and `summary` replace those regions. The block does not render the table. Place it under [Table](/docs/components/table).

## Installation

```bash
npx shadcn@latest add @vital-design/table-pagination
```

This installs `src/blocks/table-pagination/table-pagination.tsx` and its Pagination, Input, and Select dependencies.
