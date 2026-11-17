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
import { useState } from 'react';

type LocationItem = {
  hasChildren?: boolean;
  label: string;
  parentValue: string | null;
  value: string;
};

type SelectedLocation = {
  label: string;
  path: LocationItem[];
  value: string;
};

const locationItems: LocationItem[] = [
  {
    label: 'Taiwan',
    parentValue: null,
    value: 'tw',
    hasChildren: true,
  },
  {
    label: 'Japan',
    parentValue: null,
    value: 'jp',
    hasChildren: true,
  },
  { label: 'Taipei', parentValue: 'tw', value: 'tpe' },
  { label: 'Kaohsiung', parentValue: 'tw', value: 'khh' },
  { label: 'Tokyo', parentValue: 'jp', value: 'tky' },
  { label: 'Osaka', parentValue: 'jp', value: 'osa' },
];

function getLocationItems(
  parentValue: string | null,
  searchValue: string,
) {
  const normalizedSearchValue = searchValue.trim().toLowerCase();

  return locationItems.filter((item) => {
    if (item.parentValue !== parentValue) return false;
    if (!normalizedSearchValue) return true;

    return item.label.toLowerCase().includes(normalizedSearchValue);
  });
}

export function CommandHierarchicalPickerExample() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<SelectedLocation | null>(null);
  const [pages, setPages] = useState<LocationItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const currentPage = pages[pages.length - 1] ?? null;
  const visibleItems = getLocationItems(
    currentPage?.value ?? null,
    searchValue,
  );

  const resetView = () => {
    setPages([]);
    setSearchValue('');
  };

  const goBack = () => {
    setPages((prev) => prev.slice(0, -1));
    setSearchValue('');
  };

  const openPage = (item: LocationItem) => {
    setPages((prev) => [...prev, item]);
    setSearchValue('');
  };

  const selectItem = (item: LocationItem) => {
    setValue({
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
        className="group box-border flex h-8 w-60 cursor-pointer items-center justify-between gap-2 rounded border border-grayscale-opacity-300 bg-background py-2 pr-1.5 pl-3 text-left text-sm leading-5 font-normal text-grayscale-opacity-800 transition-colors duration-200 hover:border-grayscale-opacity-500 focus:border-primary-500 focus:outline-none data-[popup-open]:border-primary-500"
      >
        <span
          className={
            value
              ? 'min-w-0 flex-1 truncate text-left'
              : 'min-w-0 flex-1 truncate text-left text-grayscale-opacity-400'
          }
        >
          {value?.label ?? 'Select location'}
        </span>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-grayscale-opacity-700">
          <AngleDownIcon className="size-3.5" />
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--anchor-width)] p-0"
        initialFocus
      >
        <Command label="Locations" shouldFilter={false}>
          {pages.length > 0 ? (
            <CommandHeader>
              <CommandBackButton onClick={goBack}>
                {currentPage?.label}
              </CommandBackButton>
            </CommandHeader>
          ) : null}
          <CommandInput
            placeholder="Search locations"
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
            <CommandEmpty>No locations found.</CommandEmpty>
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
