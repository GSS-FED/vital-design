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
        'User Icon': <UserIcon className="size-3.5" />,
      },
    },
  },
  args: {
    className: 'w-[450px]',
    prefix: <UserIcon className="size-3.5" />,
    placeholder: '請輸入使用者名稱',
  },
};
