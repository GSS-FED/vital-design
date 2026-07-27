import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { ToolbarGroup } from '@/components/toolbar/Toolbar';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import {
  type ColumnDef,
  type ColumnResizeMode,
  type ColumnSizingState,
  type RowSelectionState,
  type SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  type Dispatch,
  type SetStateAction,
  useMemo,
  useState,
} from 'react';
import { DataTable } from './DataTable';
import {
  ActionBar,
  type EsgTopic,
  FilterButton,
  PillarSummary,
  esgColumns,
  esgData,
} from './DataTableGrouping.demo';

// Sizes add up to the 1010px card so the table fills it exactly — with
// `table-fixed` the rendered width is the sum of the columns, nothing stretches.
const RESIZABLE_SIZES: Record<string, number> = {
  select: 40,
  id: 110,
  topic: 260,
  cycle: 80,
  owner: 80,
  reviewer: 80,
  progress: 150,
  due: 110,
  updated: 100,
};

const resizableEsgColumns: ColumnDef<EsgTopic>[] = esgColumns.map(
  (column) => {
    const id =
      column.id ??
      ('accessorKey' in column ? String(column.accessorKey) : '');
    const size = RESIZABLE_SIZES[id] ?? column.size;
    // The checkbox gutter is a fixed affordance, not data — nothing to widen.
    const canResize = id !== 'select';

    return {
      ...column,
      size,
      enableResizing: canResize,
      // A fixed column must also pin its bounds: `getSize()` clamps to
      // min/max, so the table-wide `defaultColumn.minSize` would otherwise
      // inflate a 40px gutter to 64px.
      ...(canResize ? null : { minSize: size, maxSize: size }),
    };
  },
);

function makeScrollableRows(rows: EsgTopic[]) {
  return Array.from({ length: 4 }, (_, groupIndex) =>
    rows.map((row) => ({
      ...row,
      id: row.id + groupIndex * 100,
      topic:
        groupIndex === 0
          ? row.topic
          : `${row.topic} ${groupIndex + 1}`,
    })),
  ).flat();
}

function PillarCard({
  pillar,
  rows,
  columnSizing,
  onColumnSizingChange,
  columnResizeMode,
}: {
  pillar: EsgTopic['pillar'];
  rows: EsgTopic[];
  columnSizing: ColumnSizingState;
  onColumnSizingChange: Dispatch<SetStateAction<ColumnSizingState>>;
  columnResizeMode: ColumnResizeMode;
}) {
  const [open, setOpen] = useState(true);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    {},
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: rows,
    columns: resizableEsgColumns,
    // Sorting and selection stay per-group; only the widths are shared, so a
    // drag in one card moves the same column in every other card live.
    state: { rowSelection, sorting, columnSizing },
    defaultColumn: { minSize: 64, maxSize: 480 },
    columnResizeMode,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnSizingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card className="w-[1010px]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-10 rounded-t border-b border-grayscale-opacity-300 bg-white py-2.5 text-left transition-colors hover:bg-grayscale-50"
      >
        <span className="flex flex-1 items-center">
          <span className="flex w-10 items-center justify-center py-2">
            <ChevronDownIcon
              className={`size-3 text-grayscale-opacity-600 transition-transform ${
                open ? '' : '-rotate-90'
              }`}
            />
          </span>
          <span className="text-sm leading-5 font-medium text-grayscale-opacity-800">
            {pillar}
          </span>
        </span>
        <PillarSummary rows={rows} />
      </button>
      {open && <DataTable table={table} resizable />}
    </Card>
  );
}

export interface DataTableGroupingResizableBlockProps {
  /**
   * `'onChange'` moves the columns under the pointer; `'onEnd'` holds them and
   * commits on release, with the guide line showing where the edge will land.
   */
  columnResizeMode?: ColumnResizeMode;
}

export function DataTableGroupingResizableBlock({
  columnResizeMode = 'onChange',
}: DataTableGroupingResizableBlockProps = {}) {
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>(
    {},
  );

  const grouped = useMemo(() => {
    const out = new Map<EsgTopic['pillar'], EsgTopic[]>();
    for (const topic of esgData) {
      const bucket = out.get(topic.pillar);
      if (bucket) bucket.push(topic);
      else out.set(topic.pillar, [topic]);
    }
    return out;
  }, []);

  return (
    <div className="w-[1010px] max-w-none">
      <ActionBar
        searchPlaceholder="搜尋"
        left={
          <ToolbarGroup>
            <FilterButton>分群：E/S/G</FilterButton>
            <FilterButton>篩選</FilterButton>
          </ToolbarGroup>
        }
        right={
          <Button
            variant="ghost"
            theme="default"
            className="h-8"
            disabled={Object.keys(columnSizing).length === 0}
            onClick={() => setColumnSizing({})}
          >
            重設欄寬
          </Button>
        }
        raised
      />
      <div className="mt-4 space-y-4 pb-3">
        {Array.from(grouped).map(([pillar, rows]) => (
          <PillarCard
            key={pillar}
            pillar={pillar}
            rows={makeScrollableRows(rows)}
            columnSizing={columnSizing}
            onColumnSizingChange={setColumnSizing}
            columnResizeMode={columnResizeMode}
          />
        ))}
      </div>
    </div>
  );
}
