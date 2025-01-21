import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ActionList, { ActionListProps } from './ActionList';
import { list } from './ActionList.data';

type Story = StoryObj<typeof ActionList>;
const meta: Meta<typeof ActionList> = {
  title: 'Components/List/ActionList',
  component: ActionList,
  argTypes: {
    hasSearchBar: {
      control: 'boolean',
      options: [true, false],
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    width: '400px',
    placeholder: '請輸入關鍵字',
    listHeight: 300,
    noMatchingResultsText: '查無資料',
    selectedItem: '',
    onSearchTermChange: fn(),
    onSearch: fn(),
    onSelect: fn(),
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ selectedItem }, updateArgs] = useArgs<ActionListProps>();
    const handleSelect = (value: string | number) => {
      updateArgs({ selectedItem: value });
    };

    return (
      <ActionList
        {...args}
        items={list}
        onSelect={handleSelect}
        selectedItem={selectedItem}
      />
    );
  },
};
