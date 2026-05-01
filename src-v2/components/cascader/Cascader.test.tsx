import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  Cascader,
  CascaderBackItem,
  CascaderContent,
  CascaderGroup,
  CascaderItem,
  CascaderItemIndicator,
  CascaderItemText,
  CascaderList,
  CascaderSearch,
  CascaderTrigger,
  CascaderValue,
} from './Cascader';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);
window.HTMLElement.prototype.scrollIntoView = vi.fn();

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

const items: LocationItem[] = [
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
];

function getItems(parentValue: string | null, searchValue: string) {
  const normalizedSearchValue = searchValue.trim().toLowerCase();

  return items.filter((item) => {
    if (item.parentValue !== parentValue) return false;
    if (!normalizedSearchValue) return true;

    return item.label.toLowerCase().includes(normalizedSearchValue);
  });
}

type TestCascaderProps = {
  clearable?: boolean;
  onClear?: () => void;
  onOpenChange?: (open: boolean) => void;
  onSelectItem?: (item: SelectedLocation) => void;
  open?: boolean;
  value?: SelectedLocation | null;
};

function TestCascader({
  clearable,
  onClear,
  onOpenChange,
  onSelectItem,
  open,
  value: valueProp,
}: TestCascaderProps) {
  const [value, setValue] = useState<SelectedLocation | null>(
    valueProp ?? null,
  );
  const [pages, setPages] = useState<LocationItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const currentPage = pages[pages.length - 1] ?? null;
  const visibleItems = getItems(
    currentPage?.value ?? null,
    searchValue,
  );
  const selectedValue = valueProp ?? value;

  const openPage = (item: LocationItem) => {
    setPages((prev) => [...prev, item]);
    setSearchValue('');
  };

  const selectItem = (item: LocationItem) => {
    const nextValue = {
      label: item.label,
      path: [...pages, item],
      value: item.value,
    };

    if (valueProp === undefined) {
      setValue(nextValue);
    }

    onSelectItem?.(nextValue);
    setPages([]);
    setSearchValue('');
  };

  return (
    <Cascader
      open={open}
      pageKey={currentPage?.value}
      searchValue={searchValue}
      canGoBack={pages.length > 0}
      onBack={() => {
        setPages((prev) => prev.slice(0, -1));
      }}
      onOpenChange={onOpenChange}
      onSearchValueChange={setSearchValue}
    >
      <CascaderTrigger
        clearable={clearable}
        onClear={onClear}
        placeholder="Select location"
      >
        <CascaderValue placeholder="Select location">
          {selectedValue?.label}
        </CascaderValue>
      </CascaderTrigger>
      <CascaderContent>
        <CascaderBackItem>{currentPage?.label}</CascaderBackItem>
        <CascaderSearch placeholder="Search" />
        <CascaderList>
          <CascaderGroup>
            {visibleItems.map((item) => (
              <CascaderItem
                key={item.value}
                value={item.value}
                closeOnSelect={!item.hasChildren}
                onSelect={() => {
                  if (item.hasChildren) {
                    openPage(item);
                    return;
                  }

                  selectItem(item);
                }}
              >
                <CascaderItemText>{item.label}</CascaderItemText>
                {item.hasChildren ? <CascaderItemIndicator /> : null}
              </CascaderItem>
            ))}
          </CascaderGroup>
        </CascaderList>
      </CascaderContent>
    </Cascader>
  );
}

function getCascaderTrigger() {
  return screen.getByRole('combobox', { expanded: false });
}

