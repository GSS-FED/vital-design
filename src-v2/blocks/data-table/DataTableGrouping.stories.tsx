import { type Meta, type StoryObj } from '@storybook/react';
import { DataTableGroupingCardsBlock } from './DataTableGroupingCardsBlock';
import { DataTableGroupingCardsBodyScrollGutterBlock } from './DataTableGroupingCardsBodyScrollGutterBlock';
import { DataTableGroupingCardsJsStickyBlock } from './DataTableGroupingCardsJsStickyBlock';
import { DataTableGroupingCardsLocalScrollBlock } from './DataTableGroupingCardsLocalScrollBlock';
import { DataTableGroupingFlatBlock } from './DataTableGroupingFlatBlock';
import { DataTableGroupingNestedBlock } from './DataTableGroupingNestedBlock';

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
  render: () => <DataTableGroupingFlatBlock />,
};

export const NestedSections: Story = {
  name: 'V2 — Nested 2-level sections',
  render: () => <DataTableGroupingNestedBlock />,
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
