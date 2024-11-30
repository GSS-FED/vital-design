import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import UserIcon from '../../../icons/user-icon';
import TextInput from './textInput';

type Story = StoryObj<typeof TextInput>;

const meta: Meta<typeof TextInput> = {
  title: 'Components/Input/TextInput',
  component: TextInput,
  argTypes: {
    prefix: {
      options: ['User Icon'],
      mapping: {
        Bold: <UserIcon />,
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
