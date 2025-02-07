import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Checkbox, { CheckboxProps } from './Checkbox';

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      options: [true, false, 'indeterminate'],
      control: { type: 'select' },
    },
  },
  args: {
    checked: false,
    onChange: fn(),
    children: 'Option A',
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<CheckboxProps>();
    const onChange = (isChecked: boolean) => {
      updateArgs({ checked: isChecked });
    };
    return (
      <Checkbox {...args} onChange={onChange} checked={checked} />
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Indeterminate: Story = {
  args: { checked: 'indeterminate' },
};
