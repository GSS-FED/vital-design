import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'src/hooks/useDebounceValue';
import ActionInfiniteList from './ActionInfiniteList';
import { searchData } from './ActionInfiniteList.data';
import { useFetchData } from './useFetchData';

type Story = StoryObj<typeof ActionInfiniteList>;
const meta: Meta<typeof ActionInfiniteList> = {
  title: 'Components/List/ActionInfiniteList',
  component: ActionInfiniteList,
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
    onSelect: fn(),
  },
};
export default meta;
export const Default: Story = {
  render: function Render(args) {
    const {
      isLoading,
      isNextPageLoading,
      filterData,
      loadNextPage,
      setFilterData,
      currentState,
    } = useFetchData(10);

    const { items: currentItems, totalCount: currentTotalCount } =
      currentState;

    const [searchValue, setSearchValue] = useState('');
    const debounceValue = useDebounceValue(searchValue, 300);
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!debounceValue) {
            setFilterData({
              items: currentItems,
              totalCount: currentTotalCount,
            });
            return;
          }

          const result = await searchData(debounceValue);
          setFilterData({ items: result, totalCount: result.length });
        } catch (error) {
          console.log(error);
        }
      };

      void fetchData();
    }, [
      currentItems,
      currentTotalCount,
      debounceValue,
      setFilterData,
    ]);

    return (
      <ActionInfiniteList
        {...args}
        hasNextPage={filterData.items.length < filterData.totalCount}
        items={filterData.items}
        loadNextPage={isNextPageLoading ? () => {} : loadNextPage}
        onSearchTermChange={(value) => {
          setSearchValue(value);
        }}
        isLoading={isLoading}
      />
    );
  },
};
