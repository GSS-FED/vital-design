import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import TextAreaInput from './TextareaInput';

type Story = StoryObj<typeof TextAreaInput>;

const meta: Meta<typeof TextAreaInput> = {
  title: 'Components/Input/TextAreaInput',
  component: TextAreaInput,
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
