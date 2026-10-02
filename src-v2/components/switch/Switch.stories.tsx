import { useArgs } from '@storybook/preview-api';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Switch, type SwitchProps } from './Switch';

type Story = StoryObj<typeof Switch>;

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    onCheckedChange: fn(),
    disabled: false,
    checked: false,
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<SwitchProps>();
    const onCheckedChange: NonNullable<
      SwitchProps['onCheckedChange']
    > = (isChecked, eventDetails) => {
      updateArgs({ checked: isChecked });
      args.onCheckedChange?.(isChecked, eventDetails);
    };

    return (
      <Switch
        {...args}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
};
