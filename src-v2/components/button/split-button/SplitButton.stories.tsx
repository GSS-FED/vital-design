import { SplitButton } from '@/components/button/split-button/SplitButton';
import { SearchIcon } from '@/icons';
import { type Meta, type StoryObj } from '@storybook/react';

type Story = StoryObj<typeof SplitButton>;

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  args: {
    size: 'large',
    theme: 'primary',
    children: 'Button',
  },
};

export default meta;

export const Default: Story = {};

export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <SplitButton open={false} theme="primary">
      <SearchIcon data-icon="inline-start" />
      Search
    </SplitButton>
  ),
};

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
