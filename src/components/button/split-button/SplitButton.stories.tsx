import { Meta, StoryObj } from '@storybook/react';
import SplitButton from 'src/components/button/split-button/SplitButton';
import { SearchIcon } from 'src/icons';

type Story = StoryObj<typeof SplitButton>;

const iconOptions = {
  null: null,
  search: <SearchIcon />,
};

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  argTypes: {
    icon: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: { type: 'select' },
    },
  },
  args: {
    size: 'large',
    theme: 'primary',
    children: 'Button',
  },
};

export default meta;

export const Default: Story = {};
