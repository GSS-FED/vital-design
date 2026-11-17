'use client';

import { Button } from '@/components/button/Button';
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxHeader,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemCheckbox,
  ComboboxItemText,
  ComboboxList,
  ComboboxOverflowChip,
  ComboboxTrigger,
} from '@/components/combobox/Combobox';
import { GearIcon } from '@/icons/GearIcon';
import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

const tags: Option[] = Array.from({ length: 24 }, (_, index) => ({
  label: `Tag ${index + 1}`,
  value: `tag-${index + 1}`,
}));

export function ComboboxTagPickerWithFooterExample() {
  const [value, setValue] = useState<Option[]>(tags.slice(0, 12));
  const visibleChips = value.slice(0, 3);
  const overflowCount = value.length - visibleChips.length;

  return (
    <Combobox
      autoHighlight
      multiple
      items={tags}
      itemToStringLabel={(item: Option | null) => item?.label ?? ''}
      itemToStringValue={(item: Option | null) => item?.value ?? ''}
      value={value}
      onValueChange={setValue}
    >
      <ComboboxTrigger className="h-11 w-90" aria-label="Open tags">
        {value.length === 0 ? (
          <span className="min-w-0 flex-1 truncate text-grayscale-opacity-400">
            Select tags
          </span>
        ) : (
          <span className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
            {visibleChips.map((item) => (
              <span
                key={item.value}
                className="inline-flex h-5 shrink-0 items-center rounded-full bg-grayscale-opacity-700 px-2.5 text-xs leading-5 text-background"
              >
                {item.label}
              </span>
            ))}
            {overflowCount > 0 ? (
              <ComboboxOverflowChip>
                +{overflowCount}
              </ComboboxOverflowChip>
            ) : null}
          </span>
        )}
      </ComboboxTrigger>
      <ComboboxContent className="max-h-120 py-0">
        <ComboboxHeader className="border-b border-grayscale-opacity-300 px-3 pt-3 pb-2">
          <ComboboxChips className="flex max-h-44 flex-wrap items-center gap-2 overflow-x-hidden overflow-y-auto">
            {value.map((item) => (
              <ComboboxChip key={item.value}>
                <span className="min-w-0 truncate">{item.label}</span>
                <ComboboxChipRemove
                  aria-label={`Remove ${item.label}`}
                />
              </ComboboxChip>
            ))}
            <ComboboxInput
              placeholder="Search tags"
              className="h-5 min-w-32 flex-1"
            />
          </ComboboxChips>
        </ComboboxHeader>
        <ComboboxList className="py-2">
          {(item: Option) => (
            <ComboboxItem
              key={item.value}
              value={item}
              className="pr-5"
            >
              <ComboboxItemCheckbox />
              <ComboboxItemText>{item.label}</ComboboxItemText>
            </ComboboxItem>
          )}
        </ComboboxList>
        <ComboboxEmpty>No matching tags</ComboboxEmpty>
        <div className="flex items-center justify-center border-t border-grayscale-opacity-300 pt-2 pb-3">
          <Button
            variant="ghost"
            theme="default"
            className="text-grayscale-opacity-600 [&_[data-icon]]:size-4.5"
          >
            <GearIcon data-icon="inline-start" />
            Manage tags
          </Button>
        </div>
      </ComboboxContent>
    </Combobox>
  );
}
