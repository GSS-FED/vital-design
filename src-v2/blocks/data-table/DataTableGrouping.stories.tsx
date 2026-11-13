import { type Meta, type StoryObj } from '@storybook/react';
import type { ColumnResizeMode } from '@tanstack/react-table';
import { DataTableGroupingCardsBlock } from './DataTableGroupingCardsBlock';
import { DataTableGroupingCardsBodyScrollGutterBlock } from './DataTableGroupingCardsBodyScrollGutterBlock';
import { DataTableGroupingCardsJsStickyBlock } from './DataTableGroupingCardsJsStickyBlock';
import { DataTableGroupingCardsLocalScrollBlock } from './DataTableGroupingCardsLocalScrollBlock';
import { DataTableGroupingResizableBlock } from './DataTableGroupingResizableBlock';

const meta: Meta = {
  title: 'Blocks/DataTable/Experiments/Grouping',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj;

/**
 * `onChange` moves the columns under the pointer; `onEnd` holds them and
 * commits on release, with the guide line showing where the edge lands. `onEnd`
 * does no layout work while dragging, which matters on the wide pinned tables.
 */
type ResizeModeStory = StoryObj<{
  columnResizeMode: ColumnResizeMode;
}>;

const resizeModeControl = {
  args: { columnResizeMode: 'onChange' as ColumnResizeMode },
  argTypes: {
    columnResizeMode: {
      control: 'inline-radio' as const,
      options: ['onChange', 'onEnd'],
    },
  },
};

export const CardPerGroup: Story = {
  name: 'V3 — One Card per group',
  render: () => <DataTableGroupingCardsBlock />,
};

export const CardPerGroupLocalScroll: Story = {
  name: 'V3 Experiment — Local x-scroll',
  render: () => <DataTableGroupingCardsLocalScrollBlock />,
};

export const CardPerGroupBodyScrollGutter: Story = {
  name: 'V3 Experiment — Body scroll gutter',
  render: () => <DataTableGroupingCardsBodyScrollGutterBlock />,
};

export const CardPerGroupResizable: ResizeModeStory = {
  name: 'V3 — One Card per group, shared column widths',
  ...resizeModeControl,
  render: ({ columnResizeMode }) => (
    <DataTableGroupingResizableBlock
      columnResizeMode={columnResizeMode}
    />
  ),
};

export const CardPerGroupJsSticky: Story = {
  name: 'V3 Experiment — JS sticky headers',
  render: () => <DataTableGroupingCardsJsStickyBlock />,
};
