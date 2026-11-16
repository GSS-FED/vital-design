import { TableCell, TableRow } from '@/components/table/Table';
import { PlusIcon } from '@/icons/PlusIcon';
import { cn } from '@/lib/utils';
import { GutterCells, NESTED_GUTTER } from './group-row';

/**
 * Last row of the container that will own the new row.
 * Depth 0 may stick to the scrollport. Grouped rows stay in their group.
 * The label is pinned to the visible width so horizontal scroll keeps it in view.
 */
export function AddRow({
  columnCount,
  viewportWidth,
  label,
  text,
  indent = 0,
  rails = [],
  boxed = false,
  sticky = false,
  bottomBorder = true,
  padEnd = false,
  onAdd,
}: {
  columnCount: number;
  viewportWidth: number;
  /** Accessible name, e.g. 在環境盤查新增任務. */
  label: string;
  /** Visible text, e.g. 新增任務. */
  text: string;
  /**
   * Matches the checkbox of a task row at this level.
   * The checkbox is 16px and centered in the 40px select column,
   * so it sits 12px past the column padding.
   */
  indent?: number;
  /**
   * Ancestor lines, outer first. The last entry is this group's own
   * line to the next sibling.
   */
  rails?: boolean[];
  /** Close the left and right edges of the inset grid. */
  boxed?: boolean;
  /**
   * A following group at the same level draws its own top line,
   * so this row does not also draw a bottom line.
   */
  bottomBorder?: boolean;
  /**
   * Space below this row, before the next project.
   * The gap is its own row, so it does not push this row's bottom line away.
   */
  padEnd?: boolean;
  sticky?: boolean;
  onAdd: () => void;
}) {
  const gutter = rails.length * NESTED_GUTTER;
  const row = (
    <TableRow
      data-slot="data-table-add-row"
      aria-label={label}
      className={cn(
        'border-b-0 hover:bg-transparent',
        sticky && 'sticky bottom-0 z-10 bg-white',
      )}
    >
      {rails.length > 0 ? (
        <GutterCells rails={rails} className="z-10" />
      ) : null}
      <TableCell
        colSpan={columnCount}
        className={cn(
          'bg-white p-0',
          bottomBorder ? 'border-b' : 'border-b-0',
          boxed
            ? 'border-r border-grayscale-opacity-300'
            : 'border-r-0',
          !boxed &&
            (indent > 0
              ? 'border-transparent'
              : 'border-grayscale-opacity-300'),
          sticky &&
            'sticky bottom-0 z-10 shadow-[inset_0_1px_0_var(--grayscale-opacity-300)]',
        )}
        style={
          boxed
            ? {
                borderRight: '1px solid var(--grayscale-opacity-300)',
              }
            : undefined
        }
      >
        <button
          type="button"
          aria-label={label}
          onClick={onAdd}
          className={cn(
            'sticky z-10 flex h-11 w-full items-center gap-2 bg-white px-4 text-left text-sm text-grayscale-opacity-700 hover:bg-grayscale-opacity-100',
            boxed && 'border-l border-grayscale-opacity-300',
          )}
          style={{
            left: gutter,
            width:
              viewportWidth > gutter
                ? viewportWidth - gutter
                : undefined,
            paddingLeft: indent > 0 ? indent + 12 : undefined,
          }}
        >
          {indent > 0 ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 -bottom-px h-px bg-grayscale-opacity-300"
              style={{ left: indent }}
            />
          ) : null}
          {indent > 0 ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 -bottom-px w-px bg-grayscale-opacity-300"
              style={{ left: indent }}
            />
          ) : null}
          <PlusIcon className="size-4.5 shrink-0" />
          {text}
        </button>
      </TableCell>
    </TableRow>
  );

  if (!padEnd) return row;

  return (
    <>
      {row}
      <TableRow
        data-slot="data-table-group-gap"
        aria-hidden="true"
        className="border-0 hover:bg-transparent"
      >
        {rails.map((_, index) => (
          <td
            key={index}
            className="border-0 bg-white p-0"
            style={{ width: NESTED_GUTTER }}
          />
        ))}
        <td colSpan={columnCount} className="border-0 bg-white p-0">
          <div className="h-3" />
        </td>
      </TableRow>
    </>
  );
}
