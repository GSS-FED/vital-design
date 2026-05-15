import { Card } from '@/components/card/Card';
import { ToolbarGroup } from '@/components/toolbar/Toolbar';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import {
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  type CSSProperties,
  type RefObject,
  useLayoutEffect,
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
  'w-[1010px] table-fixed border-separate border-spacing-0 [&_[data-slot=table-head]]:sticky [&_[data-slot=table-head]]:top-[55px] [&_[data-slot=table-head]]:z-20';
const scrollGutter = 8;

const frozenColumnClassNames = {
  select: {
    head: 'sticky left-0 !z-40',
    cell: 'sticky left-0 z-20 bg-white group-hover:bg-[#f8f8f9]',
  },
  id: {
    head: 'sticky left-10 !z-40 after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-grayscale-300 after:content-[""]',
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

interface HeaderMeasure {
  id: string;
  start: number;
  width: number;
}

function measureHeaderCells(
  tableWrap: HTMLDivElement,
): HeaderMeasure[] {
  const heads = Array.from(
    tableWrap.querySelectorAll<HTMLElement>(
      '[data-slot="table-head"]',
    ),
  );
  let start = 0;

  return heads.map((head) => {
    const width = head.getBoundingClientRect().width;
    const measure = {
      id: head.dataset.columnId ?? '',
      start,
      width,
    };
    start += width;
    return measure;
  });
}

function useStickyHeaderStyle({
  cardRef,
  scrollRef,
  tableWrapRef,
}: {
  cardRef: RefObject<HTMLDivElement>;
  scrollRef: RefObject<HTMLDivElement>;
  tableWrapRef: RefObject<HTMLDivElement>;
}) {
  const [style, setStyle] = useState<CSSProperties | undefined>();
  const [headStyle, setHeadStyle] = useState<
    CSSProperties | undefined
  >();
  const [headerMeasures, setHeaderMeasures] = useState<
    HeaderMeasure[]
  >([]);

  useLayoutEffect(() => {
    let frame = 0;

    const updateMeasures = () => {
      const tableWrap = tableWrapRef.current;
      if (!tableWrap) return;

      const nextMeasures = measureHeaderCells(tableWrap);
      setHeaderMeasures(nextMeasures);
    };

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = cardRef.current;
        const scroller = scrollRef.current;
        if (!card || !scroller) return;

        const cardRect = card.getBoundingClientRect();
        const scrollRect = scroller.getBoundingClientRect();
        const contentLeft = scrollRect.left + scrollGutter;
        const contentWidth = scrollRect.width - scrollGutter * 2;
        const headerHeight = 55;
        const active =
          cardRect.top <= 0 && cardRect.bottom > headerHeight;

        updateMeasures();
        setStyle(
          active
            ? {
                position: 'fixed',
                top: 0,
                left: contentLeft,
                width: contentWidth,
              }
            : undefined,
        );
        setHeadStyle(
          active
            ? {
                position: 'fixed',
                top: headerHeight,
                left: contentLeft,
                width: contentWidth,
              }
            : undefined,
        );
      });
    };

    const updateNow = () => {
      const card = cardRef.current;
      const scroller = scrollRef.current;
      if (!card || !scroller) return;

      const cardRect = card.getBoundingClientRect();
      const scrollRect = scroller.getBoundingClientRect();
      const contentLeft = scrollRect.left + scrollGutter;
      const contentWidth = scrollRect.width - scrollGutter * 2;
      const headerHeight = 55;
      const active =
        cardRect.top <= 0 && cardRect.bottom > headerHeight;

      updateMeasures();
      setStyle(
        active
          ? {
              position: 'fixed',
              top: 0,
              left: contentLeft,
              width: contentWidth,
            }
          : undefined,
      );
      setHeadStyle(
        active
          ? {
              position: 'fixed',
              top: headerHeight,
              left: contentLeft,
              width: contentWidth,
            }
          : undefined,
      );
    };

    updateNow();
    const scroller = scrollRef.current;
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    scroller?.addEventListener('scroll', update, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      scroller?.removeEventListener('scroll', update);
      cancelAnimationFrame(frame);
    };
  }, [cardRef, scrollRef, tableWrapRef]);

  return { headStyle, headerMeasures, style };
}

