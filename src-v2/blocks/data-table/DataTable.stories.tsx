import { Avatar } from '@/components/avatar/Avatar';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { Checkbox } from '@/components/checkbox/Checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { SearchBar } from '@/components/search-bar/SearchBar';
import { Tag } from '@/components/tag/Tag';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
} from '@/components/toolbar/Toolbar';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { DataTable } from './DataTable';
import { DataTableColumnHeader } from './DataTableColumnHeader';

interface Task {
  id: number;
  topic: string;
  cycle: '每年' | '每季' | '每月';
  owner: string;
  reviewer: string;
  status: 'todo' | 'review' | 'done';
  due: string;
  updated: string;
}

const tasks: Task[] = [
  {
    id: 1,
    topic: '溫室氣體排放',
    cycle: '每年',
    owner: '張',
    reviewer: '張',
    status: 'done',
    due: '2025/03/01',
    updated: '1年前',
  },
  {
    id: 2,
    topic: '氣候相關議題管理',
    cycle: '每季',
    owner: '張',
    reviewer: '張',
    status: 'review',
    due: '2025/03/01',
    updated: '3個月前',
  },
  {
    id: 3,
    topic: '能源管理',
    cycle: '每月',
    owner: '張',
    reviewer: '蔡',
    status: 'todo',
    due: '2025/03/01',
    updated: '1個月前',
  },
  {
    id: 4,
    topic: '水資源管理',
    cycle: '每月',
    owner: 'AL',
    reviewer: '張',
    status: 'todo',
    due: '2025/03/01',
    updated: '1天前',
  },
  {
    id: 5,
    topic: '廢棄物管理',
    cycle: '每月',
    owner: '蔡',
    reviewer: '張',
    status: 'todo',
    due: '2025/03/01',
    updated: '1個月前',
  },
];

function StatusTag({ status }: { status: Task['status'] }) {
  if (status === 'done') return <Tag color="green">已完成</Tag>;
  if (status === 'review') return <Tag color="gold">待覆核</Tag>;
  return <Tag color="default">待填寫</Tag>;
}

type Story = StoryObj<typeof DataTable>;

const meta: Meta<typeof DataTable> = {
  title: 'Blocks/DataTable',
  component: DataTable,
};

export default meta;

const baseColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="編號" />
    ),
    cell: ({ row }) => (
      <span className="text-center">{row.original.id}</span>
    ),
    size: 72,
  },
  {
    accessorKey: 'topic',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="指標議題" />
    ),
    cell: ({ row }) => row.original.topic,
  },
  {
    accessorKey: 'cycle',
    header: '週期',
    cell: ({ row }) => row.original.cycle,
    size: 80,
    enableSorting: false,
  },
  {
    accessorKey: 'owner',
    header: '負責人',
    cell: ({ row }) => (
      <Avatar
        fallback={row.original.owner}
        name={row.original.owner}
        size="sm"
        color={row.original.owner === '蔡' ? 'orange' : 'tiffany'}
      />
    ),
    size: 96,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="狀態" />
    ),
    cell: ({ row }) => <StatusTag status={row.original.status} />,
    size: 120,
  },
  {
    accessorKey: 'due',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="期限" />
    ),
    cell: ({ row }) => row.original.due,
    size: 120,
  },
  {
    accessorKey: 'updated',
    header: '最後更新',
    cell: ({ row }) => row.original.updated,
    size: 100,
    enableSorting: false,
  },
];

export const Flat: Story = {
  render: function Render() {
    const columns = useMemo(() => baseColumns, []);
    const table = useReactTable({
      data: tasks,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <Card className="max-w-5xl">
        <DataTable table={table} />
      </Card>
    );
  },
};

export const Sortable: Story = {
  render: function Render() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const columns = useMemo(() => baseColumns, []);
    const table = useReactTable({
      data: tasks,
      columns,
      state: { sorting },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });

    return (
      <Card className="max-w-5xl">
        <DataTable table={table} />
      </Card>
    );
  },
};

export const Selectable: Story = {
  render: function Render() {
    const [rowSelection, setRowSelection] =
      useState<RowSelectionState>({});
    const columns = useMemo<ColumnDef<Task>[]>(
      () => [
        {
          id: 'select',
          header: ({ table }) => (
            <Checkbox
              aria-label="Select all"
              checked={table.getIsAllPageRowsSelected()}
              indeterminate={table.getIsSomePageRowsSelected()}
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(Boolean(value))
              }
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              aria-label={`Select row ${row.original.id}`}
              checked={row.getIsSelected()}
              onCheckedChange={(value) =>
                row.toggleSelected(Boolean(value))
              }
            />
          ),
          enableSorting: false,
          size: 40,
        },
        ...baseColumns,
      ],
      [],
    );

    const table = useReactTable({
      data: tasks,
      columns,
      state: { rowSelection },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <Card className="max-w-5xl">
        <DataTable table={table} />
      </Card>
    );
  },
};

export const WithToolbar: Story = {
  render: function Render() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] =
      useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns = useMemo(() => baseColumns, []);
    const table = useReactTable({
      data: tasks,
      columns,
      state: { globalFilter, columnFilters, sorting },
      onGlobalFilterChange: setGlobalFilter,
      onColumnFiltersChange: setColumnFilters,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });

    return (
      <Card className="max-w-5xl">
        <Toolbar size="sm" className="border-b border-grayscale-200">
          <SearchBar
            placeholder="搜尋議題"
            width="220px"
            onChange={(value) => setGlobalFilter(value)}
          />
          <ToolbarGroup>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="default" theme="default">
                    週期
                    <ChevronDownIcon data-icon="inline-end" />
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    table
                      .getColumn('cycle')
                      ?.setFilterValue(undefined)
                  }
                >
                  全部
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    table.getColumn('cycle')?.setFilterValue('每月')
                  }
                >
                  每月
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    table.getColumn('cycle')?.setFilterValue('每季')
                  }
                >
                  每季
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    table.getColumn('cycle')?.setFilterValue('每年')
                  }
                >
                  每年
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ToolbarGroup>
          <ToolbarSpacer />
          <Button variant="ghost">顯示欄位</Button>
        </Toolbar>
        <DataTable table={table} />
      </Card>
    );
  },
};
