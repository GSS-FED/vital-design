import {
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { DataTable } from './DataTable';
import { DataTableColumnHeader } from './DataTableColumnHeader';

interface Row {
  id: number;
  name: string;
}

const data: Row[] = [
  { id: 1, name: 'Bravo' },
  { id: 2, name: 'Alpha' },
];

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => row.original.name,
  },
];

function Harness({ initialData = data }: { initialData?: Row[] }) {
  const [sorting, setSorting] = useState<
    { id: string; desc: boolean }[]
  >([]);
  const table = useReactTable({
    data: initialData,
    columns,
    state: { sorting },
    onSortingChange: (updater) =>
      setSorting((s) =>
        typeof updater === 'function' ? updater(s) : updater,
      ),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return <DataTable table={table} />;
}

describe('DataTable', () => {
  it('renders rows from a react-table instance', () => {
    render(<Harness />);
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('shows the empty message when there are no rows', () => {
    render(<Harness initialData={[]} />);
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('toggles sort order when a sortable column header is clicked', async () => {
    render(<Harness />);
    const rowsBefore = screen.getAllByRole('row');
    // header row + 2 data rows
    expect(rowsBefore).toHaveLength(3);
    expect(rowsBefore[1]).toHaveTextContent('Bravo');

    await userEvent.click(
      screen.getByRole('button', { name: /name/i }),
    );

    const rowsAfter = screen.getAllByRole('row');
    expect(rowsAfter[1]).toHaveTextContent('Alpha');
  });
});