function StickyHeaderOverlay({
  headerMeasures,
  table,
  scrollRef,
  style,
}: {
  headerMeasures: HeaderMeasure[];
  table: ReturnType<typeof useReactTable<EsgTopic>>;
  scrollRef: RefObject<HTMLDivElement>;
  style: CSSProperties;
}) {
  const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
  const headerGroup = table.getHeaderGroups()[0];

  if (
    !headerGroup ||
    headerMeasures.length !== headerGroup.headers.length
  ) {
    return null;
  }

  const lastMeasure = headerMeasures[headerMeasures.length - 1];
  if (!lastMeasure) return null;

  const tableWidth = lastMeasure.start + lastMeasure.width;
  const frozenMeasures = headerMeasures.slice(0, 2);

  return (
    <div
      aria-hidden="true"
      style={style}
      className="pointer-events-none z-40 h-8 overflow-hidden bg-white will-change-transform"
    >
      <div
        className="relative h-8 will-change-transform"
        style={{
          transform: `translateX(${-scrollLeft}px)`,
          width: tableWidth,
        }}
      >
        {headerGroup.headers.map((header, index) => {
          const measure = headerMeasures[index];
          if (!measure) return null;

          return (
            <div
              key={header.id}
              data-overlay-header-cell={measure.id}
              className="absolute top-0 flex h-8 items-center border-r border-b border-grayscale-300 bg-white px-3 py-1.5 text-left text-sm leading-5 font-normal whitespace-nowrap text-grayscale-800"
              style={{ left: measure.start, width: measure.width }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </div>
          );
        })}
      </div>
      <div className="absolute top-0 left-0 z-10 flex h-8 bg-white">
        {headerGroup.headers.slice(0, 2).map((header, index) => {
          const measure = frozenMeasures[index];
          if (!measure) return null;

          return (
            <div
              key={header.id}
              data-overlay-header-cell={measure.id}
              className="flex h-8 items-center border-r border-b border-grayscale-300 bg-white px-3 py-1.5 text-left text-sm leading-5 font-normal whitespace-nowrap text-grayscale-800"
              style={{ width: measure.width }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PillarCard({
  pillar,
  rows,
  scrollRef,
}: {
  pillar: EsgTopic['pillar'];
  rows: EsgTopic[];
  scrollRef: RefObject<HTMLDivElement>;
}) {
  const [open, setOpen] = useState(true);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    {},
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const tableWrapRef = useRef<HTMLDivElement>(null);
  const {
    headStyle,
    headerMeasures,
    style: stickyHeaderStyle,
  } = useStickyHeaderStyle({
    cardRef,
    scrollRef,
    tableWrapRef,
  });
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
    <Card ref={cardRef} className="w-[1010px] overflow-visible">
      <div className="h-[55px]">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          style={stickyHeaderStyle}
          className="z-50 flex h-[55px] w-[min(1010px,calc(100vw-48px))] items-center gap-10 rounded-t border-b border-grayscale-300 bg-white py-2.5 text-left transition-colors hover:bg-grayscale-50"
        >
          <span className="flex flex-1 items-center">
            <span className="flex w-10 items-center justify-center py-2">
              <ChevronDownIcon
                className={`size-3 text-grayscale-600 transition-transform ${
                  open ? '' : '-rotate-90'
                }`}
              />
            </span>
            <span className="text-sm font-medium leading-5 text-grayscale-800">
              {pillar}
            </span>
          </span>
          <PillarSummary rows={rows} />
        </button>
      </div>
      {open && (
        <>
          {headStyle ? (
            <StickyHeaderOverlay
              headerMeasures={headerMeasures}
              table={table}
              scrollRef={scrollRef}
              style={headStyle}
            />
          ) : null}
          <div ref={tableWrapRef}>
            <DataTable
              table={table}
              className={tableClassName}
              containerClassName="overflow-visible"
              columnClassNames={frozenColumnClassNames}
            />
          </div>
        </>
      )}
    </Card>
  );
}

export function DataTableGroupingCardsJsStickyBlock() {
  const scrollRef = useRef<HTMLDivElement>(null);
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
    <div className="max-w-[1010px]">
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
      <div
        ref={scrollRef}
        className="-mx-2 mt-4 overflow-x-auto px-2 pt-2 pb-4"
      >
        <div className="w-[1010px] space-y-4">
          {Array.from(grouped).map(([pillar, rows]) => {
            const scrollableRows = makeScrollableRows(rows);
            return (
              <PillarCard
                key={pillar}
                pillar={pillar}
                rows={scrollableRows}
                scrollRef={scrollRef}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
