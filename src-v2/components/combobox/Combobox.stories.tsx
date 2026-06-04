import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { ComponentProps } from 'react';
import { Button } from '../button/Button';
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
  ComboboxItemCheck,
  ComboboxItemCheckbox,
  ComboboxItemText,
  ComboboxList,
  ComboboxOverflowChip,
  ComboboxSearchBar,
  ComboboxTagsValue,
  ComboboxTrigger,
  ComboboxValue,
} from './Combobox';

type Story = StoryObj<typeof Combobox>;

type Option = {
  label: string;
  value: string;
};

const countries: Option[] = [
  { label: 'Taiwan', value: 'tw' },
  { label: 'Japan', value: 'jp' },
  { label: 'Singapore', value: 'sg' },
  { label: 'South Korea', value: 'kr' },
];

const frameworks: Option[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Preact', value: 'preact' },
  { label: 'Ember', value: 'ember' },
  { label: 'Backbone', value: 'backbone' },
];

const tags: Option[] = Array.from({ length: 24 }, (_, index) => ({
  label: '標籤',
  value: `tag-${index + 1}`,
}));

function itemToStringLabel(item: Option | null) {
  return item?.label ?? '';
}

function itemToStringValue(item: Option | null) {
  return item?.value ?? '';
}

function getOption(item: unknown) {
  if (item && typeof item === 'object') {
    const option = item as { label?: unknown; value?: unknown };

    if (
      typeof option.label === 'string' &&
      typeof option.value === 'string'
    ) {
      return item as Option;
    }
  }

  return null;
}

function isOption(item: Option | null): item is Option {
  return item !== null;
}

