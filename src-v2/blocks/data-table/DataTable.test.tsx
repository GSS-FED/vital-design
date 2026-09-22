import {
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { fireEvent, render, screen } from '@testing-library/react';
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

const resizableColumns: ColumnDef<Row>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => row.original.id,
    size: 100,
    enableResizing: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name,
    size: 200,
  },
];

function ResizableHarness({
  columnResizeMode = 'onChange',
}: {
  columnResizeMode?: 'onChange' | 'onEnd';
} = {}) {
  const [columnSizing, setColumnSizing] = useState({});
  const table = useReactTable({
    data,
    columns: resizableColumns,
    state: { columnSizing },
    defaultColumn: { minSize: 64, maxSize: 400 },
    columnResizeMode,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} resizable />;
}

function fireTouch(
  target: EventTarget,
  type: 'touchstart' | 'touchmove' | 'touchend',
  clientX: number,
) {
  const touch = { clientX, clientY: 0, identifier: 0, target };
  const event = new Event(type, { bubbles: true, cancelable: true });
  const touches = type === 'touchend' ? [] : [touch];
  Object.defineProperties(event, {
    touches: { value: touches },
    targetTouches: { value: touches },
    changedTouches: { value: [touch] },
  });
  fireEvent(target, event);
}

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

  it('renders no resize handles unless resizable is set', () => {
    render(<Harness />);
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  it('renders a resize handle only for columns that can resize', () => {
    render(<ResizableHarness />);
    const handles = screen.getAllByRole('separator');
    expect(handles).toHaveLength(1);
    expect(handles[0]).toHaveAccessibleName(/name/i);
    expect(handles[0]).toHaveAttribute('aria-valuenow', '200');
  });

  it('resizes with arrow keys and resets on Home', () => {
    render(<ResizableHarness />);
    const handle = screen.getByRole('separator');

    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(handle).toHaveAttribute('aria-valuenow', '208');

    fireEvent.keyDown(handle, { key: 'ArrowLeft', shiftKey: true });
    expect(handle).toHaveAttribute('aria-valuenow', '168');

    fireEvent.keyDown(handle, { key: 'Home' });
    expect(handle).toHaveAttribute('aria-valuenow', '200');
  });

  it('clamps keyboard resizing to minSize and maxSize', () => {
    render(<ResizableHarness />);
    const handle = screen.getByRole('separator');

    for (let i = 0; i < 10; i += 1) {
      fireEvent.keyDown(handle, { key: 'ArrowLeft', shiftKey: true });
    }
    expect(handle).toHaveAttribute('aria-valuenow', '64');

    for (let i = 0; i < 12; i += 1) {
      fireEvent.keyDown(handle, {
        key: 'ArrowRight',
        shiftKey: true,
      });
    }
    expect(handle).toHaveAttribute('aria-valuenow', '400');
  });

  it('marks only the grabbed handle as the drag guide', () => {
    render(<ResizableHarness />);
    const handle = screen.getByRole('separator');

    fireEvent.mouseDown(handle, { clientX: 300 });
    expect(handle).toHaveAttribute('data-guide');

    fireEvent.mouseUp(window);
    expect(handle).not.toHaveAttribute('data-guide');
  });

  it('clears the drag guide on touchend even when touches is empty', () => {
    render(<ResizableHarness />);
    const handle = screen.getByRole('separator');

    fireTouch(handle, 'touchstart', 300);
    expect(handle).toHaveAttribute('data-guide');

    fireTouch(handle, 'touchend', 340);
    expect(handle).not.toHaveAttribute('data-guide');
  });

  it('commits onEnd column size from changedTouches on touchend', () => {
    render(<ResizableHarness columnResizeMode="onEnd" />);
    const handle = screen.getByRole('separator');
    const table = screen.getByRole('table');

    fireTouch(handle, 'touchstart', 300);
    fireTouch(handle, 'touchend', 340);

    expect(handle).toHaveAttribute('aria-valuenow', '240');
    expect(table).toHaveStyle({ '--col-name-size': '240px' });
    expect(handle).not.toHaveAttribute('data-guide');
  });

  it('drives column widths through CSS variables on the table', () => {
    render(<ResizableHarness />);
    const table = screen.getByRole('table');
    expect(table).toHaveStyle({ '--col-name-size': '200px' });
    expect(table).toHaveStyle({ '--table-total-size': '300px' });
    // Pinned offsets ship as variables too, so pinned cells stay aligned while
    // the body is frozen mid-drag.
    expect(table).toHaveStyle({ '--col-name-start': '0px' });
    expect(table).toHaveStyle({ '--header-name-size': '200px' });
  });
});
