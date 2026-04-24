import { ChevronDownIcon, ChevronUpIcon } from '@/icons/ChevronIcon';
import { cn } from '@/utils/cn';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Ref } from 'react';
import Command from './Command';

type CommandNode = {
  id: string;
  label: string;
  children?: CommandNode[];
};

type CommandMatch = {
  item: CommandNode;
  path: CommandNode[];
};

const COMMAND_TREE: CommandNode[] = [
  {
    id: 'skip',
    label: '略過此關卡',
  },
  {
    id: 'manager',
    label: '主管',
    children: [
      { id: 'manager-last', label: '上一關簽核主管' },
      { id: 'manager-current', label: '本關簽核人主管' },
      { id: 'manager-requester', label: '起單人的主管' },
    ],
  },
  {
    id: 'all-users',
    label: '所有人',
  },
  {
    id: 'unassigned',
    label: '未分配成員',
  },
  {
    id: 'org',
    label: '組織',
    children: [
      { id: 'org-1', label: '組織1' },
      { id: 'org-2', label: '組織2' },
      { id: 'org-3', label: '組織3 (無成員)' },
    ],
  },
  {
    id: 'group',
    label: '群組',
    children: [
      { id: 'group-empty', label: '群組 (無成員)' },
      { id: 'group-1', label: '群組1' },
      { id: 'group-2', label: '群組2' },
      { id: 'group-3', label: '群組3' },
    ],
  },
];

function getNodeByPages(
  items: CommandNode[],
  pages: string[],
): CommandNode | null {
  let currentNode: CommandNode | null = null;
  let currentItems = items;

  for (const pageId of pages) {
    currentNode =
      currentItems.find((item) => item.id === pageId) ?? null;
    if (!currentNode?.children) {
      return currentNode;
    }
    currentItems = currentNode.children;
  }

  return currentNode;
}

function getCurrentItems(items: CommandNode[], pages: string[]) {
  if (pages.length === 0) return items;
  return getNodeByPages(items, pages)?.children ?? [];
}

function flattenMatches(
  items: CommandNode[],
  path: CommandNode[] = [],
): CommandMatch[] {
  return items.flatMap((item) => {
    const nextPath = [...path, item];
    return [
      { item, path: nextPath },
      ...(item.children
        ? flattenMatches(item.children, nextPath)
        : []),
    ];
  });
}

function pathToKey(path: CommandNode[]) {
  return path.map((item) => item.id).join('/');
}

function CommandRow({
  item,
  detail,
  hasChildren,
  onSelect,
  selected = false,
}: {
  item: CommandNode;
  detail?: string;
  hasChildren: boolean;
  onSelect: () => void;
  selected?: boolean;
}) {
  return (
    <Command.Item
      value={item.label}
      keywords={detail ? detail.split(' / ') : undefined}
      className={selected ? 'bg-grayscale-300' : undefined}
      onSelect={onSelect}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate">{item.label}</span>
        {detail ? (
          <span className="truncate text-xs text-grayscale-500">
            {detail}
          </span>
        ) : null}
      </div>
      {hasChildren ? (
        <span className="flex shrink-0 text-grayscale-500">
          <ChevronRightIcon width={20} height={20} />
        </span>
      ) : null}
    </Command.Item>
  );
}

export type ApproverCommandProps = {
  className?: string;
  inputRef?: Ref<HTMLInputElement>;
  onLeafSelect?: (path: CommandNode[]) => void;
};

export function ApproverCommandDemo({
  className,
  inputRef,
  onLeafSelect,
}: ApproverCommandProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selectedPathKey, setSelectedPathKey] = useState('');

  const currentItems = useMemo(
    () => getCurrentItems(COMMAND_TREE, pages),
    [pages],
  );
  const allMatches = useMemo(() => flattenMatches(COMMAND_TREE), []);
  const matches = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return [];

    return allMatches.filter(({ item }) =>
      item.label.toLowerCase().includes(keyword),
    );
  }, [allMatches, search]);
  const currentPageNode = useMemo(
    () => getNodeByPages(COMMAND_TREE, pages),
    [pages],
  );

  const handleSelectPath = (path: CommandNode[]) => {
    const target = path[path.length - 1];

    if (!target) return;

    if (target.children?.length) {
      setPages(path.map((entry) => entry.id));
      setSearch('');
      return;
    }

    setSelectedPathKey(pathToKey(path));
    onLeafSelect?.(path);
  };

  return (
    <Command
      id="approver-command-demo"
      label="Approver command"
      className={cn('w-[194px]', className)}
      onKeyDown={(event) => {
        if (
          event.key === 'Escape' ||
          (event.key === 'Backspace' && search.length === 0)
        ) {
          if (pages.length > 0) {
            event.preventDefault();
            setPages((prev) => prev.slice(0, -1));
          }
        }
      }}
    >
      {pages.length > 0 ? (
        <Command.Header>
          <Command.BackButton
            onClick={() => setPages((prev) => prev.slice(0, -1))}
          >
            {currentPageNode?.label}
          </Command.BackButton>
        </Command.Header>
      ) : null}
      <Command.Input
        ref={inputRef}
        placeholder="輸入關鍵字"
        value={search}
        onValueChange={setSearch}
      />
      <Command.List>
        <Command.Empty>無結果</Command.Empty>
        {search.trim() ? (
          <Command.Group heading="搜尋結果">
            {matches.map(({ item, path }) => {
              const detail = path
                .slice(0, -1)
                .map((entry) => entry.label)
                .join(' / ');

              return (
                <CommandRow
                  key={pathToKey(path)}
                  item={item}
                  detail={detail}
                  hasChildren={!!item.children?.length}
                  selected={selectedPathKey === pathToKey(path)}
                  onSelect={() => handleSelectPath(path)}
                />
              );
            })}
          </Command.Group>
        ) : (
          <Command.Group>
            {currentItems.map((item) => {
              const path = allMatches.find(
                (match) => match.item.id === item.id,
              )?.path ?? [item];
              const pathKey = pathToKey(path);

              return (
                <Command.Item
                  key={item.id}
                  value={item.label}
                  className={
                    selectedPathKey === pathKey
                      ? 'bg-grayscale-300'
                      : undefined
                  }
                  onSelect={() => handleSelectPath(path)}
                >
                  <div className="flex min-w-0 flex-1 items-center">
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.children?.length ? (
                    <span className="flex shrink-0 text-grayscale-500">
                      <ChevronRightIcon width={20} height={20} />
                    </span>
                  ) : null}
                </Command.Item>
              );
            })}
          </Command.Group>
        )}
      </Command.List>
    </Command>
  );
}

export function WithTriggerCommandDemo() {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [open]);

  return (
    <div className="w-[194px]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="approver-command-demo"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'box-border flex h-8 w-full items-center justify-between gap-2 rounded border border-grayscale-300 bg-white px-3 py-2 text-left font-sans text-sm leading-5 text-grayscale-800 transition-colors duration-200',
          'cursor-pointer hover:border-grayscale-500 focus:border-primary-500',
        )}
      >
        <span
          className={
            selectedLabel ? 'truncate' : 'truncate text-grayscale-400'
          }
        >
          {selectedLabel || '請選擇'}
        </span>
        <span className="flex shrink-0 items-center text-grayscale-700">
          {open ? (
            <ChevronUpIcon width={14} />
          ) : (
            <ChevronDownIcon width={14} />
          )}
        </span>
      </button>
      {open ? (
        <ApproverCommandDemo
          inputRef={inputRef}
          className="mt-1 w-full"
          onLeafSelect={(path) => {
            setSelectedLabel(path[path.length - 1]?.label ?? '');
            setOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
