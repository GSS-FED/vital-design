import SplitButton from '@/components/button/split-button/SplitButton';
import { SearchIcon } from '@/icons';
import { type Meta, type StoryObj } from '@storybook/react';

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

export const FocusableWhenDisabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <SplitButton
      open={false}
      disabled
      focusableWhenDisabled
      theme="primary"
    >
      Tab to me
    </SplitButton>
  ),
};
