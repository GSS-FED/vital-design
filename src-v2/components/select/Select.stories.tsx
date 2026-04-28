import { BellIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemCheck,
  SelectItemCheckbox,
  SelectItemText,
  SelectLabel,
  SelectTrigger,
} from './Select';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

type Story = StoryObj<typeof Select>;

function isSingleValue(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

function isMultipleValue(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === 'string')
  );
}

const ITEM_LIST = [
  { label: '選項 1', value: '1' },
  { label: '選項 2', value: '2' },
  { label: '選項 3', value: '3' },
  { label: '選項 4', value: '4' },
  { label: '選項 5', value: '5' },
  { label: '選項 6', value: '6' },
  { label: '選項 7', value: '7' },
  { label: '選項 8', value: '8' },
  { label: '選項 9', value: '9' },
  { label: '選項 10', value: '10' },
  { label: '選項 11', value: '11' },
  { label: '選項 12', value: '12' },
  { label: '選項 13', value: '13' },
  { label: '選項 14', value: '14' },
  { label: '選項 15', value: '15' },
];

const FRUIT_LIST = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

const CATEGORY_FRUIT_LIST = [
  { label: 'apple', value: 'apple' },
  { label: 'banana', value: 'banana' },
  { label: 'cherry', value: 'cherry' },
  { label: 'blueberry', value: 'blueberry' },
  { label: 'guava', value: 'guava' },
];

const COLOR_LIST = [
  { label: 'pink', value: 'pink' },
  { label: 'red', value: 'red' },
  { label: 'orange', value: 'orange' },
  { label: 'yellow', value: 'yellow' },
  { label: 'green', value: 'green' },
  { label: 'blue', value: 'blue' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: {
    disabled: false,
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div className="w-80">
        <Select
          disabled={args.disabled}
          items={ITEM_LIST}
          value={value}
          onValueChange={(nextValue) => {
            if (isSingleValue(nextValue)) {
              setValue(nextValue);
            }
          }}
        >
          <SelectTrigger placeholder="請選擇" />
          <SelectContent>
            {ITEM_LIST.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemCheck />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const Multiple: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div className="w-60">
        <Select
          disabled={args.disabled}
          multiple
          items={FRUIT_LIST}
          value={value}
          onValueChange={(nextValue) => {
            if (isMultipleValue(nextValue)) {
              setValue(nextValue);
            }
          }}
        >
          <SelectTrigger placeholder="Select options" />
          <SelectContent>
            {FRUIT_LIST.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <SelectItemCheckbox />
                <SelectItemText>{item.label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const Icon: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Container>
        <div className="w-80">
          <p>Prefix Icon</p>
          <Select
            disabled={args.disabled}
            items={ITEM_LIST}
            value={value}
            onValueChange={(nextValue) => {
              if (isSingleValue(nextValue)) {
                setValue(nextValue);
              }
            }}
          >
            <SelectTrigger placeholder="請選擇" />
            <SelectContent>
              {ITEM_LIST.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <span className="grid shrink-0 place-content-center">
                    <BellIcon />
                  </span>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemCheck />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-80">
          <p>Suffix Icon</p>
          <Select
            disabled={args.disabled}
            items={ITEM_LIST}
            value={value}
            onValueChange={(nextValue) => {
              if (isSingleValue(nextValue)) {
                setValue(nextValue);
              }
            }}
          >
            <SelectTrigger placeholder="請選擇" />
            <SelectContent>
              {ITEM_LIST.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <span className="ms-auto grid shrink-0 place-content-center">
                    <ExternalLinkIcon />
                  </span>
                  <SelectItemCheck />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Container>
    );
  },
};

export const Grouped: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | null>(null);
    const items = [...CATEGORY_FRUIT_LIST, ...COLOR_LIST];

    return (
      <div className="w-80">
        <Select
          disabled={args.disabled}
          items={items}
          value={value}
          onValueChange={(nextValue) => {
            if (isSingleValue(nextValue)) {
              setValue(nextValue);
            }
          }}
        >
          <SelectTrigger placeholder="請選擇" />
          <SelectContent>
            <SelectGroup>
              <SelectLabel>水果</SelectLabel>
              {CATEGORY_FRUIT_LIST.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemCheck />
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>顏色</SelectLabel>
              {COLOR_LIST.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemCheck />
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
};
