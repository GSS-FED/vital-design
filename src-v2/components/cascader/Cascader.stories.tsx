import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { UIEvent } from 'react';
import { Button } from '../button/Button';
import {
  Cascader,
  CascaderBackItem,
  CascaderContent,
  CascaderGroup,
  CascaderItem,
  CascaderItemIndicator,
  CascaderItemText,
  CascaderList,
  CascaderLoading,
  CascaderSearch,
  CascaderTrigger,
  CascaderValue,
} from './Cascader';

type Story = StoryObj<typeof Cascader>;

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
  { label: 'Osaka', parentValue: 'jp', value: 'osa' },
];

const loadMoreItems: LocationItem[] = [
  {
    label: 'Engineering',
    parentValue: null,
    value: 'engineering',
    hasChildren: true,
  },
  {
    label: 'Product',
    parentValue: null,
    value: 'product',
    hasChildren: true,
  },
  {
    label: 'Design',
    parentValue: null,
    value: 'design',
    hasChildren: true,
  },
  ...Array.from({ length: 12 }).map((_, index) => ({
    label: `Root item ${index + 1}`,
    parentValue: null,
    value: `root-${index + 1}`,
  })),
  ...Array.from({ length: 12 }).map((_, index) => ({
    label: `Engineering item ${index + 1}`,
    parentValue: 'engineering',
    value: `engineering-${index + 1}`,
  })),
  ...Array.from({ length: 8 }).map((_, index) => ({
    label: `Product item ${index + 1}`,
    parentValue: 'product',
    value: `product-${index + 1}`,
  })),
  ...Array.from({ length: 8 }).map((_, index) => ({
    label: `Design item ${index + 1}`,
    parentValue: 'design',
    value: `design-${index + 1}`,
  })),
];

function getItems(
  sourceItems: LocationItem[],
  parentValue: string | null,
  searchValue: string,
) {
  const normalizedSearchValue = searchValue.trim().toLowerCase();

  return sourceItems.filter((item) => {
    if (item.parentValue !== parentValue) return false;
    if (!normalizedSearchValue) return true;

    return item.label.toLowerCase().includes(normalizedSearchValue);
  });
}

function createLoadedItems(parentValue: string | null, page: number) {
  const prefix = parentValue ?? 'root';
  const parentLabel = parentValue ? `${parentValue} ` : '';

  return Array.from({ length: 10 }).map((_, index) => {
    const itemNumber = page * 10 + index + 1;

    return {
      label: `${parentLabel}Loaded item ${itemNumber}`,
      parentValue,
      value: `${prefix}-loaded-${itemNumber}`,
    };
  });
}

const meta: Meta<typeof Cascader> = {
  title: 'Components/Cascader',
  component: Cascader,
  tags: ['autodocs'],
  args: {
    className: 'w-60',
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<SelectedLocation | null>(null);
    const [pages, setPages] = useState<LocationItem[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const currentPage = pages[pages.length - 1] ?? null;
    const visibleItems = getItems(
      items,
      currentPage?.value ?? null,
      searchValue,
    );

    const openPage = (item: LocationItem) => {
      setPages((prev) => [...prev, item]);
      setSearchValue('');
    };

    const selectItem = (item: LocationItem) => {
      setValue({
        label: item.label,
        path: [...pages, item],
        value: item.value,
      });
      setPages([]);
      setSearchValue('');
    };

    return (
      <Cascader
        {...args}
        pageKey={currentPage?.value}
        searchValue={searchValue}
        canGoBack={pages.length > 0}
        onBack={() => {
          setPages((prev) => prev.slice(0, -1));
        }}
        onSearchValueChange={setSearchValue}
      >
        <CascaderTrigger
          clearable={value !== null}
          onClear={() => {
            setValue(null);
            setPages([]);
            setSearchValue('');
          }}
        >
          <CascaderValue placeholder="Select location">
            {value?.label}
          </CascaderValue>
        </CascaderTrigger>
        <CascaderContent>
          <CascaderBackItem>{currentPage?.label}</CascaderBackItem>
          <CascaderSearch placeholder="Search locations" />
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
                  {item.hasChildren ? (
                    <CascaderItemIndicator />
                  ) : null}
                </CascaderItem>
              ))}
            </CascaderGroup>
          </CascaderList>
        </CascaderContent>
      </Cascader>
    );
  },
};

