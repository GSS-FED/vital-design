import { Button } from '@/components/button/Button';
import {
  Card,
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
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
} from '@/components/toolbar/Toolbar';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { cn } from '@/lib/utils';
import type { VisibilityState } from '@tanstack/react-table';
import { useRef, useState } from 'react';
import { COLUMN_FIELDS, type GroupingFieldOption } from './data';

function ColumnVisibilityPopover({
  visibility,
  onSave,
}: {
  visibility: VisibilityState;
  onSave: (next: VisibilityState) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<VisibilityState>({});

  function handleOpenChange(next: boolean) {
    if (next) setDraft({ ...visibility });
    setOpen(next);
  }

  function save() {
    const next = { ...draft };
    for (const field of COLUMN_FIELDS) {
      if (field.locked) next[field.id] = true;
    }
    onSave(next);
    setOpen(false);
  }

  function clearSelection() {
    setDraft((prev) => {
      const next = { ...prev };
      for (const field of COLUMN_FIELDS) {
        if (!field.locked) next[field.id] = false;
      }
      return next;
    });
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            theme="default"
            className="h-8 rounded-full px-3 font-normal"
          />
        }
      >
        顯示欄位
        <ChevronDownIcon data-icon="inline-end" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 shadow-none">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>顯示欄位</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {COLUMN_FIELDS.map((field) => {
              const checked =
                field.locked || draft[field.id] !== false;
              return (
                <label
                  key={field.id}
                  className={cn(
                    'flex items-center gap-2 text-sm',
                    field.locked &&
                      'cursor-not-allowed text-grayscale-opacity-500',
                  )}
                >
                  <Checkbox
                    checked={checked}
                    disabled={field.locked}
                    onCheckedChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        [field.id]: Boolean(value),
                      }))
                    }
                  />
                  {field.label}
                </label>
              );
            })}
          </CardContent>
          <CardFooter className="justify-between border-t">
            <Button
              type="button"
              variant="text"
              theme="default"
              onClick={clearSelection}
            >
              清除選取
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
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
            className="h-8 rounded-full px-3 font-normal"
          />
        }
      >
        分群
        <ChevronDownIcon data-icon="inline-end" />
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
  groupingKeys,
  groupingFields,
  visibility,
  onQueryChange,
  onGroupingChange,
  onVisibilityChange,
}: {
  query: string;
  groupingKeys: readonly string[];
  groupingFields: readonly GroupingFieldOption[];
  visibility: VisibilityState;
  onQueryChange: (value: string) => void;
  onGroupingChange: (keys: readonly string[]) => void;
  onVisibilityChange: (next: VisibilityState) => void;
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
      className="h-12 flex-nowrap gap-6 overflow-x-auto overflow-y-hidden rounded bg-white px-3 py-2"
    >
      <SearchBar
        placeholder="搜尋任務"
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
          visibility={visibility}
          onSave={onVisibilityChange}
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
