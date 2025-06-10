import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { UserIcon } from 'src/icons';
import TextInput from './TextInput';

type Story = StoryObj<typeof TextInput>;

const meta: Meta<typeof TextInput> = {
  title: 'Components/Input/TextInput',
  component: TextInput,
  argTypes: {
    prefix: {
      options: ['user'],
      mapping: {
        user: <UserIcon />,
      },
    },
  },
  args: {
    width: '450px',
    prefix: <UserIcon />,
    placeholder: '請輸入使用者名稱',
    onChange: fn(),
    onEnter: fn(),
  },
};
export default meta;

export const Default: Story = {};