export const WithButtonTrigger: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<SelectedLocation | null>(null);
    const [pages, setPages] = useState<LocationItem[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const currentPage = pages[pages.length - 1] ?? null;
    const visibleItems = getItems(
      items,
      currentPage?.value ?? null,
      searchValue,
    );

    const resetView = () => {
      setPages([]);
      setSearchValue('');
    };

    const openPage = (item: LocationItem) => {
      setPages((prev) => [...prev, item]);
      setSearchValue('');
    };

    const selectItem = (item: LocationItem) => {
      setValue({
        label: item.label,
        path: [...pages, item],
        value: item.value,
      });
      setOpen(false);
      resetView();
    };

    return (
      <Cascader
        {...args}
        className="w-fit"
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);

          if (!nextOpen) {
            resetView();
          }
        }}
        pageKey={currentPage?.value}
        searchValue={searchValue}
        canGoBack={pages.length > 0}
        onBack={() => {
          setPages((prev) => prev.slice(0, -1));
        }}
        onSearchValueChange={setSearchValue}
      >
        <CascaderTrigger
          clearable={false}
          render={({ className: _className, ...triggerProps }) => {
            void _className;

            return (
              <Button {...triggerProps} theme="default">
                {value
                  ? `Location: ${value.label}`
                  : 'Assign location'}
              </Button>
            );
          }}
        />
        <CascaderContent className="w-64">
          <CascaderBackItem>{currentPage?.label}</CascaderBackItem>
          <CascaderSearch placeholder="Search locations" />
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
                  {item.hasChildren ? (
                    <CascaderItemIndicator />
                  ) : null}
                </CascaderItem>
              ))}
            </CascaderGroup>
          </CascaderList>
        </CascaderContent>
      </Cascader>
    );
  },
};

export const LoadMore: Story = {
  render: function Render(args) {
    const [sourceItems, setSourceItems] =
      useState<LocationItem[]>(loadMoreItems);
    const [value, setValue] = useState<SelectedLocation | null>(null);
    const [pages, setPages] = useState<LocationItem[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadCounts, setLoadCounts] = useState<
      Record<string, number>
    >({});
    const currentPage = pages[pages.length - 1] ?? null;
    const parentValue = currentPage?.value ?? null;
    const pageKey = parentValue ?? 'root';
    const visibleItems = getItems(
      sourceItems,
      parentValue,
      searchValue,
    );
    const canLoadMore =
      searchValue.length === 0 && (loadCounts[pageKey] ?? 0) < 3;

    const loadMore = () => {
      if (isLoading || !canLoadMore) return;

      const currentCount = loadCounts[pageKey] ?? 0;
      setIsLoading(true);

      window.setTimeout(() => {
        setSourceItems((prev) => [
          ...prev,
          ...createLoadedItems(parentValue, currentCount),
        ]);
        setLoadCounts((prev) => ({
          ...prev,
          [pageKey]: currentCount + 1,
        }));
        setIsLoading(false);
      }, 600);
    };

    const handleListScroll = (event: UIEvent<HTMLDivElement>) => {
      const node = event.currentTarget;
      const distanceToBottom =
        node.scrollHeight - node.scrollTop - node.clientHeight;

      if (distanceToBottom < 16) {
        loadMore();
      }
    };

    const openPage = (item: LocationItem) => {
      setPages((prev) => [...prev, item]);
      setSearchValue('');
    };

    const selectItem = (item: LocationItem) => {
      setValue({
        label: item.label,
        path: [...pages, item],
        value: item.value,
      });
      setPages([]);
      setSearchValue('');
    };

    return (
      <Cascader
        {...args}
        pageKey={currentPage?.value}
        searchValue={searchValue}
        canGoBack={pages.length > 0}
        onBack={() => {
          setPages((prev) => prev.slice(0, -1));
        }}
        onSearchValueChange={setSearchValue}
      >
        <CascaderTrigger
          clearable={value !== null}
          onClear={() => {
            setValue(null);
            setPages([]);
            setSearchValue('');
          }}
        >
          <CascaderValue placeholder="Select item">
            {value?.label}
          </CascaderValue>
        </CascaderTrigger>
        <CascaderContent>
          <CascaderBackItem>{currentPage?.label}</CascaderBackItem>
          <CascaderSearch placeholder="Search items" />
          <CascaderList height={180} onScroll={handleListScroll}>
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
                  {item.hasChildren ? (
                    <CascaderItemIndicator />
                  ) : null}
                </CascaderItem>
              ))}
              {isLoading ? (
                <CascaderLoading>Loading more</CascaderLoading>
              ) : null}
              {canLoadMore && !isLoading ? (
                <CascaderItem
                  closeOnSelect={false}
                  value={`${pageKey}-load-more`}
                  className="justify-center text-primary-500"
                  onSelect={loadMore}
                >
                  Load more
                </CascaderItem>
              ) : null}
            </CascaderGroup>
          </CascaderList>
        </CascaderContent>
      </Cascader>
    );
  },
};
