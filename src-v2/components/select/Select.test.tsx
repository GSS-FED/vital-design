import {
  fireEvent,
  queryByAttribute,
  render,
  screen,
  within,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemCheck,
  SelectItemCheckbox,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from './Select';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

const fruitItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

function getSelectTrigger() {
  return screen.getByRole('combobox', { expanded: false });
}

function createValueChangeMock() {
  return vi.fn<[unknown], void>();
}

function renderSelect(
  props: {
    disabled?: boolean;
    invalid?: boolean;
    value?: string;
  } = {},
) {
  const onValueChange = createValueChangeMock();

  const view = render(
    <Select
      items={fruitItems}
      value={props.value}
      onValueChange={onValueChange}
      disabled={props.disabled}
    >
      <SelectTrigger
        placeholder="Select a fruit"
        aria-invalid={props.invalid || undefined}
      />
      <SelectContent>
        {fruitItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            <SelectItemText>{item.label}</SelectItemText>
            <SelectItemCheck />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>,
  );

  return { onValueChange, ...view };
}

function renderMultipleSelect(value: string[] = []) {
  const onValueChange = createValueChangeMock();

  render(
    <Select
      multiple
      items={fruitItems.slice(0, 2)}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger placeholder="Select fruits" />
      <SelectContent>
        <SelectItem value="apple">
          <SelectItemCheckbox />
          <SelectItemText>Apple</SelectItemText>
        </SelectItem>
        <SelectItem value="banana">
          <SelectItemCheckbox />
          <SelectItemText>Banana</SelectItemText>
        </SelectItem>
      </SelectContent>
    </Select>,
  );

  return { onValueChange };
}

function openSelect() {
  fireEvent.click(screen.getByRole('combobox', { expanded: false }));
  return screen.getByRole('listbox');
}

function expectFirstValueChange(
  onValueChange: ReturnType<typeof createValueChangeMock>,
  expected: unknown,
) {
  expect(onValueChange).toHaveBeenCalled();
  expect(onValueChange.mock.calls[0]?.[0]).toEqual(expected);
}

describe('Select', () => {
  it('renders placeholder in Trigger', () => {
    renderSelect();
    expect(screen.getByText('Select a fruit')).toBeInTheDocument();
  });

  it('opens menu on Trigger click', () => {
    renderSelect();
    fireEvent.click(getSelectTrigger());
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('includes the shared floating motion classes', () => {
    const { baseElement } = renderSelect();

    openSelect();
    const content = queryByAttribute(
      'data-slot',
      baseElement,
      'select-content',
    );

    expect(content).toHaveClass(
      'origin-(--transform-origin)',
      'duration-100',
      'data-open:animate-in',
      'data-closed:animate-out',
      'data-[side=bottom]:slide-in-from-top-2',
    );
  });

  it('calls onValueChange when item is selected', () => {
    const { onValueChange } = renderSelect();
    fireEvent.click(getSelectTrigger());
    const item = screen.getByRole('option', { name: 'Banana' });
    fireEvent.mouseMove(item);
    fireEvent.click(item);
    expectFirstValueChange(onValueChange, 'banana');
  });

  it('shows selected label when items are provided', () => {
    renderSelect({ value: 'cherry' });
    expect(
      within(getSelectTrigger()).getByText('Cherry'),
    ).toBeInTheDocument();
  });

  it('disables Trigger when disabled', () => {
    renderSelect({ disabled: true });
    expect(getSelectTrigger()).toBeDisabled();
  });

  it('supports aria-invalid styling', () => {
    renderSelect({ invalid: true });
    expect(getSelectTrigger()).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('supports the named export surface', () => {
    const onValueChange = createValueChangeMock();

    render(
      <Select
        items={fruitItems.slice(0, 1)}
        value={undefined}
        onValueChange={onValueChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">
            <SelectItemText>Apple</SelectItemText>
            <SelectItemCheck />
          </SelectItem>
        </SelectContent>
      </Select>,
    );

    fireEvent.click(getSelectTrigger());
    const item = screen.getByRole('option', { name: 'Apple' });
    fireEvent.mouseMove(item);
    fireEvent.click(item);

    expectFirstValueChange(onValueChange, 'apple');
  });

  it('adds an item to a multiple value array', () => {
    const { onValueChange } = renderMultipleSelect();

    const listbox = openSelect();
    fireEvent.click(
      within(listbox).getByRole('option', { name: 'Apple' }),
    );

    expectFirstValueChange(onValueChange, ['apple']);
  });

  it('removes an existing item from a multiple value array', () => {
    const { onValueChange } = renderMultipleSelect(['apple']);

    const listbox = openSelect();
    fireEvent.click(
      within(listbox).getByRole('option', { name: 'Apple' }),
    );

    expectFirstValueChange(onValueChange, []);
  });

  it('renders multiple item checkbox affordances', () => {
    renderMultipleSelect();

    const listbox = openSelect();

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(
      within(listbox).getAllByTestId('select-checkbox'),
    ).toHaveLength(2);
  });

  it('selects the item when clicking the multiple checkbox affordance', () => {
    const { onValueChange } = renderMultipleSelect();

    const listbox = openSelect();
    const checkbox =
      within(listbox).getAllByTestId('select-checkbox')[0];
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox!);

    expectFirstValueChange(onValueChange, ['apple']);
  });

  it('moves the active multiple option with arrow keys before any item is selected', () => {
    renderMultipleSelect();

    const trigger = screen.getByRole('combobox', { expanded: false });
    fireEvent.click(trigger);

    const listbox = screen.getByRole('listbox');
    const apple = within(listbox).getByRole('option', {
      name: 'Apple',
    });
    const banana = within(listbox).getByRole('option', {
      name: 'Banana',
    });

    fireEvent.keyDown(apple, { key: 'ArrowDown' });

    expect(banana).toHaveAttribute('data-highlighted');

    fireEvent.keyDown(banana, { key: 'ArrowUp' });

    expect(apple).toHaveAttribute('data-highlighted');
  });
});
