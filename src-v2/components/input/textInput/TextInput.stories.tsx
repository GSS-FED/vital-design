import { UserIcon } from '@/icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import TextInput from './TextInput';

type Story = StoryObj<typeof TextInput>;

const meta: Meta<typeof TextInput> = {
  title: 'Components/Input/TextInput',
  component: TextInput,
  argTypes: {
    prefix: {
      options: ['user'],
      mapping: {
        user: <UserIcon width={14} />,
      },
    },
  },
  args: {
    width: '450px',
    prefix: <UserIcon width={14} />,
    placeholder: '請輸入使用者名稱',
    onChange: fn(),
    onEnter: fn(),
  },
};
export default meta;

export const Default: Story = {};
