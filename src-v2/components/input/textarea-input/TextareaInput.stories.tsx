import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TextareaInput } from './TextareaInput';

type Story = StoryObj<typeof TextareaInput>;

const meta: Meta<typeof TextareaInput> = {
  title: 'Components/Input/TextareaInput',
  component: TextareaInput,
  args: {
    width: '450px',
    placeholder: '請輸入內容',
    onChange: fn(),
  },
};
export default meta;

export const Default: Story = {};

export const Resizable: Story = {
  args: {
    resizable: true,
  },
};
