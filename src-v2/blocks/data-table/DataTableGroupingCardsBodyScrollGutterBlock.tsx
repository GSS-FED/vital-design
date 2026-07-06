import { Card } from '@/components/card/Card';
import { ToolbarGroup } from '@/components/toolbar/Toolbar';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import {
  type RowSelectionState,
  type SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { DataTable } from './DataTable';
import {
  ActionBar,
  type EsgTopic,
  FilterButton,
  PillarSummary,
  esgColumns,
  esgData,
} from './DataTableGrouping.demo';

const stickyInset = 'var(--datatable-sticky-inset, 24px)';

const stickyTableClassName = [
  'min-w-[1010px] table-fixed border-separate border-spacing-0',
  '[&_[data-slot=table-head]]:sticky [&_[data-slot=table-head]]:top-[54px] [&_[data-slot=table-head]]:z-20',
].join(' ');

const frozenColumnClassNames = {
  select: {
    head: 'left-[var(--datatable-sticky-inset,24px)] !z-40 before:absolute before:top-0 before:left-[calc(var(--datatable-sticky-inset,24px)*-1)] before:h-full before:w-[var(--datatable-sticky-inset,24px)] before:bg-white before:content-[""]',
    cell: 'sticky left-[var(--datatable-sticky-inset,24px)] z-20 bg-white before:absolute before:top-0 before:left-[calc(var(--datatable-sticky-inset,24px)*-1)] before:h-full before:w-[var(--datatable-sticky-inset,24px)] before:bg-white before:content-[""] group-hover:bg-[#f8f8f9] group-hover:before:bg-[#f8f8f9]',
  },
  id: {
    head: 'left-[calc(var(--datatable-sticky-inset,24px)+40px)] !z-40 after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-grayscale-opacity-300 after:content-[""]',
    cell: 'sticky left-[calc(var(--datatable-sticky-inset,24px)+40px)] z-20 bg-white group-hover:bg-[#f8f8f9] after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-grayscale-opacity-300 after:content-[""]',
  },
};

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
}: {
  pillar: EsgTopic['pillar'];
  rows: EsgTopic[];
}) {
  const [open, setOpen] = useState(true);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    {},
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: rows,
    columns: esgColumns,
    state: { rowSelection, sorting },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card className="min-w-[1010px] overflow-visible">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        style={{
          left: stickyInset,
          width: `min(1010px, calc(100vw - (${stickyInset} * 2)))`,
        }}
        className="sticky top-0 z-50 flex items-center gap-10 rounded-t border-b border-grayscale-opacity-300 bg-white py-2.5 text-left transition-colors hover:bg-grayscale-50"
      >
        <span className="flex flex-1 items-center">
          <span className="flex w-10 items-center justify-center py-2">
            <ChevronDownIcon
              className={`size-3 text-grayscale-opacity-600 transition-transform ${
                open ? '' : '-rotate-90'
              }`}
            />
          </span>
          <span className="text-sm font-medium leading-5 text-grayscale-opacity-800">
            {pillar}
          </span>
        </span>
        <PillarSummary rows={rows} />
      </button>
      {open && (
        <DataTable
          table={table}
          className={stickyTableClassName}
          containerClassName="overflow-visible"
          columnClassNames={frozenColumnClassNames}
        />
      )}
    </Card>
  );
}

export function DataTableGroupingCardsBodyScrollGutterBlock() {
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
    <div className="w-[1034px] max-w-none pr-6 [--datatable-sticky-inset:24px]">
      <div
        style={{
          left: stickyInset,
          width: `min(1010px, calc(100vw - (${stickyInset} * 2)))`,
        }}
        className="sticky z-[60]"
      >
        <ActionBar
          searchPlaceholder="搜尋"
          left={
            <ToolbarGroup>
              <FilterButton>分群：E/S/G</FilterButton>
              <FilterButton>篩選</FilterButton>
            </ToolbarGroup>
          }
          raised
        />
      </div>
      <div className="mt-4 w-[1010px] space-y-4 pb-3">
        {Array.from(grouped).map(([pillar, rows]) => {
          const scrollableRows = makeScrollableRows(rows);
          return (
            <PillarCard
              key={pillar}
              pillar={pillar}
              rows={scrollableRows}
            />
          );
        })}
      </div>
    </div>
  );
}