describe('Cascader', () => {
  it('lets consumers own the selected value shape', () => {
    const onSelectItem = vi.fn();

    render(<TestCascader onSelectItem={onSelectItem} />);

    fireEvent.click(getCascaderTrigger());
    fireEvent.click(screen.getByText('Taiwan'));
    fireEvent.click(screen.getByText('Taipei'));

    expect(onSelectItem).toHaveBeenCalledWith({
      label: 'Taipei',
      path: [
        {
          hasChildren: true,
          label: 'Taiwan',
          parentValue: null,
          value: 'tw',
        },
        { label: 'Taipei', parentValue: 'tw', value: 'tpe' },
      ],
      value: 'tpe',
    });
    expect(
      screen.queryByPlaceholderText('Search'),
    ).not.toBeInTheDocument();
  });

  it('goes back one page on backspace when search is empty', () => {
    render(<TestCascader />);

    fireEvent.click(getCascaderTrigger());
    fireEvent.click(screen.getByText('Taiwan'));

    expect(screen.getByText('Taipei')).toBeInTheDocument();

    fireEvent.keyDown(screen.getByPlaceholderText('Search'), {
      key: 'Backspace',
    });

    expect(screen.queryByText('Taipei')).not.toBeInTheDocument();
    expect(screen.getByText('Taiwan')).toBeInTheDocument();
  });

  it('goes back one page from the explicit back item', () => {
    render(<TestCascader />);

    fireEvent.click(getCascaderTrigger());
    fireEvent.click(screen.getByText('Taiwan'));
    fireEvent.click(screen.getByRole('button', { name: 'Taiwan' }));

    expect(screen.queryByText('Taipei')).not.toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('opens the selected branch with Enter from search', async () => {
    render(<TestCascader />);

    fireEvent.click(getCascaderTrigger());
    fireEvent.keyDown(screen.getByPlaceholderText('Search'), {
      key: 'Enter',
    });

    await waitFor(() => {
      expect(screen.getByText('Taipei')).toBeInTheDocument();
    });
  });

  it('focuses the search input when opened', async () => {
    render(<TestCascader />);

    fireEvent.click(getCascaderTrigger());

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search')).toHaveFocus();
    });
  });

  it('opens from trigger keyboard navigation', async () => {
    render(<TestCascader />);

    fireEvent.keyDown(getCascaderTrigger(), { key: 'ArrowDown' });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search')).toHaveFocus();
    });
    expect(screen.getByText('Taiwan')).toBeInTheDocument();
  });

  it('keeps disabled and invalid styling on the trigger', () => {
    render(
      <Cascader>
        <CascaderTrigger
          disabled
          aria-invalid
          placeholder="Select location"
        />
      </Cascader>,
    );

    const trigger = screen.getByRole('combobox');

    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
  });

  it('clears from trigger keyboard without opening the popup', () => {
    const onClear = vi.fn();

    render(
      <TestCascader
        clearable
        onClear={onClear}
        value={{
          label: 'Taipei',
          path: [
            {
              hasChildren: true,
              label: 'Taiwan',
              parentValue: null,
              value: 'tw',
            },
            { label: 'Taipei', parentValue: 'tw', value: 'tpe' },
          ],
          value: 'tpe',
        }}
      />,
    );

    fireEvent.keyDown(getCascaderTrigger(), { key: 'Backspace' });

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByPlaceholderText('Search'),
    ).not.toBeInTheDocument();
  });

  it('clears search state when controlled open closes', async () => {
    const { rerender } = render(<TestCascader open />);

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'tai' },
    });
    expect(screen.getByPlaceholderText('Search')).toHaveValue('tai');

    rerender(<TestCascader open={false} />);
    rerender(<TestCascader open />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search')).toHaveValue('');
    });
  });

  it('does not reset search on initial closed mount', () => {
    const onSearchValueChange = vi.fn();

    render(
      <Cascader
        searchValue=""
        onSearchValueChange={onSearchValueChange}
      >
        <CascaderTrigger placeholder="Select location" />
        <CascaderContent>
          <CascaderSearch placeholder="Search" />
        </CascaderContent>
      </Cascader>,
    );

    expect(onSearchValueChange).not.toHaveBeenCalled();
  });

  it('resets search once when the popup closes', async () => {
    const onSearchValueChange = vi.fn();

    function ControlledCascader() {
      const [open, setOpen] = useState(true);
      const [searchValue, setSearchValue] = useState('tai');

      return (
        <>
          <button type="button" onClick={() => setOpen(false)}>
            Close popup
          </button>
          <Cascader
            open={open}
            searchValue={searchValue}
            onOpenChange={setOpen}
            onSearchValueChange={(nextValue) => {
              setSearchValue(nextValue);
              onSearchValueChange(nextValue);
            }}
          >
            <CascaderTrigger placeholder="Select location" />
            <CascaderContent>
              <CascaderSearch placeholder="Search" />
            </CascaderContent>
          </Cascader>
        </>
      );
    }

    render(<ControlledCascader />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Close popup' }),
    );

    await waitFor(() => {
      expect(onSearchValueChange).toHaveBeenCalledTimes(1);
    });
    expect(onSearchValueChange).toHaveBeenCalledWith('');
  });

  it('does not swallow back keys when no back handler is provided', () => {
    render(
      <Cascader defaultOpen canGoBack>
        <CascaderTrigger placeholder="Select location" />
        <CascaderContent data-testid="content">
          <CascaderSearch placeholder="Search" />
        </CascaderContent>
      </Cascader>,
    );

    const wasNotCanceled = fireEvent.keyDown(
      screen.getByTestId('content'),
      {
        key: 'Escape',
      },
    );

    expect(wasNotCanceled).toBe(true);
    expect(
      screen.queryByRole('button', { name: 'Back' }),
    ).not.toBeInTheDocument();
  });
});
