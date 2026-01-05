import {
  FloatingPortal,
  autoPlacement,
  autoUpdate,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { testData, treeSelectValueData } from './TestData';
import TreeSelect, {
  TreeSelectData,
  TreeSelectRoot,
} from './TreeSelect';

type Story = StoryObj<typeof TreeSelect>;

const meta: Meta<typeof TreeSelect> = {
  title: 'Components/TreeSelect',
  component: TreeSelect,
  tags: ['autodocs'],
};
export default meta;

export const Default: Story = {
  render: (args) => {
    function App() {
      const [value, setValue] = useState<TreeSelectData<unknown>[]>(
        [],
      );
      return (
        <TreeSelect
          {...args}
          data={testData}
          value={value}
          onChange={setValue}
          globalSearchLabel=""
        />
      );
    }
    return (
      <Theme data-is-root-theme={false}>
        <App />
      </Theme>
    );
  },
};

export const WithDefaultValue: Story = {
  render: (args) => {
    function App() {
      const [value, setValue] = useState<TreeSelectData<unknown>[]>([
        ...treeSelectValueData,
      ]);
      return (
        <TreeSelect
          {...args}
          data={testData}
          value={value}
          onChange={setValue}
          globalSearchLabel=""
        />
      );
    }
    return (
      <Theme data-is-root-theme={false}>
        <App />
      </Theme>
    );
  },
};

export const WithTrigger: Story = {
  render: (args) => {
    function App() {
      const [value, setValue] = useState<TreeSelectData<unknown>[]>([
        ...treeSelectValueData,
      ]);
      const [open, setOpen] = useState(false);
      const {
        refs,
        floatingStyles,
        context: floatingContext,
      } = useFloating({
        open,
        onOpenChange: setOpen,
        whileElementsMounted: autoUpdate,
        middleware: [
          offset(4),
          autoPlacement({
            allowedPlacements: ['bottom-start', 'top-start'],
          }),
          size({
            apply({ rects, elements }) {
              Object.assign(elements.floating.style, {
                width: `${rects.reference.width}px`,
              });
            },
          }),
        ],
      });
      const click = useClick(floatingContext);
      const dismiss = useDismiss(floatingContext);
      const { getReferenceProps, getFloatingProps } = useInteractions(
        [click, dismiss],
      );

      const triggerText = value[value.length - 1]?.displayName || '';

      return (
        <TriggerContainer>
          <Trigger ref={refs.setReference} {...getReferenceProps()}>
            {triggerText}
          </Trigger>
          {open && (
            <FloatingPortal>
              <div
                ref={refs.setFloating}
                style={{ ...floatingStyles }}
                {...getFloatingProps()}
              >
                <TreeSelect
                  {...args}
                  data={testData}
                  value={value}
                  onChange={(value) => {
                    setOpen(false);
                    setValue(value);
                  }}
                  globalSearchLabel=""
                />
              </div>
            </FloatingPortal>
          )}
        </TriggerContainer>
      );
    }
    return (
      <Theme data-is-root-theme={false}>
        <App />
      </Theme>
    );
  },
};

export const LoadMore: Story = {
  render: (args) => {
    function App() {
      const [value, setValue] = useState<TreeSelectData<unknown>[]>(
        [],
      );
      const [items, setItems] =
        useState<TreeSelectRoot<unknown>[]>(testData);
      const [isLoading, setIsLoading] = useState(false);
      const [loadCounts, setLoadCounts] = useState<
        Record<string, number>
      >({});

      const handleLoadMore = (node?: TreeSelectData<unknown>) => {
        const nodeId = node ? node.id : 'root';
        const currentCount = loadCounts[nodeId] || 0;

        if (isLoading || currentCount >= 3) return;

        setIsLoading(true);
        setTimeout(() => {
          if (node) {
            // Load more for sub-menu
            setItems((prev) => {
              const updateData = (
                items: TreeSelectRoot<unknown>[],
              ): TreeSelectRoot<unknown>[] => {
                return items.map((item) => ({
                  ...item,
                  data: updateNodeData(item.data),
                }));
              };

              const updateNodeData = (
                nodes: TreeSelectData<unknown>[],
              ): TreeSelectData<unknown>[] => {
                return nodes.map((n) => {
                  if (n.id === node.id) {
                    const currentChildren = n.children || [];
                    const newChildren = Array.from({ length: 5 }).map(
                      (_, index) => ({
                        displayName: `New Sub Item ${currentChildren.length + index}`,
                        id: `new-sub-item-${n.id}-${currentChildren.length + index}`,
                        data: { subjectType: 1 },
                      }),
                    );
                    return {
                      ...n,
                      children: [...currentChildren, ...newChildren],
                    };
                  }
                  if (n.children) {
                    return {
                      ...n,
                      children: updateNodeData(n.children),
                    };
                  }
                  return n;
                });
              };

              return updateData(prev);
            });
          } else {
            // Load more for root menu
            const newItems = [
              {
                label: 'New Loaded Data',
                data: Array.from({ length: 5 }).map((_, index) => ({
                  displayName: `New Item ${items.length + index}`,
                  id: `new-item-${items.length + index}`,
                  data: { subjectType: 1 },
                })),
              },
            ];
            setItems((prev) => [...prev, ...newItems]);
          }
          setLoadCounts((prev) => ({
            ...prev,
            [nodeId]: (prev[nodeId] || 0) + 1,
          }));
          setIsLoading(false);
        }, 1000);
      };

      const hasMore = (node?: TreeSelectData<unknown>) => {
        const nodeId = node ? node.id : 'root';
        const currentCount = loadCounts[nodeId] || 0;
        return currentCount < 3;
      };

      return (
        <TreeSelect
          {...args}
          data={items}
          value={value}
          onChange={setValue}
          globalSearchLabel=""
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoading}
          hasMore={hasMore}
        />
      );
    }
    return (
      <Theme data-is-root-theme={false}>
        <App />
      </Theme>
    );
  },
};

const TriggerContainer = styled.div`
  padding-bottom: 300px;
`;
const Trigger = styled.div`
  padding: 8px;
  border: 1px solid rgba(35, 35, 50, 0.3);
  width: 194px;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
`;
