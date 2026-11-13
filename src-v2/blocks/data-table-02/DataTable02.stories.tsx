import { type Meta, type StoryObj } from '@storybook/react';
import { DataTable } from './components/data-table';

const meta: Meta<typeof DataTable> = {
  title: 'Blocks/DataTable/02 - ESG Emission Tree',
  component: DataTable,
  parameters: { layout: 'fullscreen' },
  args: { columnResizeMode: 'onChange' },
  argTypes: {
    columnResizeMode: {
      control: 'inline-radio',
      options: ['onChange', 'onEnd'],
    },
  },
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
  render: (args) => <DataTable {...args} />,
};
