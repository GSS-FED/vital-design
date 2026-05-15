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
import {
  type RefCallback,
  type UIEvent,
  useCallback,
  useMemo,
  useRef,
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

const tableClassName =
  'w-[1010px] table-fixed border-separate border-spacing-0';

const frozenColumnClassNames = {
  select: {
    head: 'sticky left-0 z-30',
    cell: 'sticky left-0 z-20 bg-white group-hover:bg-[#f8f8f9]',
  },
  id: {
    head: 'sticky left-10 z-30 after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-grayscale-300 after:content-[""]',
    cell: 'sticky left-10 z-20 bg-white group-hover:bg-[#f8f8f9] after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-grayscale-300 after:content-[""]',
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
  onScroll,
  pillar,
  registerScroller,
  rows,
}: {
  onScroll: (pillar: EsgTopic['pillar'], scrollLeft: number) => void;
  pillar: EsgTopic['pillar'];
  registerScroller: (
    pillar: EsgTopic['pillar'],
  ) => RefCallback<HTMLDivElement>;
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

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    onScroll(pillar, event.currentTarget.scrollLeft);
  };

  return (
    <Card className="w-[min(1010px,calc(100vw-48px))] overflow-visible">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="sticky top-0 z-50 flex h-[55px] w-full items-center gap-10 rounded-t border-b border-grayscale-300 bg-white py-2.5 text-left transition-colors hover:bg-grayscale-50"
      >
        <span className="flex flex-1 items-center">
          <span className="flex w-10 items-center justify-center py-2">
            <ChevronDownIcon
              className={`size-3 text-grayscale-600 transition-transform ${
                open ? '' : '-rotate-90'
              }`}
            />
          </span>
          <span className="text-sm leading-5 font-medium text-grayscale-800">
            {pillar}
          </span>
        </span>
        <PillarSummary rows={rows} />
      </button>
      {open && (
        <div
          ref={registerScroller(pillar)}
          onScroll={handleScroll}
          className="overflow-x-auto"
        >
          <DataTable
            table={table}
            className={tableClassName}
            containerClassName="overflow-visible"
            columnClassNames={frozenColumnClassNames}
          />
        </div>
      )}
    </Card>
  );
}

export function DataTableGroupingCardsBlock() {
  const scrollersRef = useRef(
    new Map<EsgTopic['pillar'], HTMLDivElement>(),
  );
  const syncingRef = useRef(false);
  const grouped = useMemo(() => {
    const out = new Map<EsgTopic['pillar'], EsgTopic[]>();
    for (const topic of esgData) {
      const bucket = out.get(topic.pillar);
      if (bucket) bucket.push(topic);
      else out.set(topic.pillar, [topic]);
    }
    return out;
  }, []);

  const registerScroller = useCallback(
    (pillar: EsgTopic['pillar']) => (node: HTMLDivElement | null) => {
      if (node) scrollersRef.current.set(pillar, node);
      else scrollersRef.current.delete(pillar);
    },
    [],
  );

  const handleScroll = useCallback(
    (source: EsgTopic['pillar'], scrollLeft: number) => {
      if (syncingRef.current) return;

      syncingRef.current = true;
      for (const [pillar, scroller] of scrollersRef.current) {
        if (pillar !== source && scroller.scrollLeft !== scrollLeft) {
          scroller.scrollLeft = scrollLeft;
        }
      }
      syncingRef.current = false;
    },
    [],
  );

  return (
    <div className="w-[min(1010px,calc(100vw-48px))] max-w-none pb-3">
      <div className="sticky left-0 z-[60]">
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
      <div className="mt-4 space-y-4 pb-3">
        {Array.from(grouped).map(([pillar, rows]) => {
          const scrollableRows = makeScrollableRows(rows);
          return (
            <PillarCard
              key={pillar}
              onScroll={handleScroll}
              pillar={pillar}
              registerScroller={registerScroller}
              rows={scrollableRows}
            />
          );
        })}
      </div>
    </div>
  );
}
