import { Button } from '@/components/button/Button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card/Card';
import { Checkbox } from '@/components/checkbox/Checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover/Popover';
import { SearchBar } from '@/components/search-bar/SearchBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
} from '@/components/select/Select';
import { Switch } from '@/components/switch/Switch';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
} from '@/components/toolbar/Toolbar';
import { AngleDownIcon } from '@/icons/AngleDownIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { GearIcon } from '@/icons/GearIcon';
import { GripDotsVerticalIcon } from '@/icons/GripDotsVerticalIcon';
import { cn } from '@/lib/utils';
import type { VisibilityState } from '@tanstack/react-table';
import {
  type Ref,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

/** A field the 分群 menu offers. `id` is the row key. */
export type GroupingFieldOption = {
  id: string;
  label: string;
};

/**
 * A column the 顯示欄位 card lists. `locked` columns stay visible and
 * their checkbox cannot be changed.
 */
export type ColumnField = {
  id: string;
  label: string;
  locked: boolean;
};

type FieldId = string;

/** Fields in the saved order. Ids the order does not name keep their default place at the end. */
function orderedFields(
  fields: readonly ColumnField[],
  order: readonly string[],
) {
  const rank = (id: string) => {
    const index = order.indexOf(id);
    return index === -1 ? order.length : index;
  };
  return [...fields].sort((a, b) => rank(a.id) - rank(b.id));
}

/**
 * Puts `id` at `index` among the rows on screen. With unchecked fields
 * hidden, the hidden ones keep their place in the full order.
 */
function moveTo(
  order: readonly FieldId[],
  visible: ReadonlySet<FieldId>,
  id: FieldId,
  index: number,
) {
  const others = order.filter(
    (item) => item !== id && visible.has(item),
  );
  const rest = order.filter((item) => item !== id);
  const last = others.at(-1);
  if (last === undefined) return [...order];
  const clamped = Math.max(0, Math.min(index, others.length));
  const anchor = others[clamped];
  const at =
    anchor === undefined
      ? rest.indexOf(last) + 1
      : rest.indexOf(anchor);
  return [...rest.slice(0, at), id, ...rest.slice(at)];
}

function ColumnVisibilityPopover({
  fields: allFields,
  visibility,
  order,
  onSave,
}: {
  /** Every hideable or locked column, in default order. */
  fields: readonly ColumnField[];
  visibility: VisibilityState;
  /** Saved field order. Empty keeps the default order. */
  order: readonly string[];
  onSave: (next: VisibilityState, order: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<VisibilityState>({});
  const [draftOrder, setDraftOrder] = useState<FieldId[]>([]);
  const [dragging, setDragging] = useState<FieldId | null>(null);
  const [showUnchecked, setShowUnchecked] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);
  const stopDragRef = useRef<(() => void) | null>(null);
  /** Grip to refocus after a keyboard move re-renders the list. */
  const refocusRef = useRef<FieldId | null>(null);

  function stopDrag() {
    stopDragRef.current?.();
    stopDragRef.current = null;
    setDragging(null);
  }

  useEffect(() => () => stopDragRef.current?.(), []);

  // Moving a row down makes React move that row's own <li>, which drops
  // focus from the grip inside it. Put it back.
  useLayoutEffect(() => {
    const id = refocusRef.current;
    if (!id) return;
    refocusRef.current = null;
    listRef.current
      ?.querySelector<HTMLButtonElement>(
        `[data-field-id="${id}"] button`,
      )
      ?.focus();
  }, [draftOrder]);

  function handleOpenChange(next: boolean) {
    if (next) {
      setDraft({ ...visibility });
      setDraftOrder(
        orderedFields(allFields, order).map((field) => field.id),
      );
    }
    stopDrag();
    setOpen(next);
  }

  // The drag listens on window, not on the grip: React moves the dragged
  // <li> when it goes down, and moving a node drops its pointer capture.
  function startDrag(id: FieldId) {
    stopDragRef.current?.();
    const move = (event: PointerEvent) => dragTo(id, event.clientY);
    const end = () => stopDrag();
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    stopDragRef.current = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
    setDragging(id);
  }

  function save() {
    const next = { ...draft };
    for (const field of allFields) {
      if (field.locked) next[field.id] = true;
    }
    onSave(next, [...draftOrder]);
    setOpen(false);
  }

  function clearSelection() {
    setDraft((prev) => {
      const next = { ...prev };
      for (const field of allFields) {
        if (!field.locked) next[field.id] = false;
      }
      return next;
    });
  }

  // The dragged row lands after every other row whose middle is above
  // the pointer. Rows move as the pointer goes, so the list itself is
  // the drop preview.
  function dragTo(id: FieldId, clientY: number) {
    const rows = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>(
        '[data-field-id]',
      ) ?? [],
    ).filter((row) => row.dataset.fieldId !== id);
    const index = rows.filter((row) => {
      const box = row.getBoundingClientRect();
      return box.top + box.height / 2 < clientY;
    }).length;
    setDraftOrder((prev) => {
      const next = moveTo(prev, visibleIds, id, index);
      return next.every((item, i) => item === prev[i]) ? prev : next;
    });
  }

  const isChecked = (field: ColumnField) =>
    field.locked || draft[field.id] !== false;
  const fields = draftOrder.flatMap((id) => {
    const field = allFields.find((item) => item.id === id);
    if (!field) return [];
    return showUnchecked || isChecked(field) ? [field] : [];
  });
  // Membership cannot change mid-drag (the pointer is held on a grip),
  // so the drag listener can keep the set from the render it started in.
  const visibleIds = new Set(fields.map((field) => field.id));

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            theme="default"
            className="h-8 rounded-full px-3 font-normal has-[_[data-icon=inline-start]]:pl-2.5"
          />
        }
      >
        <GearIcon data-icon="inline-start" />
        顯示欄位
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[350px] bg-transparent p-0 shadow-none"
      >
        <Card className="max-h-[350px] overflow-hidden">
          <CardHeader className="gap-y-0 border-b pt-4">
            <CardTitle className="text-grayscale-opacity-800">
              顯示欄位
            </CardTitle>
            <CardAction>
              <label className="flex items-center gap-2 text-sm text-grayscale-opacity-800">
                顯示未勾選項目
                <Switch
                  checked={showUnchecked}
                  onCheckedChange={(value) =>
                    setShowUnchecked(Boolean(value))
                  }
                />
              </label>
            </CardAction>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-y-auto px-0 py-2">
            <ul ref={listRef}>
              {fields.map((field, index) => (
                <li
                  key={field.id}
                  data-field-id={field.id}
                  data-dragging={dragging === field.id || undefined}
                  className="flex h-8 shrink-0 items-center gap-2 px-4 data-[dragging]:bg-grayscale-opacity-100"
                >
                  <button
                    type="button"
                    aria-label={`調整${field.label}的順序`}
                    aria-keyshortcuts="ArrowUp ArrowDown"
                    className="flex size-5 shrink-0 cursor-grab touch-none items-center justify-center rounded text-grayscale-opacity-600 hover:text-grayscale-opacity-800 focus-visible:shadow-focus-primary focus-visible:outline-none data-[dragging]:cursor-grabbing"
                    data-dragging={dragging === field.id || undefined}
                    onPointerDown={(event) => {
                      if (event.button !== 0) return;
                      event.preventDefault();
                      startDrag(field.id);
                    }}
                    onKeyDown={(event) => {
                      if (
                        event.key !== 'ArrowUp' &&
                        event.key !== 'ArrowDown'
                      ) {
                        return;
                      }
                      event.preventDefault();
                      refocusRef.current = field.id;
                      setDraftOrder((prev) =>
                        moveTo(
                          prev,
                          visibleIds,
                          field.id,
                          index + (event.key === 'ArrowUp' ? -1 : 1),
                        ),
                      );
                    }}
                  >
                    <GripDotsVerticalIcon className="size-5" />
                  </button>
                  <label
                    className={cn(
                      'flex min-w-0 flex-1 items-center gap-2 text-sm text-grayscale-opacity-800',
                      field.locked &&
                        'cursor-not-allowed text-grayscale-opacity-500',
                    )}
                  >
                    <Checkbox
                      checked={isChecked(field)}
                      disabled={field.locked}
                      onCheckedChange={(value) =>
                        setDraft((prev) => ({
                          ...prev,
                          [field.id]: Boolean(value),
                        }))
                      }
                    />
                    <span className="truncate">{field.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="justify-between gap-10 border-t bg-grayscale-opacity-100 py-2 [.border-t]:pt-2">
            <Button
              type="button"
              variant="default"
              theme="default"
              onClick={clearSelection}
            >
              清除選取
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="default"
                theme="default"
                onClick={() => setOpen(false)}
              >
                取消
              </Button>
              <Button
                type="button"
                variant="default"
                theme="primary"
                onClick={save}
              >
                儲存
              </Button>
            </div>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

const NO_GROUP = '__none__';

function GroupingSelect({
  label,
  noneLabel,
  value,
  fields,
  disabled = false,
  onChange,
}: {
  label: string;
  noneLabel: string;
  value: string | null;
  fields: readonly GroupingFieldOption[];
  disabled?: boolean;
  onChange: (id: string | null) => void;
}) {
  const items = [
    { value: NO_GROUP, label: noneLabel },
    ...fields.map((field) => ({
      value: field.id,
      label: field.label,
    })),
  ];

  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs leading-4 font-medium text-grayscale-opacity-500">
        {label}
      </span>
      <Select
        items={items}
        value={value ?? NO_GROUP}
        disabled={disabled}
        onValueChange={(next) =>
          onChange(next === NO_GROUP || next == null ? null : next)
        }
      >
        <SelectTrigger aria-label={label} />
        <SelectContent>
          <SelectItem value={NO_GROUP}>
            <SelectItemText>{noneLabel}</SelectItemText>
          </SelectItem>
          {fields.map((field) => (
            <SelectItem key={field.id} value={field.id}>
              <SelectItemText>{field.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

function GroupingMenu({
  groupKey,
  subKey,
  fields,
  onGroupChange,
  onSubgroupChange,
}: {
  groupKey: string | null;
  subKey: string | null;
  fields: readonly GroupingFieldOption[];
  onGroupChange: (id: string | null) => void;
  onSubgroupChange: (id: string | null) => void;
}) {
  const subFields = fields.filter((field) => field.id !== groupKey);
  // The trigger names the first level, as in Figma: 分群：專案 / 分群：無.
  const groupLabel =
    fields.find((field) => field.id === groupKey)?.label ?? '無';
  const [open, setOpen] = useState(false);
  const choosing = useRef(false);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (!next && choosing.current) return;
        setOpen(next);
      }}
    >
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            theme="default"
            className="h-8 rounded-full px-3 font-normal has-[_[data-icon=inline-end]]:pr-2.5"
          />
        }
      >
        分群：{groupLabel}
        <AngleDownIcon data-icon="inline-end" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-60">
        <div className="flex flex-col gap-3">
          <GroupingSelect
            label="分群"
            noneLabel="無"
            value={groupKey}
            fields={fields}
            onChange={(id) => {
              choosing.current = true;
              onGroupChange(id);
              queueMicrotask(() => {
                choosing.current = false;
              });
            }}
          />
          <GroupingSelect
            label="子分群"
            noneLabel="無"
            value={subKey}
            fields={subFields}
            disabled={!groupKey}
            onChange={(id) => {
              choosing.current = true;
              onSubgroupChange(id);
              queueMicrotask(() => {
                choosing.current = false;
              });
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ActionBar({
  query,
  searchPlaceholder,
  groupingKeys,
  groupingFields,
  fields,
  visibility,
  columnOrder,
  searchRef,
  onQueryChange,
  onGroupingChange,
  onColumnsChange,
}: {
  query: string;
  searchPlaceholder: string;
  groupingKeys: readonly string[];
  groupingFields: readonly GroupingFieldOption[];
  /** Columns for the 顯示欄位 card. */
  fields: readonly ColumnField[];
  visibility: VisibilityState;
  onQueryChange: (value: string) => void;
  onGroupingChange: (keys: readonly string[]) => void;
  /** Saved field order for the 顯示欄位 card. */
  columnOrder: readonly string[];
  /** Where focus goes when the selection bar empties. */
  searchRef?: Ref<HTMLInputElement>;
  onColumnsChange: (next: VisibilityState, order: string[]) => void;
}) {
  const groupKey = groupingKeys[0] ?? null;
  const subKey =
    groupingKeys[1] && groupingKeys[1] !== groupKey
      ? groupingKeys[1]
      : null;
  function changeGroup(id: string | null) {
    if (!id) {
      onGroupingChange([]);
      return;
    }
    onGroupingChange(subKey && subKey !== id ? [id, subKey] : [id]);
  }

  function changeSubgroup(id: string | null) {
    if (!groupKey) return;
    onGroupingChange(id ? [groupKey, id] : [groupKey]);
  }

  return (
    <Toolbar
      size="sm"
      className="h-12 flex-nowrap gap-6 overflow-x-auto overflow-y-hidden rounded bg-background px-3 py-2"
    >
      <SearchBar
        ref={searchRef}
        placeholder={searchPlaceholder}
        width="220px"
        value={query}
        onChange={onQueryChange}
        className="h-8 shrink-0 rounded border-none"
      />
      <ToolbarSpacer />
      <ToolbarGroup>
        {groupingFields.length > 0 ? (
          <GroupingMenu
            groupKey={groupKey}
            subKey={subKey}
            fields={groupingFields}
            onGroupChange={changeGroup}
            onSubgroupChange={changeSubgroup}
          />
        ) : null}
        <ColumnVisibilityPopover
          fields={fields}
          visibility={visibility}
          order={columnOrder}
          onSave={onColumnsChange}
        />
      </ToolbarGroup>
    </Toolbar>
  );
}

export function RowActionsMenu({
  onDelete,
}: {
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            aria-label="更多操作"
            variant="text"
            size="icon-md"
            theme="default"
          />
        }
      >
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>檢視</DropdownMenuItem>
          <DropdownMenuItem>複製</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>刪除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
