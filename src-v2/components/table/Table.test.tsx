import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

it('renders all primitives with data-slot attributes', () => {
  render(
    <Table data-testid="table">
      <TableCaption data-testid="caption">Caption</TableCaption>
      <TableHeader data-testid="thead">
        <TableRow data-testid="head-row">
          <TableHead data-testid="th">Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody data-testid="tbody">
        <TableRow data-testid="body-row">
          <TableCell data-testid="td">Ada</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter data-testid="tfoot">
        <TableRow>
          <TableCell>Total</TableCell>
        </TableRow>
      </TableFooter>
    </Table>,
  );

  expect(screen.getByTestId('table')).toHaveAttribute(
    'data-slot',
    'table',
  );
  expect(screen.getByTestId('thead')).toHaveAttribute(
    'data-slot',
    'table-header',
  );
  expect(screen.getByTestId('tbody')).toHaveAttribute(
    'data-slot',
    'table-body',
  );
  expect(screen.getByTestId('tfoot')).toHaveAttribute(
    'data-slot',
    'table-footer',
  );
  expect(screen.getByTestId('head-row')).toHaveAttribute(
    'data-slot',
    'table-row',
  );
  expect(screen.getByTestId('th')).toHaveAttribute(
    'data-slot',
    'table-head',
  );
  expect(screen.getByTestId('td')).toHaveAttribute(
    'data-slot',
    'table-cell',
  );
  expect(screen.getByTestId('caption')).toHaveAttribute(
    'data-slot',
    'table-caption',
  );
});

it('marks selected rows with data-state="selected"', () => {
  render(
    <Table>
      <TableBody>
        <TableRow data-state="selected" data-testid="row">
          <TableCell>Cell</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );

  const row = screen.getByTestId('row');
  expect(row).toHaveAttribute('data-state', 'selected');
  expect(row).toHaveClass('data-[state=selected]:bg-grayscale-100');
});

it('applies custom className to each part', () => {
  render(
    <Table className="my-table" data-testid="table">
      <TableHeader className="my-thead" data-testid="thead">
        <TableRow className="my-row" data-testid="row">
          <TableHead className="my-head" data-testid="th">
            Head
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="my-cell" data-testid="td">
            Cell
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );

  expect(screen.getByTestId('table')).toHaveClass('my-table');
  expect(screen.getByTestId('thead')).toHaveClass('my-thead');
  expect(screen.getByTestId('row')).toHaveClass('my-row');
  expect(screen.getByTestId('th')).toHaveClass('my-head');
  expect(screen.getByTestId('td')).toHaveClass('my-cell');
});
