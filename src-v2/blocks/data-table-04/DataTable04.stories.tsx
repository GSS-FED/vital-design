import { type Meta, type StoryObj } from '@storybook/react';
import { DataTable } from './components/data-table';

const meta: Meta<typeof DataTable> = {
  title: 'Blocks/DataTable/04 - Review Tasks',
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

export const Default: Story = {};

export const OneLevel: Story = {
  name: '一層分群',
  args: { grouping: ['project'] },
};

export const TwoLevels: Story = {
  name: '兩層分群',
  args: { grouping: ['project', 'status'] },
};
