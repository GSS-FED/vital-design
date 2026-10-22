import { Input } from '@/components/input/input/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/Select';
import { cn } from '@/lib/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { Fragment, useState } from 'react';
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
} from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JYP7VpkGoqPdDqBeNPjK71/Vittal-Design?node-id=2511-6744',
    },
    controls: { disable: true },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

function PageNavigation({
  page,
  total,
  onPageChange,
  className,
}: {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const pages = Array.from(
    { length: total },
    (_, index) => index + 1,
  ).filter(
    (value) =>
      total <= 7 ||
      value === 1 ||
      value === total ||
      Math.abs(value - page) <= 1 ||
      (page <= 3 && value <= 4) ||
      (page >= total - 2 && value >= total - 3),
  );

  return (
    <Pagination className={cn('w-auto', className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            render={<button type="button" />}
            disabled={page === 1}
            onClick={() => onPageChange(1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            render={<button type="button" />}
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          />
        </PaginationItem>
        {pages.map((value, index) => (
          <Fragment key={value}>
            {index > 0 && value - pages[index - 1]! > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                render={<button type="button" />}
                isActive={page === value}
                onClick={() => onPageChange(value)}
                aria-label={`Page ${value}`}
              >
                {value}
              </PaginationLink>
            </PaginationItem>
          </Fragment>
        ))}
        <PaginationItem>
          <PaginationNext
            render={<button type="button" />}
            disabled={page === total}
            onClick={() => onPageChange(page + 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            render={<button type="button" />}
            disabled={page === total}
            onClick={() => onPageChange(total)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function InteractiveExample({
  total = 5,
  initialPage = 2,
}: {
  total?: number;
  initialPage?: number;
}) {
  const [page, setPage] = useState(initialPage);
  return (
    <PageNavigation
      page={page}
      total={total}
      onPageChange={setPage}
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveExample />,
};

export const MorePages: Story = {
  render: () => <InteractiveExample total={20} initialPage={12} />,
};

export const ThreeDigitPages: Story = {
  render: () => <InteractiveExample total={200} initialPage={121} />,
};

export const SinglePage: Story = {
  render: () => <InteractiveExample total={1} initialPage={1} />,
};

export const Links: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="?page=1">
            上一頁
          </PaginationPrevious>
        </PaginationItem>
        {[1, 2, 3].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={page === 2}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="?page=3">下一頁</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

function TableExample() {
  const totalItems = 91;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="w-full overflow-x-auto rounded-b border-t border-grayscale-opacity-200 bg-grayscale-opacity-100">
      <div className="flex w-max min-w-full items-center justify-between gap-6 px-4 py-2 font-sans text-sm leading-5 whitespace-nowrap text-grayscale-opacity-600">
        <PageNavigation
          className="mx-0 shrink-0"
          page={page}
          total={totalPages}
          onPageChange={setPage}
        />
        <form
          className="flex shrink-0 items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const value = Number(
              new FormData(event.currentTarget).get('page'),
            );
            setPage(Math.min(totalPages, Math.max(1, value)));
          }}
        >
          <label htmlFor="pagination-jump">前往第</label>
          <Input
            key={page}
            id="pagination-jump"
            name="page"
            type="number"
            min={1}
            max={totalPages}
            required
            defaultValue={page}
            className="w-[50px] px-3"
          />
          <span>頁 / 共 {totalPages} 頁</span>
          <button type="submit" tabIndex={-1} className="sr-only">
            前往
          </button>
        </form>
        <div className="flex shrink-0 items-center gap-6">
          <div className="flex items-center gap-2">
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-20" aria-label="每頁筆數">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>筆資料 / 頁</span>
          </div>
          <span aria-live="polite">
            第 {(page - 1) * pageSize + 1} -{' '}
            {Math.min(page * pageSize, totalItems)} 筆，共{' '}
            {totalItems} 筆
          </span>
        </div>
      </div>
    </div>
  );
}

export const TablePagination: Story = {
  parameters: { layout: 'padded' },
  render: () => <TableExample />,
};

export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      <InteractiveExample />
    </div>
  ),
};
