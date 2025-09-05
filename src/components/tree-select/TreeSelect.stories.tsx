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
import TreeSelect, { TreeSelectData } from './TreeSelect';

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
