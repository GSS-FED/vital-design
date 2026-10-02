import { type Meta, type StoryObj } from '@storybook/react';
import { DataTableGroup04 } from './DataTableGroup04';

const meta: Meta<typeof DataTableGroup04> = {
  title: 'Blocks/DataTable/Editable',
  component: DataTableGroup04,
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

type Story = StoryObj<typeof DataTableGroup04>;

export const Default: Story = {
  name: 'V4 — Inline + popover edit',
  render: () => <DataTableGroup04 />,
};
