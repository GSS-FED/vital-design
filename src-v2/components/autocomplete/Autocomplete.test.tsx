import {
  queryAllByAttribute,
  queryByAttribute,
  render,
  screen,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteItemText,
  AutocompleteTrigger,
} from './Autocomplete';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

type Tag = {
  id: string;
  value: string;
};

type TagGroup = {
  value: string;
  items: string[];
};

const tags: Tag[] = [
  { id: 'feature', value: 'feature' },
  { id: 'fix', value: 'fix' },
  { id: 'docs', value: 'docs' },
];

function findSlot(container: HTMLElement, slot: string): HTMLElement {
  const el = queryByAttribute('data-slot', container, slot);
  if (!el) {
    throw new Error(`Could not find [data-slot="${slot}"]`);
  }
  return el;
}

function findSlots(
  container: HTMLElement,
  slot: string,
): HTMLElement[] {
  const els = queryAllByAttribute('data-slot', container, slot);
  if (els.length === 0) {
    throw new Error(`Could not find [data-slot="${slot}"]`);
  }
  return els;
}

function renderAutocomplete(props: { defaultValue?: string } = {}) {
  return render(
    <Autocomplete
      defaultOpen
      defaultValue={props.defaultValue}
      items={tags}
      itemToStringValue={(tag: Tag) => tag.value}
    >
      <label>
        Search tags
        <AutocompleteInputGroup>
          <AutocompleteIcon />
          <AutocompleteInput placeholder="e.g. feature" />
          <AutocompleteClear />
          <AutocompleteTrigger />
        </AutocompleteInputGroup>
      </label>
      <AutocompleteContent emptyText="No tags found.">
        {(tag: Tag) => (
          <AutocompleteItem key={tag.id} value={tag}>
            <AutocompleteItemText>{tag.value}</AutocompleteItemText>
          </AutocompleteItem>
        )}
      </AutocompleteContent>
    </Autocomplete>,
  );
}

describe('Autocomplete', () => {
  it('renders an accessible free-form input', () => {
    renderAutocomplete();

    expect(
      screen.getByRole('combobox', { name: 'Search tags' }),
    ).toBeInTheDocument();
  });

  it('exposes stable slots on input parts', () => {
    const { baseElement } = renderAutocomplete({
      defaultValue: 'feature',
    });

    expect(
      findSlot(baseElement, 'autocomplete-input-group'),
    ).toHaveClass('border-grayscale-300', 'bg-white');
    expect(findSlot(baseElement, 'autocomplete-input')).toHaveClass(
      'placeholder:text-grayscale-400',
    );
    expect(
      findSlot(baseElement, 'autocomplete-icon'),
    ).toBeInTheDocument();
    expect(
      findSlot(baseElement, 'autocomplete-clear'),
    ).toBeInTheDocument();
    expect(
      findSlot(baseElement, 'autocomplete-trigger'),
    ).toBeInTheDocument();
  });

  it('renders content, list, and item slots', () => {
    const { baseElement } = renderAutocomplete();

    expect(findSlot(baseElement, 'autocomplete-popup')).toHaveClass(
      'shadow-emphasis',
      'bg-white',
    );
    expect(
      findSlot(baseElement, 'autocomplete-list'),
    ).toBeInTheDocument();
    expect(
      findSlots(baseElement, 'autocomplete-item')[0],
    ).toHaveClass('data-[highlighted]:bg-grayscale-100');
    expect(screen.getByText('feature')).toBeInTheDocument();
  });

  it('supports grouped items through Base UI collection parts', () => {
    const groups: TagGroup[] = [
      { value: 'Work', items: ['feature', 'fix'] },
      { value: 'Docs', items: ['docs'] },
    ];

    const { baseElement } = render(
      <Autocomplete<TagGroup> defaultOpen items={groups}>
        <AutocompleteInputGroup>
          <AutocompleteInput aria-label="Search grouped tags" />
        </AutocompleteInputGroup>
        <AutocompleteContent>
          {(group: TagGroup) => (
            <AutocompleteGroup key={group.value} items={group.items}>
              <AutocompleteGroupLabel>
                {group.value}
              </AutocompleteGroupLabel>
              {group.items.map((item) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              ))}
            </AutocompleteGroup>
          )}
        </AutocompleteContent>
      </Autocomplete>,
    );

    expect(
      findSlots(baseElement, 'autocomplete-group')[0],
    ).toBeInTheDocument();
    expect(
      findSlots(baseElement, 'autocomplete-group-label')[0],
    ).toHaveTextContent('Work');
  });

  it('renders empty state when the filtered list has no matches', () => {
    const { baseElement } = render(
      <Autocomplete defaultOpen defaultValue="zzz" items={tags}>
        <AutocompleteInputGroup>
          <AutocompleteInput aria-label="Search tags" />
        </AutocompleteInputGroup>
        <AutocompleteContent emptyText="No tags found.">
          {(tag: Tag) => (
            <AutocompleteItem key={tag.id} value={tag}>
              {tag.value}
            </AutocompleteItem>
          )}
        </AutocompleteContent>
      </Autocomplete>,
    );

    expect(
      findSlot(baseElement, 'autocomplete-empty'),
    ).toHaveTextContent('No tags found.');
  });
});
