import { cn } from '@/lib/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
  const current = Math.min(Math.max(page, 1), total);
  const groupStart = Math.floor((current - 1) / 5) * 5 + 1;
  const groupEnd = Math.min(total, groupStart + 4);
  const hasLeftGap = groupStart > 1;
  const hasRightGap = groupEnd < total;
  const bothGaps = hasLeftGap && hasRightGap;
  const pages = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, index) => groupStart + index,
  );
  const leadingPage = hasLeftGap && !bothGaps ? 1 : undefined;
  const trailingPage = hasRightGap && !bothGaps ? total : undefined;
  const leftHidden = hasLeftGap
    ? Array.from(
        { length: groupStart - (bothGaps ? 1 : 2) },
        (_, index) => (bothGaps ? 1 : 2) + index,
      )
    : [];
  const rightHidden = hasRightGap
    ? Array.from(
        {
          length: (bothGaps ? total : total - 1) - groupEnd,
        },
        (_, index) => groupEnd + 1 + index,
      )
    : [];

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
        {leadingPage !== undefined && (
          <PaginationItem>
            <PaginationLink
              render={<button type="button" />}
              isActive={page === leadingPage}
              onClick={() => onPageChange(leadingPage)}
              aria-label={`Page ${leadingPage}`}
            >
              {leadingPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {leftHidden.length > 0 && (
          <PaginationItem>
            <PaginationEllipsis
              pages={leftHidden}
              onPageSelect={onPageChange}
            />
          </PaginationItem>
        )}
        {pages.map((value) => (
          <PaginationItem key={value}>
            <PaginationLink
              render={<button type="button" />}
              isActive={page === value}
              onClick={() => onPageChange(value)}
              aria-label={`Page ${value}`}
            >
              {value}
            </PaginationLink>
          </PaginationItem>
        ))}
        {rightHidden.length > 0 && (
          <PaginationItem>
            <PaginationEllipsis
              pages={rightHidden}
              onPageSelect={onPageChange}
            />
          </PaginationItem>
        )}
        {trailingPage !== undefined && (
          <PaginationItem>
            <PaginationLink
              render={<button type="button" />}
              isActive={page === trailingPage}
              onClick={() => onPageChange(trailingPage)}
              aria-label={`Page ${trailingPage}`}
            >
              {trailingPage}
            </PaginationLink>
          </PaginationItem>
        )}
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

export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      <InteractiveExample />
    </div>
  ),
};
