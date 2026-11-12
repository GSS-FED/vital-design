import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/Table';
import { DocsContainer } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentProps, useState } from 'react';
import { TablePagination } from './components/table-pagination';

const STATUSES = ['進行中', '已完成', '待處理'] as const;
const OWNERS = ['王小明', '林安安', '陳大為'] as const;
const ROWS = Array.from({ length: 91 }, (_, index) => ({
  id: index + 1,
  name: `項目 ${index + 1}`,
  status: STATUSES[index % STATUSES.length]!,
  owner: OWNERS[index % OWNERS.length]!,
}));

function WideDocsContainer({
  children,
  ...props
}: ComponentProps<typeof DocsContainer>) {
  return (
    <DocsContainer {...props}>
      <style>{'.sbdocs-content { max-width: none; }'}</style>
      {children}
    </DocsContainer>
  );
}

const meta = {
  title: 'Blocks/Table Pagination',
  component: TablePagination,
  parameters: {
    layout: 'padded',
    docs: { container: WideDocsContainer },
  },
} satisfies Meta<typeof TablePagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: 1,
    pageSize: 10,
    total: 91,
  },
  render: function Render() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const visibleRows = ROWS.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    return (
      <div className="overflow-hidden rounded-md border border-grayscale-opacity-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">編號</TableHead>
              <TableHead>名稱</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>負責人</TableHead>
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
  },
};
