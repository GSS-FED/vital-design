import {
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { expect, it, vi } from 'vitest';
import { TablePagination } from './components/table-pagination';

function Harness({
  total = 91,
  onPageChange,
  onPageSizeChange,
}: {
  total?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <TablePagination
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={(nextPage) => {
        setPage(nextPage);
        onPageChange?.(nextPage);
      }}
      onPageSizeChange={(nextPageSize) => {
        setPageSize(nextPageSize);
        onPageSizeChange?.(nextPageSize);
      }}
    />
  );
}

it('renders one footer row with the current range', () => {
  render(<Harness />);

  expect(
    screen.getByRole('navigation', { name: 'pagination' }),
  ).toHaveClass('w-auto');
  expect(
    screen.getByText('第 1 - 10 筆，共 91 筆'),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Go to first page' }),
  ).toHaveAttribute('aria-disabled', 'true');
});

it('changes page from the page controls and the jump field', async () => {
  const user = userEvent.setup();
  const onPageChange = vi.fn();
  render(<Harness onPageChange={onPageChange} />);

  await user.click(screen.getByRole('button', { name: 'Page 2' }));
  expect(onPageChange).toHaveBeenLastCalledWith(2);
  expect(
    screen.getByText('第 11 - 20 筆，共 91 筆'),
  ).toBeInTheDocument();

  const jump = screen.getByRole('textbox', { name: '前往第' });
  expect(jump).not.toHaveAttribute('type', 'number');
  await user.clear(jump);
  await user.type(jump, 'a4b');
  expect(jump).toHaveValue('4');
  await user.click(screen.getByRole('button', { name: '前往' }));
  expect(onPageChange).toHaveBeenLastCalledWith(4);
});

it('keeps the selected page inside its group of five', async () => {
  render(<TablePagination page={9} pageSize={10} total={200} />);

  for (const value of [6, 7, 8, 9, 10]) {
    expect(
      screen.getByRole('button', { name: `Page ${value}` }),
    ).toBeInTheDocument();
  }
  expect(
    screen.getByRole('button', { name: 'Page 9' }),
  ).toHaveAttribute('aria-current', 'page');
  expect(
    screen.getByRole('button', { name: 'Go to first page' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Go to last page' }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Page 1' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Page 20' }),
  ).not.toBeInTheDocument();

  const user = userEvent.setup();
  const [previousPages, nextPages] = screen.getAllByRole('button', {
    name: 'More pages',
  });
  await user.click(previousPages!);
  expect(
    await screen.findByRole('menuitem', { name: '1' }),
  ).toBeInTheDocument();
  await user.keyboard('{Escape}');
  await user.click(nextPages!);
  expect(
    await screen.findByRole('menuitem', { name: '20' }),
  ).toBeInTheDocument();
});

it('shows the five-page group that contains page 17', () => {
  render(<TablePagination page={17} pageSize={10} total={250} />);

  for (const value of [16, 17, 18, 19, 20]) {
    expect(
      screen.getByRole('button', { name: `Page ${value}` }),
    ).toBeInTheDocument();
  }
  expect(
    screen.getByRole('button', { name: 'Page 17' }),
  ).toHaveAttribute('aria-current', 'page');
  expect(
    screen.queryByRole('button', { name: 'Page 1' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Page 25' }),
  ).not.toBeInTheDocument();
});

it('opens the hidden pages from the ellipsis menu', async () => {
  const user = userEvent.setup();
  const onPageChange = vi.fn();
  render(<Harness onPageChange={onPageChange} />);

  expect(
    within(screen.getByRole('navigation'))
      .getAllByRole('button')
      .map((button) => button.getAttribute('aria-label')),
  ).toEqual([
    'Go to first page',
    'Go to previous page',
    'Page 1',
    'Page 2',
    'Page 3',
    'Page 4',
    'Page 5',
    'More pages',
    'Page 10',
    'Go to next page',
    'Go to last page',
  ]);

  await user.click(
    screen.getByRole('button', { name: 'More pages' }),
  );
  expect(
    screen.getByRole('button', { name: 'Page 5' }),
  ).toBeInTheDocument();
  expect(
    await screen.findByRole('menuitem', { name: '6' }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('menuitem', { name: '5' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('menuitem', { name: '10' }),
  ).not.toBeInTheDocument();

  await user.click(screen.getByRole('menuitem', { name: '6' }));
  await waitFor(() => {
    expect(onPageChange).toHaveBeenLastCalledWith(6);
  });
  expect(
    screen.getByText('第 51 - 60 筆，共 91 筆'),
  ).toBeInTheDocument();
});

it('jumps when the page field loses focus', async () => {
  const user = userEvent.setup();
  const onPageChange = vi.fn();
  render(<Harness onPageChange={onPageChange} />);

  const jump = screen.getByRole('textbox', { name: '前往第' });
  await user.clear(jump);
  await user.type(jump, '5');
  await user.tab();

  expect(onPageChange).toHaveBeenLastCalledWith(5);
  expect(
    screen.getByText('第 41 - 50 筆，共 91 筆'),
  ).toBeInTheDocument();
});

it('reports the selected page size', async () => {
  const user = userEvent.setup();
  const onPageSizeChange = vi.fn();
  render(<Harness onPageSizeChange={onPageSizeChange} />);

  await user.click(
    screen.getByRole('combobox', { name: '每頁筆數' }),
  );
  await user.click(await screen.findByRole('option', { name: '20' }));

  expect(onPageSizeChange).toHaveBeenCalledWith(20);
});

it('replaces a region when a slot is passed', () => {
  render(
    <TablePagination
      page={1}
      pageSize={10}
      total={91}
      pagination={<p>自訂頁碼</p>}
    />,
  );

  expect(screen.getByText('自訂頁碼')).toBeInTheDocument();
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});
