import { cn } from '@/utils/cn';
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ComponentType, HTMLAttributes } from 'react';
import {
  FixedSizeList,
  type ListChildComponentProps,
} from 'react-window';
import Command from './Command';

type FlatCommandItem = {
  id: string;
  label: string;
};

type VirtualizedItemData = {
  items: FlatCommandItem[];
  selectedId: string;
  onSelect: (item: FlatCommandItem) => void;
};

const ACTION_LIST_ITEMS: FlatCommandItem[] = Array.from({
  length: 50,
}).map((_, index) => ({
  id: `option-${index + 1}`,
  label: `option ${index + 1}`,
}));

const LOAD_MORE_ITEMS: FlatCommandItem[] = Array.from({
  length: 36,
}).map((_, index) => ({
  id: `loaded-${index + 1}`,
  label: `項目 ${index + 1}`,
}));

const VIRTUALIZED_ITEMS: FlatCommandItem[] = Array.from({
  length: 1000,
}).map((_, index) => ({
  id: `virtual-${index + 1}`,
  label: `Virtual item ${index + 1}`,
}));

function LoadMoreSentinel({
  disabled,
  onVisible,
}: {
  disabled: boolean;
  onVisible: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node || disabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onVisible();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [disabled, onVisible]);

  return (
    <div
      ref={ref}
      className="h-px w-full flex-shrink-0"
      style={{ overflowAnchor: 'none' }}
    />
  );
}

const VirtualizedOuterElement = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function VirtualizedOuterElement(props, ref) {
  return <Command.List ref={ref} className="py-2" {...props} />;
});

function VirtualizedRow({
  index,
  style,
  data,
}: ListChildComponentProps<VirtualizedItemData>) {
  const item = data.items[index];

  if (!item) return null;

  return (
    <div style={style}>
      <Command.Item
        value={item.label}
        className={cn(
          'px-5',
          data.selectedId === item.id && 'bg-grayscale-300',
        )}
        onSelect={() => data.onSelect(item)}
      >
        {item.label}
      </Command.Item>
    </div>
  );
}

VirtualizedOuterElement.displayName = 'VirtualizedOuterElement';

export function BasicCommandDemo({
  className,
}: {
  className?: string;
}) {
  const [search, setSearch] = useState('');

  return (
    <Command
      label="Inline command"
      className={cn('h-[300px] w-[194px]', className)}
    >
      <Command.Input
        placeholder="輸入關鍵字"
        value={search}
        onValueChange={setSearch}
      />
      <Command.List className="flex-1">
        <Command.Empty>無結果</Command.Empty>
        <Command.Group heading="建議">
          <Command.Item>Calendar</Command.Item>
          <Command.Item>Search Emoji</Command.Item>
          <Command.Item>Calculator</Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="設定">
          <Command.Item>
            <span>Profile</span>
            <Command.Shortcut>⌘P</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            <span>Billing</span>
            <Command.Shortcut>⌘B</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            <span>Settings</span>
            <Command.Shortcut>⌘S</Command.Shortcut>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  );
}

export function ActionListCommandDemo({
  className,
  withSearch = true,
}: {
  className?: string;
  withSearch?: boolean;
}) {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');

  return (
    <Command
      label="Action list preset"
      className={cn('h-[300px] w-[240px]', className)}
    >
      {withSearch ? (
        <Command.Input
          placeholder="請輸入關鍵字"
          value={search}
          onValueChange={setSearch}
          containerClassName="mx-3 mb-0 mt-3 rounded-[20px]"
        />
      ) : null}
      <Command.List className="flex-1 py-2">
        <Command.Empty>查無資料</Command.Empty>
        {ACTION_LIST_ITEMS.map((item) => (
          <Command.Item
            key={item.id}
            value={item.label}
            className={cn(
              'px-5',
              selectedId === item.id && 'text-primary-500',
            )}
            onSelect={() => setSelectedId(item.id)}
          >
            {item.label}
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  );
}

export function InfiniteScrollCommandDemo({
  className,
}: {
  className?: string;
}) {
  const pageSize = 10;
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(pageSize);
  const [isLoading, setIsLoading] = useState(false);

  const visibleItems = useMemo(
    () => LOAD_MORE_ITEMS.slice(0, count),
    [count],
  );
  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return visibleItems;

    return visibleItems.filter((item) =>
      item.label.toLowerCase().includes(keyword),
    );
  }, [search, visibleItems]);
  const hasMore =
    count < LOAD_MORE_ITEMS.length && search.length === 0;

  const loadMore = () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    window.setTimeout(() => {
      setCount((prev) =>
        Math.min(prev + pageSize, LOAD_MORE_ITEMS.length),
      );
      setIsLoading(false);
    }, 800);
  };

  return (
    <Command
      label="Infinite scroll command"
      className={cn('h-[300px] w-[194px]', className)}
    >
      <Command.Input
        placeholder="輸入關鍵字"
        value={search}
        onValueChange={setSearch}
      />
      <Command.List className="flex-1">
        <Command.Empty>無結果</Command.Empty>
        <Command.Group heading="載入更多">
          {filteredItems.map((item) => (
            <Command.Item key={item.id} value={item.label}>
              {item.label}
            </Command.Item>
          ))}
        </Command.Group>
        {isLoading ? <Command.Loading /> : null}
        {hasMore ? (
          <LoadMoreSentinel
            disabled={isLoading}
            onVisible={loadMore}
          />
        ) : null}
      </Command.List>
    </Command>
  );
}

export function VirtualizedCommandDemo({
  className,
}: {
  className?: string;
}) {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return VIRTUALIZED_ITEMS;

    return VIRTUALIZED_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(keyword),
    );
  }, [search]);

  const itemData = useMemo<VirtualizedItemData>(
    () => ({
      items: filteredItems,
      selectedId,
      onSelect: (item) => setSelectedId(item.id),
    }),
    [filteredItems, selectedId],
  );

  return (
    <Command
      shouldFilter={false}
      label="Virtualized command"
      className={cn('h-[300px] w-[240px]', className)}
    >
      <Command.Input
        placeholder="搜尋 1000 筆資料"
        value={search}
        onValueChange={setSearch}
      />
      {filteredItems.length > 0 ? (
        <FixedSizeList
          height={236}
          width="100%"
          itemCount={filteredItems.length}
          itemSize={36}
          itemData={itemData}
          outerElementType={
            VirtualizedOuterElement as ComponentType<object>
          }
        >
          {VirtualizedRow}
        </FixedSizeList>
      ) : (
        <Command.List className="flex-1">
          <Command.Empty>無結果</Command.Empty>
        </Command.List>
      )}
    </Command>
  );
}
