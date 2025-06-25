import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { colors } from 'src/constants';
import Select, { ItemType } from './Select';

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
      value={undefined}
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
    const triggerElement = screen.getByTestId('select-trigger');
    fireEvent.click(triggerElement);
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('calls onChange when item is selected', () => {
    const { onChange } = renderSelect();
    const triggerElement = screen.getByTestId('select-trigger');
    fireEvent.click(triggerElement);
    fireEvent.click(screen.getByText('Banana'));
    expect(onChange).toHaveBeenCalledWith(items[1]);
  });

  it('shows selected value in Trigger', () => {
    renderSelect({ value: items[2] });
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('renders multiple selected values as tags', () => {
    renderMultiSelect({ value: [items[0], items[1]] });
    const triggerElement = screen.getByTestId('select-trigger');
    expect(
      within(triggerElement).getByText('Apple'),
    ).toBeInTheDocument();
    expect(
      within(triggerElement).getByText('Banana'),
    ).toBeInTheDocument();
  });

  it('calls onChange when item is selected (multiple)', () => {
    const { onChange } = renderMultiSelect();
    const triggerElement = screen.getByTestId('select-trigger');
    fireEvent.click(triggerElement);
    fireEvent.click(screen.getByText('Apple'));
    expect(onChange).toHaveBeenCalledWith(items[0]);
  });

  it('disables Trigger when disabled', () => {
    renderSelect({ disabled: true });
    const triggerElement = screen.getByTestId('select-trigger');
    expect(triggerElement).toHaveStyle('pointer-events: none');
  });

  it('shows error style when isError is true', () => {
    renderSelect({ isError: true });
    const triggerElement = screen.getByTestId('select-trigger');
    expect(triggerElement).toHaveStyle(
      `border-color: ${colors.alarm500}`,
    );
  });

  it('renders clear icon and calls onClear', () => {
    const onClear = vi.fn();
    renderSelect({ value: items[0], clearable: true, onClear });
    const clearButton = screen.getByTestId('clear-button');
    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalled();
  });
});
