import { Checkbox } from '@/components/checkbox/Checkbox';
import { TableCell, TableRow } from '@/components/table/Table';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { cn } from '@/lib/utils';

/**
 * The bar itself is h-9 (36px) or h-11 (44px). A table cell treats
 * that as a minimum and adds its 1px bottom border, so the rows
 * occupy 37px and 45px. Each deeper group sticks under the ones above it.
 */
const ROOT_GROUP_HEIGHT = 37;
const NESTED_GROUP_HEIGHT = 45;

/** Empty track before a nested group. One track per ancestor. */
export const NESTED_GUTTER = 40;

export function groupStickyTop(depth: number): number {
  if (depth <= 0) return 0;
  return ROOT_GROUP_HEIGHT + (depth - 1) * NESTED_GROUP_HEIGHT;
}

/** Column header sticks just under the group it belongs to. */
export function columnHeaderStickyTop(depth: number): number {
  return groupStickyTop(depth + 1);
}

function groupChrome(depth: number) {
  const root = depth === 0;
  return {
    row: root
      ? 'sticky z-30 bg-[#f8f8f9] hover:bg-grayscale-200'
      : 'sticky z-20 bg-white hover:bg-grayscale-opacity-100',
    bar: root ? 'h-9 bg-[#f8f8f9]' : 'h-11 bg-white',
    title: root
      ? 'font-medium text-grayscale-opacity-900'
      : 'font-medium text-grayscale-opacity-800',
  };
}

/**
 * Vertical spine for a second-level group. `branch` turns off toward the title.
 * The last group keeps only that turn. The line does not run on through its table.
 */
export function NestingRail({
  branch = false,
  continued = true,
}: {
  branch?: boolean;
  continued?: boolean;
}) {
  if (!branch && !continued) return null;

  return (
    <>
      {continued ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-px -bottom-px left-[calc(100%-12px)] w-px bg-border"
        />
      ) : null}
      {branch ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-[22px] w-3 rounded-bl-[8px] border-b border-l border-border"
        />
      ) : null}
    </>
  );
}

/**
 * One cell per nesting level. `rails[i]` keeps that ancestor's line
 * going. The branch sits on the innermost cell.
 */
export function GutterCells({
  rails,
  branch = false,
  className,
}: {
  rails: boolean[];
  branch?: boolean;
  className?: string;
}) {
  return rails.map((line, index) => (
    <td
      key={index}
      className={cn('sticky z-10 border-0 bg-white p-0', className)}
      style={{
        width: NESTED_GUTTER,
        left: index * NESTED_GUTTER,
      }}
    >
      <NestingRail
        branch={branch && index === rails.length - 1}
        continued={line}
      />
    </td>
  ));
}

export function GroupHeaderRow({
  depth,
  title,
  open,
  columnCount,
  viewportWidth,
  lineInset = 0,
  rails = [],
  padEnd = false,
  bottomBorder = true,
  selection,
  onToggle,
}: {
  depth: number;
  title: string;
  open: boolean;
  columnCount: number;
  viewportWidth: number;
  /** Bottom border starts here, so it does not run into the left edge. */
  lineInset?: number;
  /**
   * Ancestor lines, outer first. The last entry is this group's own
   * line to the next sibling.
   */
  rails?: boolean[];
  /** Space after this header, before the next project. Hidden when the parent collapses. */
  padEnd?: boolean;
  /** Skip the bottom line when it would sit on the next header's top line. */
  bottomBorder?: boolean;
  /** Selects every task under this outermost group. */
  selection?: {
    label: string;
    checked: boolean;
    indeterminate: boolean;
    disabled?: boolean;
    onCheckedChange: (checked: boolean) => void;
  };
  onToggle: () => void;
}) {
  const level = groupChrome(depth);
  const gutter = rails.length * NESTED_GUTTER;
  const buttonWidth =
    viewportWidth > gutter ? viewportWidth - gutter : undefined;

  return (
    <TableRow
      data-slot="data-table-group-row"
      data-depth={depth}
      className={cn('cursor-pointer border-b-0', level.row)}
      style={{ top: groupStickyTop(depth) }}
    >
      {rails.length > 0 ? (
        <GutterCells rails={rails} branch className="z-20" />
      ) : null}
      <TableCell
        colSpan={columnCount}
        className={cn(
          'border-r-0 border-b border-transparent p-0 [&:has([role=checkbox])]:px-0',
          level.bar,
          padEnd && 'pb-3',
        )}
      >
        {selection ? (
          <div
            className={cn(
              'sticky flex w-full items-center',
              level.bar,
              level.title,
            )}
            style={{
              left: gutter,
              width: buttonWidth,
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-grayscale-opacity-300"
            />
            {bottomBorder && gutter === 0 ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 -bottom-px h-px bg-grayscale-opacity-300"
                style={{ left: lineInset }}
              />
            ) : null}
            <span className="flex w-10 shrink-0 items-center justify-center">
              <Checkbox
                aria-label={selection.label}
                checked={selection.checked}
                indeterminate={selection.indeterminate}
                disabled={selection.disabled}
                onCheckedChange={(value) =>
                  selection.onCheckedChange(Boolean(value))
                }
              />
            </span>
            <button
              type="button"
              aria-expanded={open}
              onClick={onToggle}
              className={cn(
                'flex min-w-0 flex-1 items-center gap-2 pr-4 pl-2 text-left text-sm',
                level.bar,
                level.title,
              )}
            >
              <ChevronDownIcon
                className={cn(
                  'size-3 shrink-0 text-grayscale-opacity-700 transition-transform',
                  !open && '-rotate-90',
                )}
              />
              <span className="truncate">{title}</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-expanded={open}
            onClick={onToggle}
            className={cn(
              'sticky flex w-full items-center gap-2 px-4 text-left text-sm',
              level.bar,
              level.title,
              rails.length === 0 && depth > 0 && 'pl-10',
            )}
            style={{
              left: gutter,
              width: buttonWidth,
            }}
          >
            {depth === 0 ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-grayscale-opacity-300"
              />
            ) : null}
            {bottomBorder && gutter === 0 ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 -bottom-px h-px bg-grayscale-opacity-300"
                style={{ left: lineInset }}
              />
            ) : null}
            {rails.length === 0 && depth > 0 ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-4 h-[22px] w-3 rounded-bl-[8px] border-b border-l border-border"
              />
            ) : null}
            <ChevronDownIcon
              className={cn(
                'size-3 shrink-0 text-grayscale-opacity-700 transition-transform',
                !open && '-rotate-90',
              )}
            />
            <span className="truncate">{title}</span>
          </button>
        )}
      </TableCell>
    </TableRow>
  );
}
