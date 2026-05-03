import {
  fireEvent,
  queryByAttribute,
  render,
  screen,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Combobox,
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

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

function renderSingleCombobox() {
  const onValueChange = vi.fn();

  const view = render(
    <Combobox
      items={['Apple', 'Banana']}
      value={null}
      onValueChange={onValueChange}
    >
      <ComboboxTrigger aria-label="Open options">
        <ComboboxValue placeholder="Search options" />
      </ComboboxTrigger>
      <ComboboxContent emptyText="No results">
        <ComboboxHeader>
          <ComboboxSearchBar placeholder="Search options" />
        </ComboboxHeader>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              <ComboboxItemText>{item}</ComboboxItemText>
              <ComboboxItemCheck />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>,
  );

  return { onValueChange, ...view };
}

function openOptions() {
  fireEvent.click(
    screen.getByRole('combobox', { name: 'Open options' }),
  );
}

describe('Combobox', () => {
  it('filters items from the input', () => {
    renderSingleCombobox();

    openOptions();
    const input = screen.getByPlaceholderText('Search options');
    fireEvent.change(input, { target: { value: 'app' } });

    expect(
      screen.getByRole('option', { name: 'Apple' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: 'Banana' }),
    ).not.toBeInTheDocument();
  });

  it('includes the shared floating motion classes', () => {
    const { baseElement } = renderSingleCombobox();

    openOptions();
    const content = queryByAttribute(
      'data-slot',
      baseElement,
      'combobox-content',
    );

    expect(content).toHaveClass(
      'origin-(--transform-origin)',
      'duration-100',
      'data-open:animate-in',
      'data-closed:animate-out',
      'data-[side=bottom]:slide-in-from-top-2',
    );
  });

  it('calls onValueChange when an item is selected', () => {
    const { onValueChange } = renderSingleCombobox();

    openOptions();
    fireEvent.click(screen.getByRole('option', { name: 'Banana' }));

    expect(onValueChange).toHaveBeenCalledWith(
      'Banana',
      expect.any(Object),
    );
  });

  it('renders removable chips for multiple values', () => {
    const onValueChange = vi.fn();

    render(
      <Combobox
        multiple
        items={['React', 'Vue', 'Angular']}
        value={['React', 'Vue']}
        onValueChange={onValueChange}
      >
        <ComboboxTrigger
          nativeButton={false}
          render={<div />}
          aria-label="Open options"
        >
          <ComboboxTagsValue
            maxDisplayCount={1}
            placeholder="Search frameworks"
          />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxHeader>
            <ComboboxSearchBar placeholder="Search frameworks" />
          </ComboboxHeader>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                <ComboboxItemCheckbox />
                <ComboboxItemText>{item}</ComboboxItemText>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.queryByText('Vue')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Remove React'));

    expect(onValueChange).toHaveBeenCalledWith(
      ['Vue'],
      expect.any(Object),
    );
  });
});
