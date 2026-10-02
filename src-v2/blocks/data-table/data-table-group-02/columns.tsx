import { Avatar } from '@/components/avatar/Avatar';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { Switch } from '@/components/switch/Switch';
import { Tag } from '@/components/tag/Tag';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreButton } from './action-bar';
import type { EmissionTreeRow } from './data';
import { DataTableColumnHeader } from './data-table-column-header';

export const emissionColumns: ColumnDef<EmissionTreeRow>[] = [
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
    size: 40,
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="序" />
    ),
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.id : null,
    size: 38,
    enableSorting: false,
  },
  {
    id: 'source',
    accessorFn: (row) => (row.kind === 'source' ? row.source : ''),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="排放源" />
    ),
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.source : null,
    size: 164,
  },
  {
    id: 'formula',
    accessorFn: (row) => (row.kind === 'source' ? row.formula : ''),
    header: '係數名稱',
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.formula : null,
    size: 312,
    enableSorting: false,
  },
  {
    id: 'count',
    accessorFn: (row) => (row.kind === 'source' ? row.count : 0),
    header: '據點數',
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.count : null,
    size: 66,
    enableSorting: false,
  },
  {
    id: 'owner',
    accessorFn: (row) => (row.kind === 'source' ? row.owner : ''),
    header: '負責人',
    cell: ({ row }) =>
      row.original.kind !== 'source' ? null : row.original.owner ===
        '未指派' ? (
        <Avatar fallback="?" size="sm" color="orange" />
      ) : (
        <Avatar
          fallback={row.original.owner}
          name={row.original.owner}
          size="sm"
          color="tiffany"
        />
      ),
    size: 102,
    enableSorting: false,
  },
  {
    id: 'reviewer',
    accessorFn: (row) => (row.kind === 'source' ? row.reviewer : ''),
    header: '審核人',
    cell: ({ row }) =>
      row.original.kind !== 'source' ? null : row.original
          .reviewer === '未指派' ? (
        <Avatar fallback="?" size="sm" color="orange" />
      ) : (
        <Avatar
          fallback={row.original.reviewer}
          name={row.original.reviewer}
          size="sm"
          color="tiffany"
        />
      ),
    size: 102,
    enableSorting: false,
  },
  {
    id: 'template',
    accessorFn: (row) => (row.kind === 'source' ? row.template : ''),
    header: '填報樣板',
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.template : null,
    size: 116,
    enableSorting: false,
  },
  {
    id: 'reference',
    accessorFn: (row) =>
      row.kind === 'source' ? row.reference : null,
    header: '引用排放源',
    cell: ({ row }) =>
      row.original.kind === 'source' ? row.original.reference : null,
    size: 104,
    enableSorting: false,
  },
  {
    id: 'tag',
    accessorFn: (row) => (row.kind === 'source' ? row.tag : null),
    header: '標籤',
    cell: ({ row }) =>
      row.original.kind === 'source' && row.original.tag ? (
        <Tag color="gold" colorVariant="tint">
          {row.original.tag}
        </Tag>
      ) : null,
    size: 76,
    enableSorting: false,
  },
  {
    id: 'significant',
    header: '重大',
    cell: () => null,
    size: 48,
    enableSorting: false,
  },
  {
    id: 'quantified',
    header: '量化',
    cell: ({ row }) =>
      row.original.kind === 'source' ? (
        <Switch defaultChecked={row.original.quantified} />
      ) : null,
    size: 68,
    enableSorting: false,
  },
  {
    id: 'note',
    header: '備註',
    cell: () => null,
    size: 48,
    enableSorting: false,
  },
  {
    id: 'actions',
    header: '',
    cell: () => <MoreButton />,
    size: 36,
    enableSorting: false,
  },
];
