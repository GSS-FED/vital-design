import { SplitButton } from '@/components/button/split-button/SplitButton';
import { SearchIcon } from '@/icons';
import { type Meta, type StoryObj } from '@storybook/react';

type Story = StoryObj<typeof SplitButton>;

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  args: {
    size: 'lg',
    theme: 'primary',
    children: 'Button',
  },
  argTypes: {
    theme: {
      control: 'select',
      options: [
        'primary',
        'default',
        'success',
        'info',
        'warning',
        'alarm',
        'dangerous',
      ],
    },
    size: {
      control: 'inline-radio',
      options: ['md', 'lg'],
    },
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

export const Themes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton open={false} theme="primary">
        Primary
      </SplitButton>
      <SplitButton open={false} theme="default">
        Default
      </SplitButton>
      <SplitButton open={false} theme="success">
        Success
      </SplitButton>
      <SplitButton open={false} theme="info">
        Info
      </SplitButton>
      <SplitButton open={false} theme="warning">
        Warning
      </SplitButton>
      <SplitButton open={false} theme="alarm">
        Alarm
      </SplitButton>
      <SplitButton open={false} theme="dangerous">
        Dangerous
      </SplitButton>
    </div>
  ),
};
