import { BellIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import Select, { ItemType } from './Select';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Story = StoryObj<typeof Select>;

const ITEM_LIST = [
  { label: '選項 1', id: '1' },
  { label: '選項 2', id: '2' },
  { label: '選項 3', id: '3' },
  { label: '選項 4', id: '4' },
  { label: '選項 5', id: '5' },
  { label: '選項 6', id: '6' },
  { label: '選項 7', id: '7' },
  { label: '選項 8', id: '8' },
  { label: '選項 9', id: '9' },
  { label: '選項 10', id: '10' },
  { label: '選項 11', id: '11' },
  { label: '選項 12', id: '12' },
  { label: '選項 13', id: '13' },
  { label: '選項 14', id: '14' },
  { label: '選項 15', id: '15' },
];
const FRUIT_LIST = [
  { label: 'apple', id: 'apple' },
  { label: 'banana', id: 'banana' },
  { label: 'cherry', id: 'cherry' },
  { label: 'blueberry', id: 'blueberry' },
  { label: 'guava', id: 'guava' },
];
const COLOR_LIST = [
  { label: 'pink', id: 'pink' },
  { label: 'red', id: 'red' },
  { label: 'orange', id: 'orange' },
  { label: 'yellow', id: 'yellow' },
  { label: 'green', id: 'green' },
  { label: 'blue', id: 'blue' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: {
    width: '320px',
    disabled: false,
    isError: false,
    onChange: fn(),
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<ItemType>();

    const onChange = (item: ItemType) => {
      setValue(item);
    };
    const onClear = () => {
      setValue(undefined);
    };

    return (
      <Select {...args} value={value} onChange={onChange}>
        <Select.Trigger
          placeholder="請選擇"
          clearable={!!value}
          onClear={onClear}
        />
        <Select.Content>
          <Select.Menu>
            {ITEM_LIST.map((item) => (
              <Select.Item key={item.id} item={item} />
            ))}
          </Select.Menu>
        </Select.Content>
      </Select>
    );
  },
};

export const MultiSelect: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<ItemType[]>([]);

    const onChange = (item: ItemType) => {
      setValue((prevSelectedItems) => {
        const isItemAlreadySelected = prevSelectedItems.some(
          (selectedItem) => selectedItem.id === item.id,
        );

        if (isItemAlreadySelected) {
          return prevSelectedItems.filter(
            (selectedItem) => selectedItem.id !== item.id,
          );
        }
        return [...prevSelectedItems, item];
      });
    };

    return (
      <Select
        {...args}
        value={value}
        onChange={onChange}
        isMultiple={true}
      >
        <Select.Trigger placeholder="請選擇" maxDisplayCount={3} />
        <Select.Content>
          <Select.Menu>
            {ITEM_LIST.map((item) => (
              <Select.Item
                key={item.id}
                item={item}
                hasCheckbox={true}
              />
            ))}
          </Select.Menu>
        </Select.Content>
      </Select>
    );
  },
};

export const Search: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<ItemType[]>([]);
    const [keyword, setKeyword] = useState('');
    const filteredItemList = useMemo(
      () =>
        ITEM_LIST.filter((item) =>
          item.label.toLowerCase().includes(keyword.toLowerCase()),
        ),
      [keyword],
    );

    const onChange = (item: ItemType) => {
      setValue((prevSelectedItems) => {
        const isItemAlreadySelected = prevSelectedItems.some(
          (selectedItem) => selectedItem.id === item.id,
        );

        if (isItemAlreadySelected) {
          return prevSelectedItems.filter(
            (selectedItem) => selectedItem.id !== item.id,
          );
        }
        return [...prevSelectedItems, item];
      });
    };

    return (
      <Select
        {...args}
        value={value}
        onChange={onChange}
        isMultiple={true}
      >
        <Select.Trigger placeholder="請選擇" maxDisplayCount={3} />
        <Select.Content>
          <Select.Header>
            <Select.SearchBar
              placeholder="請輸入關鍵字"
              onChange={(value) => setKeyword(value)}
            />
          </Select.Header>
          <Select.Menu>
            {filteredItemList.length === 0 && (
              <Select.EmptyText text="無結果" />
            )}
            {filteredItemList.map((item) => (
              <Select.Item key={item.id} item={item} />
            ))}
          </Select.Menu>
        </Select.Content>
      </Select>
    );
  },
};

export const Icon: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<ItemType>();

    const onChange = (item: ItemType) => {
      setValue(item);
    };

    return (
      <Container>
        <div>
          <p>Prefix Icon </p>
          <Select {...args} value={value} onChange={onChange}>
            <Select.Trigger placeholder="請選擇" />
            <Select.Content>
              <Select.Menu>
                {ITEM_LIST.map((item) => (
                  <Select.Item
                    key={item.id}
                    item={item}
                    prefixIcon={<BellIcon />}
                  />
                ))}
              </Select.Menu>
            </Select.Content>
          </Select>
        </div>
        <div>
          <p>Suffix Icon </p>
          <Select {...args} value={value} onChange={onChange}>
            <Select.Trigger placeholder="請選擇" />
            <Select.Content>
              <Select.Menu>
                {ITEM_LIST.map((item) => (
                  <Select.Item
                    key={item.id}
                    item={item}
                    suffixIcon={<ExternalLinkIcon />}
                  />
                ))}
              </Select.Menu>
            </Select.Content>
          </Select>
        </div>
      </Container>
    );
  },
};

export const Title: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<ItemType>();

    const onChange = (item: ItemType) => {
      setValue(item);
    };

    return (
      <Select {...args} value={value} onChange={onChange}>
        <Select.Trigger placeholder="請選擇" />
        <Select.Content>
          <Select.Menu>
            <Select.Title>水果</Select.Title>
            {FRUIT_LIST.map((item) => (
              <Select.Item key={item.id} item={item} />
            ))}
            <Select.Title>顏色</Select.Title>
            {COLOR_LIST.map((item) => (
              <Select.Item key={item.id} item={item} />
            ))}
          </Select.Menu>
        </Select.Content>
      </Select>
    );
  },
};
