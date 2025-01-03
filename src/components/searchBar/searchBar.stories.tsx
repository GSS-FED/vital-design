import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SearchBar from './searchBar';

type Story = StoryObj<typeof SearchBar>;

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  argTypes: {
    disabled: {
      control: 'boolean',
      options: [true, false],
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    placeholder: '請輸入關鍵字',
    onSearch: fn(),
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    return <SearchBar {...args} />;
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
