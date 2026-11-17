'use client';

import { TablePagination } from '@/blocks/table-pagination/components/table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/Table';
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
