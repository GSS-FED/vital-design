import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { UserIcon } from 'src/icons';
import PasswordInput from './PasswordInput';

type Story = StoryObj<typeof PasswordInput>;

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Input/PasswordInput',
  component: PasswordInput,
};
export default meta;

export const Default: Story = {
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
    value: '',
    onChange: fn(),
  },
};
