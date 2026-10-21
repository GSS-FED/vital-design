import { type Meta, type StoryObj } from '@storybook/react';
import type { ColumnResizeMode } from '@tanstack/react-table';
import { DataTableGroupingCardsBlock } from './DataTableGroupingCardsBlock';
import { DataTableGroupingCardsBodyScrollGutterBlock } from './DataTableGroupingCardsBodyScrollGutterBlock';
import { DataTableGroupingCardsJsStickyBlock } from './DataTableGroupingCardsJsStickyBlock';
import { DataTableGroupingCardsLocalScrollBlock } from './DataTableGroupingCardsLocalScrollBlock';
import { DataTableGroupingResizableBlock } from './DataTableGroupingResizableBlock';
import { DataTableGroup01 } from './data-table-group-01/DataTableGroup01';
import { DataTableGroup02 } from './data-table-group-02/DataTableGroup02';

const meta: Meta = {
  title: 'Blocks/DataTable/Grouping',
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

export const FlatSections: ResizeModeStory = {
  name: 'V1 — Flat sections (one table)',
  ...resizeModeControl,
  render: ({ columnResizeMode }) => (
    <DataTableGroup01 columnResizeMode={columnResizeMode} />
  ),
};

export const NestedSections: ResizeModeStory = {
  name: 'V2 — Nested 2-level sections',
  ...resizeModeControl,
  render: ({ columnResizeMode }) => (
    <DataTableGroup02 columnResizeMode={columnResizeMode} />
  ),
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
