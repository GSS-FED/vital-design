import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
// `page` queries the whole document, portaled popups included. Named
// `screen` for the testing-library lint rules.
import { page as screen } from 'vitest/browser';
import { renderedRegion } from '../../../visual/capture';
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxContent,
  ComboboxHeader,
  ComboboxItem,
  ComboboxItemCheckbox,
  ComboboxItemText,
  ComboboxList,
  ComboboxSearchBar,
  ComboboxTrigger,
  ComboboxValue,
} from './Combobox';
import { ComboboxExample } from './examples/ComboboxExample';
import { ComboboxMultipleExample } from './examples/ComboboxMultipleExample';
import { ComboboxTagPickerWithFooterExample } from './examples/ComboboxTagPickerWithFooterExample';

type Option = {
  label: string;
  value: string;
};

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

async function open(name: string) {
  await screen.getByRole('combobox', { name }).click();
  await vi.waitFor(() => screen.getByRole('listbox').element());
}

// Selected chips wrap onto new lines instead of collapsing into `+N`.
function MultipleWrap() {
  const [value, setValue] = useState<Option[]>(
    frameworks.slice(0, 5),
  );

  return (
    <Combobox
      multiple
      items={frameworks}
      itemToStringLabel={(item: Option | null) => item?.label ?? ''}
      itemToStringValue={(item: Option | null) => item?.value ?? ''}
      value={value}
      onValueChange={setValue}
    >
      <ComboboxTrigger
        nativeButton={false}
        render={<div />}
        className="h-auto min-h-8 w-72 items-start py-1"
        aria-label="Open frameworks"
      >
        <ComboboxValue placeholder="Search frameworks">
          {(selected: Option[]) => (
            <ComboboxChips className="flex-wrap overflow-visible">
              {selected.map((item) => (
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
          )}
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
}

describe('Combobox', () => {
  test('open', async () => {
    await render(<ComboboxExample />);
    await open('Open countries');
    await expect(await renderedRegion()).toMatchScreenshot(
      'combobox-open',
    );
  });

  test('filtered after typing', async () => {
    await render(<ComboboxExample />);
    await open('Open countries');
    await screen.getByPlaceholder('Search countries').fill('an');
    await vi.waitFor(() => {
      if (screen.getByRole('option').all().length !== 2) {
        throw new Error('list not filtered yet');
      }
    });
    await expect(await renderedRegion()).toMatchScreenshot(
      'combobox-open-filtered',
    );
  });

  test('no results', async () => {
    await render(<ComboboxExample />);
    await open('Open countries');
    await screen.getByPlaceholder('Search countries').fill('xyz');
    await vi.waitFor(() => screen.getByText('No results').element());
    await expect(await renderedRegion()).toMatchScreenshot(
      'combobox-open-empty',
    );
  });

  test('multiple open', async () => {
    await render(<ComboboxMultipleExample />);
    await open('Open frameworks');
    await expect(await renderedRegion()).toMatchScreenshot(
      'combobox-open-multiple',
    );
  });

  test('multiple chips wrap', async () => {
    await render(<MultipleWrap />);
    await expect(await renderedRegion()).toMatchScreenshot(
      'combobox-multiple-wrap',
    );
  });

  test('tag picker open', async () => {
    await render(<ComboboxTagPickerWithFooterExample />);
    await open('Open tags');
    await expect(await renderedRegion()).toMatchScreenshot(
      'combobox-open-tag-picker',
    );
  });
});
