import { type Meta, type StoryObj } from '@storybook/react';
import { DataTable } from './components/data-table';

const meta: Meta<typeof DataTable> = {
  title: 'Blocks/DataTable/03 - Editable Cells',
  component: DataTable,
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

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => <DataTable />,
};
