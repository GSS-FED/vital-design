import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxContent,
  ComboboxHeader,
  ComboboxItem,
  ComboboxItemCheck,
  ComboboxItemCheckbox,
  ComboboxItemText,
  ComboboxList,
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
