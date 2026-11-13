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
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function TablePaginationPreview() {
  const pathname = usePathname() ?? '';
  const chinese = pathname.startsWith('/zh-tw');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const rows = Array.from({ length: 91 }, (_, index) =>
    chinese
      ? {
          id: index + 1,
          name: `項目 ${index + 1}`,
          status:
            ['進行中', '已完成', '待處理'][index % 3] ?? '進行中',
          owner:
            ['王小明', '林安安', '陳大為'][index % 3] ?? '王小明',
        }
      : {
          id: index + 1,
          name: `Item ${index + 1}`,
          status:
            ['Active', 'Done', 'Pending'][index % 3] ?? 'Active',
          owner:
            ['Alex Chen', 'Riley Park', 'Jordan Lee'][index % 3] ??
            'Alex Chen',
        },
  );
  const visibleRows = rows.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const columns = chinese
    ? ['編號', '名稱', '狀態', '負責人']
    : ['No.', 'Name', 'Status', 'Owner'];

  return (
    <ComponentPreview
      name="TablePaginationPreview"
      align="stretch"
      minHeight="min-h-0"
      className="overflow-x-auto"
    >
      <div className="w-full overflow-hidden rounded-md border border-grayscale-opacity-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">{columns[0]}</TableHead>
              <TableHead>{columns[1]}</TableHead>
              <TableHead>{columns[2]}</TableHead>
              <TableHead>{columns[3]}</TableHead>
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
          total={rows.length}
          onPageChange={setPage}
          onPageSizeChange={(nextPageSize) => {
            setPageSize(nextPageSize);
            setPage(1);
          }}
        />
      </div>
    </ComponentPreview>
  );
}