function uniqueOptions(items: Option[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.value)) return false;

    seen.add(item.value);
    return true;
  });
}

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  args: {
    autoHighlight: true,
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Option | null>(null);

    return (
      <Combobox
        autoHighlight={Boolean(args.autoHighlight)}
        items={countries}
        itemToStringLabel={(item) =>
          itemToStringLabel(getOption(item))
        }
        itemToStringValue={(item) =>
          itemToStringValue(getOption(item))
        }
        value={value}
        onValueChange={(nextValue) => setValue(getOption(nextValue))}
      >
        <ComboboxTrigger className="w-60" aria-label="Open countries">
          <ComboboxValue placeholder="Search countries" />
        </ComboboxTrigger>
        <ComboboxContent emptyText="No results">
          <ComboboxHeader>
            <ComboboxSearchBar placeholder="Search countries" />
          </ComboboxHeader>
          <ComboboxList>
            {(item: Option) => (
              <ComboboxItem key={item.value} value={item}>
                <ComboboxItemText>{item.label}</ComboboxItemText>
                <ComboboxItemCheck />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  },
};

export const Multiple: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Option[]>(
      frameworks.slice(0, 4),
    );

    return (
      <Combobox
        autoHighlight={Boolean(args.autoHighlight)}
        multiple
        items={frameworks}
        itemToStringLabel={(item) =>
          itemToStringLabel(getOption(item))
        }
        itemToStringValue={(item) =>
          itemToStringValue(getOption(item))
        }
        value={value}
        onValueChange={(nextValue) =>
          setValue(
            uniqueOptions(
              nextValue
                .map((item) => getOption(item))
                .filter(isOption),
            ),
          )
        }
      >
        <ComboboxTrigger
          nativeButton={false}
          render={<div />}
          className="w-72"
          aria-label="Open frameworks"
        >
          <ComboboxTagsValue
            maxDisplayCount={2}
            placeholder="Search frameworks"
          />
        </ComboboxTrigger>
        <ComboboxContent emptyText="No results">
          <ComboboxHeader>
            <ComboboxSearchBar placeholder="Search frameworks" />
          </ComboboxHeader>
          <ComboboxList>
            {(item: Option) => (
              <ComboboxItem key={item.value} value={item}>
                <ComboboxItemCheckbox />
                <ComboboxItemText>{item.label}</ComboboxItemText>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  },
};

export const MultipleWrap: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Option[]>(
      frameworks.slice(0, 5),
    );

    return (
      <Combobox
        autoHighlight={Boolean(args.autoHighlight)}
        multiple
        items={frameworks}
        itemToStringLabel={(item) =>
          itemToStringLabel(getOption(item))
        }
        itemToStringValue={(item) =>
          itemToStringValue(getOption(item))
        }
        value={value}
        onValueChange={(nextValue) =>
          setValue(
            uniqueOptions(
              nextValue
                .map((item) => getOption(item))
                .filter(isOption),
            ),
          )
        }
      >
        <ComboboxTrigger
          nativeButton={false}
          render={<div />}
          className="h-auto min-h-8 w-72 items-start py-1"
          aria-label="Open frameworks"
        >
          <ComboboxValue placeholder="Search frameworks">
            {(selectedValue: unknown) => {
              const selectedItems = Array.isArray(selectedValue)
                ? selectedValue
                    .map((item) => getOption(item))
                    .filter(isOption)
                : [];

              if (selectedItems.length === 0) {
                return (
                  <span className="min-w-0 flex-1 truncate text-grayscale-opacity-400">
                    Search frameworks
                  </span>
                );
              }

              return (
                <ComboboxChips className="flex-wrap overflow-visible">
                  {selectedItems.map((item) => (
                    <ComboboxChip key={item.value}>
                      <span className="min-w-0 truncate">
                        {item.label}
                      </span>
                      <ComboboxChipRemove
                        aria-label={`Remove ${item.label}`}
                      />
                    </ComboboxChip>
                  ))}
                </ComboboxChips>
              );
            }}
          </ComboboxValue>
        </ComboboxTrigger>
        <ComboboxContent emptyText="No results">
          <ComboboxHeader>
            <ComboboxSearchBar placeholder="Search frameworks" />
          </ComboboxHeader>
          <ComboboxList>
            {(item: Option) => (
              <ComboboxItem key={item.value} value={item}>
                <ComboboxItemCheckbox />
                <ComboboxItemText>{item.label}</ComboboxItemText>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  },
};

function GearIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/**
 * Proof that the Figma tag picker composes entirely from existing Combobox
 * primitives + Button — no new primitive is required.
 *
 * - Collapsed trigger (`標籤 標籤 標籤 +9`): read-only pills + `ComboboxOverflowChip`
 * - Popup header: `ComboboxChips` / `ComboboxChip` / `ComboboxChipRemove` +
 *   `ComboboxInput` (the input lives inside the popup; the trigger stays the
 *   anchor via Base UI's `inputInsidePopup` handling)
 * - Options: `ComboboxItem` + `ComboboxItemCheckbox`
 * - Footer (`管理標籤`): `Button` with an inline gear icon
 */
export const TagPickerWithFooter: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Option[]>(tags.slice(0, 12));
    const visibleChips = value.slice(0, 3);
    const overflowCount = value.length - visibleChips.length;

    return (
      <Combobox
        autoHighlight={Boolean(args.autoHighlight)}
        multiple
        items={tags}
        itemToStringLabel={(item) =>
          itemToStringLabel(getOption(item))
        }
        itemToStringValue={(item) =>
          itemToStringValue(getOption(item))
        }
        value={value}
        onValueChange={(nextValue) =>
          setValue(
            uniqueOptions(
              nextValue
                .map((item) => getOption(item))
                .filter(isOption),
            ),
          )
        }
      >
        <ComboboxTrigger
          className="h-11 w-[360px]"
          aria-label="開啟標籤選單"
        >
          {value.length === 0 ? (
            <span className="min-w-0 flex-1 truncate text-grayscale-opacity-400">
              選擇標籤
            </span>
          ) : (
            <span className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
              {visibleChips.map((item) => (
                <span
                  key={item.value}
                  className="inline-flex h-5 shrink-0 items-center rounded-full bg-grayscale-700 px-2.5 text-xs leading-5 text-white"
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
        <ComboboxContent className="max-h-[480px] py-0">
          <ComboboxHeader className="border-b border-grayscale-opacity-300 px-3 pt-3 pb-2">
            <ComboboxChips className="flex max-h-44 flex-wrap items-center gap-2 overflow-x-hidden overflow-y-auto">
              {value.map((item) => (
                <ComboboxChip key={item.value}>
                  <span className="min-w-0 truncate">
                    {item.label}
                  </span>
                  <ComboboxChipRemove
                    aria-label={`移除 ${item.label}`}
                  />
                </ComboboxChip>
              ))}
              <ComboboxInput
                placeholder="輸入關鍵字"
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
          <ComboboxEmpty>找不到符合的標籤</ComboboxEmpty>
          <div className="flex items-center justify-center border-t border-grayscale-opacity-300 pt-2 pb-3">
            <Button
              variant="ghost"
              theme="default"
              className="text-grayscale-opacity-600 [&_[data-icon]]:size-4.5"
              onClick={() => {}}
            >
              <GearIcon data-icon="inline-start" />
              管理標籤
            </Button>
          </div>
        </ComboboxContent>
      </Combobox>
    );
  },
};
