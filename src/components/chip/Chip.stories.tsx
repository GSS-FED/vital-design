import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FlagIcon } from 'src/icons';
import { UserIcon } from 'src/icons';
import Chip, { ChipProps } from './Chip';

type Story = StoryObj<typeof Chip>;

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    icon: {
      options: ['none', 'user', 'flag'],
      mapping: {
        none: '',
        user: <UserIcon width={12} />,
        flag: <FlagIcon width={12} height={12} />,
      },
      control: { type: 'select' },
    },
  },
  args: {
    selected: true,
    onChange: fn(),
    children: '急件',
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ selected }, updateArgs] = useArgs<ChipProps>();
    const onChange = (isSelected: boolean) => {
      updateArgs({ selected: isSelected });
    };

    return <Chip {...args} onChange={onChange} selected={selected} />;
  },
};

export const Icon: Story = {
  args: { icon: <FlagIcon width={12} height={12} /> },
};
