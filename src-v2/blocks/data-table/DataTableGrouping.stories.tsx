import { type Meta, type StoryObj } from '@storybook/react';
import { DataTableGroupingCardsBlock } from './DataTableGroupingCardsBlock';
import { DataTableGroupingCardsBodyScrollGutterBlock } from './DataTableGroupingCardsBodyScrollGutterBlock';
import { DataTableGroupingCardsJsStickyBlock } from './DataTableGroupingCardsJsStickyBlock';
import { DataTableGroupingCardsLocalScrollBlock } from './DataTableGroupingCardsLocalScrollBlock';
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

export const FlatSections: Story = {
  name: 'V1 — Flat sections (one table)',
  render: () => <DataTableGroup01 />,
};

export const NestedSections: Story = {
  name: 'V2 — Nested 2-level sections',
  render: () => <DataTableGroup02 />,
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

export const CardPerGroupJsSticky: Story = {
  name: 'V3 Experiment — JS sticky headers',
  render: () => <DataTableGroupingCardsJsStickyBlock />,
};
