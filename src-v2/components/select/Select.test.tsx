import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Select, {
  type ItemType,
  SelectContent,
  SelectItem,
  SelectMenu,
  Select as SelectRoot,
  SelectTrigger,
} from './Select';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

const items: ItemType[] = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'Cherry' },
];

function getSelectTrigger() {
  return screen.getByRole('button', { expanded: false });
}

function renderSelect(
  props: {
    clearable?: boolean;
    disabled?: boolean;
    isError?: boolean;
    value?: ItemType;
    onClear?: () => void;
  } = {},
) {
  const onChange = vi.fn();
  render(
    <Select
      value={props.value}
      onChange={onChange}
      isError={props.isError}
      disabled={props.disabled}
    >
      <Select.Trigger
        placeholder="Select a fruit"
        clearable={props.clearable}
        onClear={props.onClear}
      />
      <Select.Content>
        <Select.Menu>
          {items.map((item) => (
            <Select.Item key={item.id} item={item} />
          ))}
        </Select.Menu>
      </Select.Content>
    </Select>,
  );
  return { onChange };
}

function renderMultiSelect(props = {}) {
  const onChange = vi.fn();
  render(
    <Select value={[]} onChange={onChange} isMultiple {...props}>
      <Select.Trigger placeholder="Select fruits" />
      <Select.Content>
        <Select.Menu>
          {items.map((item) => (
            <Select.Item key={item.id} item={item} hasCheckbox />
          ))}
        </Select.Menu>
      </Select.Content>
    </Select>,
  );
  return { onChange };
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

  it('calls onChange when item is selected', () => {
    const { onChange } = renderSelect();
    fireEvent.click(getSelectTrigger());
    fireEvent.click(screen.getByText('Banana'));
    expect(onChange).toHaveBeenCalledWith(items[1]);
  });

  it('shows selected value in Trigger', () => {
    renderSelect({ value: items[2] });
    expect(
      within(getSelectTrigger()).getByText('Cherry'),
    ).toBeInTheDocument();
  });

  it('renders multiple selected values as tags', () => {
    renderMultiSelect({ value: [items[0], items[1]] });
    expect(
      within(getSelectTrigger()).getByText('Apple'),
    ).toBeInTheDocument();
    expect(
      within(getSelectTrigger()).getByText('Banana'),
    ).toBeInTheDocument();
  });

  it('renders long selected values inside the trigger', () => {
    const longItems: ItemType[] = [
      {
        id: 'long-1',
        label:
          'A very long selected fruit label that should stay clipped',
      },
      {
        id: 'long-2',
        label:
          'Another very long selected fruit label for the trigger',
      },
    ];
    const onChange = vi.fn();

    render(
      <SelectRoot value={longItems} onChange={onChange} isMultiple>
        <SelectTrigger placeholder="Pick fruits" />
        <SelectContent>
          <SelectMenu>
            {longItems.map((item) => (
              <SelectItem key={item.id} item={item} hasCheckbox />
            ))}
          </SelectMenu>
        </SelectContent>
      </SelectRoot>,
    );

    const trigger = getSelectTrigger();

    expect(
      within(trigger).getByText(longItems[0]!.label),
    ).toBeInTheDocument();
    expect(
      within(trigger).getByText(longItems[1]!.label),
    ).toBeInTheDocument();
    expect(within(trigger).getAllByLabelText('Remove')).toHaveLength(
      2,
    );
  });

  it('calls onChange when item is selected (multiple)', () => {
    const { onChange } = renderMultiSelect();
    fireEvent.click(getSelectTrigger());
    fireEvent.click(screen.getByText('Apple'));
    expect(onChange).toHaveBeenCalledWith(items[0]);
  });

  it('disables Trigger when disabled', () => {
    renderSelect({ disabled: true });
    expect(getSelectTrigger()).toHaveClass('pointer-events-none');
  });

  it('shows error style when isError is true', () => {
    renderSelect({ isError: true });
    expect(getSelectTrigger()).toHaveClass('border-alarm-500');
  });

  it('renders clear icon and calls onClear', () => {
    const onClear = vi.fn();
    renderSelect({ value: items[0], clearable: true, onClear });
    const clearButton = screen.getByTestId('clear-button');
    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalled();
  });

  it('supports the named export surface', () => {
    const onChange = vi.fn();

    render(
      <SelectRoot value={undefined} onChange={onChange}>
        <SelectTrigger placeholder="Pick one" />
        <SelectContent>
          <SelectMenu>
            <SelectItem item={items[0]!} />
          </SelectMenu>
        </SelectContent>
      </SelectRoot>,
    );

    fireEvent.click(getSelectTrigger());
    fireEvent.click(screen.getByText('Apple'));

    expect(onChange).toHaveBeenCalledWith(items[0]);
  });

  it('lets trigger and item render with different tags', () => {
    const onChange = vi.fn();

    render(
      <SelectRoot value={undefined} onChange={onChange}>
        <SelectTrigger
          placeholder="Pick one"
          render={
            <button
              type="button"
              data-testid="select-trigger-render"
            />
          }
        />
        <SelectContent>
          <SelectMenu>
            <SelectItem
              item={items[0]!}
              render={
                <button
                  type="button"
                  data-testid="select-item-render"
                />
              }
            />
          </SelectMenu>
        </SelectContent>
      </SelectRoot>,
    );

    const trigger = screen.getByTestId('select-trigger-render');
    expect(trigger.tagName).toBe('BUTTON');
    expect(trigger).toHaveAttribute('data-slot', 'select-trigger');

    fireEvent.click(trigger);

    const item = screen.getByTestId('select-item-render');
    expect(item.tagName).toBe('BUTTON');
    expect(item).toHaveAttribute('data-slot', 'select-item');

    fireEvent.click(item);
    expect(onChange).toHaveBeenCalledWith(items[0]);
  });
});
