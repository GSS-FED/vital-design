'use client';

import {
  Command,
  CommandBackButton,
  CommandEmpty,
  CommandGroup,
  CommandHeader,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/command/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover/Popover';
import { AngleDownIcon } from '@/icons/AngleDownIcon';
import { AngleRightIcon } from '@/icons/AngleRightIcon';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export type TreeSelectItem = {
  hasChildren?: boolean;
  label: string;
  parentValue: string | null;
  value: string;
};

export type TreeSelectValue = {
  label: string;
  path: TreeSelectItem[];
  value: string;
};

export type TreeSelectProps = {
  items: TreeSelectItem[];
  label: string;
  value: TreeSelectValue | null;
  onValueChange?: (value: TreeSelectValue) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
};

export function TreeSelect({
  items,
  label,
  value,
  onValueChange,
  placeholder = 'Select',
  searchPlaceholder = 'Search',
  emptyMessage = 'No results found.',
  className,
}: TreeSelectProps) {
  const [open, setOpen] = useState(false);
  const [pages, setPages] = useState<TreeSelectItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const currentPage = pages[pages.length - 1] ?? null;
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const visibleItems = items.filter(
    (item) =>
      item.parentValue === (currentPage?.value ?? null) &&
      item.label.toLowerCase().includes(normalizedSearchValue),
  );

  const resetView = () => {
    setPages([]);
    setSearchValue('');
  };

  const goBack = () => {
    setPages((prev) => prev.slice(0, -1));
    setSearchValue('');
  };

  const openPage = (item: TreeSelectItem) => {
    setPages((prev) => [...prev, item]);
    setSearchValue('');
  };

  const selectItem = (item: TreeSelectItem) => {
    onValueChange?.({
      label: item.label,
      path: [...pages, item],
      value: item.value,
    });
    setOpen(false);
    resetView();
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (!nextOpen) {
          resetView();
        }
      }}
    >
      <PopoverTrigger
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-label={label}
        className={cn(
          'group box-border flex h-8 w-60 cursor-pointer items-center justify-between gap-2 rounded border border-grayscale-opacity-300 bg-background py-2 pr-1.5 pl-3 text-left text-sm leading-5 font-normal text-grayscale-opacity-800 transition-colors duration-200 hover:border-grayscale-opacity-500 focus:border-primary-500 focus:outline-none data-[popup-open]:border-primary-500',
          className,
        )}
      >
        <span
          className={cn(
            'min-w-0 flex-1 truncate text-left',
            !value && 'text-grayscale-opacity-400',
          )}
        >
          {value?.label ?? placeholder}
        </span>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-grayscale-opacity-700">
          <AngleDownIcon className="size-5" />
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--anchor-width)] p-0"
        initialFocus
      >
        <Command label={label} shouldFilter={false}>
          {pages.length > 0 ? (
            <CommandHeader>
              <CommandBackButton onClick={goBack}>
                {currentPage?.label}
              </CommandBackButton>
            </CommandHeader>
          ) : null}
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={setSearchValue}
            onKeyDown={(event) => {
              if (
                event.key === 'Backspace' &&
                event.currentTarget.value.length === 0 &&
                pages.length > 0
              ) {
                event.preventDefault();
                goBack();
              }
            }}
          />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {visibleItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    if (item.hasChildren) {
                      openPage(item);
                      return;
                    }

                    selectItem(item);
                  }}
                >
                  <span className="min-w-0 flex-1 truncate">
                    {item.label}
                  </span>
                  {item.hasChildren ? (
                    <span className="ml-auto flex shrink-0 text-grayscale-opacity-500">
                      <AngleRightIcon className="size-5" />
                    </span>
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
