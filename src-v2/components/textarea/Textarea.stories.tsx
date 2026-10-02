import { type Meta, type StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

type Story = StoryObj<typeof Textarea>;

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    placeholder: '請輸入內容',
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
