import { UserIcon } from '@/icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput';

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
        'User Icon': <UserIcon width={14} />,
      },
    },
  },
  args: {
    className: 'w-[450px]',
    prefix: <UserIcon width={14} />,
    placeholder: '請輸入使用者名稱',
  },
};
