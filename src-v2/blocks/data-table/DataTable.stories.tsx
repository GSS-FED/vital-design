import { type Meta, type StoryObj } from '@storybook/react';
import { ReviewTaskTable } from './components/review-task-table';

const meta: Meta<typeof ReviewTaskTable> = {
  title: 'Blocks/DataTable',
  component: ReviewTaskTable,
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

type Story = StoryObj<typeof ReviewTaskTable>;

export const Default: Story = {};

export const OneLevel: Story = {
  name: '一層分群',
  args: { grouping: ['project'] },
};

export const TwoLevels: Story = {
  name: '兩層分群',
  args: { grouping: ['project', 'status'] },
};
