# Table Pagination

> 單列的表格頁尾，含頁碼、跳頁與每頁筆數。

## 預覽

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

## 何時使用

表格頁尾要用 Vital 的單列排法時用這個 block：頁碼、跳頁、每頁筆數，以及目前範圍。列太窄時會隱藏跳頁和每頁筆數。頁碼與筆數範圍仍留在畫面上。

[Pagination](/docs/components/pagination) 仍是零件。這個列不合適時，用那些零件自己組。

## 用法

`page`、`pageSize`、`total` 由畫面管理。每頁筆數改變時把頁碼設回第 1 頁。

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

`pagination`、`jump`、`summary` 可整段換掉。這個 block 不渲染表格。把它放在 [Table](/zh-tw/docs/components/table) 下面。

## 安裝

```bash
npx shadcn@latest add @vital-design/table-pagination
```

會安裝 `src/blocks/table-pagination/table-pagination.tsx`，以及 Pagination、Input、Select 依賴。
