import { type Meta, type StoryObj } from '@storybook/react';
import { Input } from './Input';

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  title: 'Components/Input/Input',
  component: Input,
  args: {
    placeholder: '請輸入文字',
    style: { width: '450px' },
  },
};
export default meta;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '停用狀態',
  },
};

export const Error: Story = {
  args: {
    'aria-invalid': true,
    placeholder: '錯誤狀態',
  },
};

export const Ghost: Story = {
  args: {
    appearance: 'ghost',
    placeholder: '無邊框（hover/focus 才顯示）',
  },
};
