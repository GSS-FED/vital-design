import { useArgs } from '@storybook/preview-api';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Switch, type SwitchProps } from './Switch';

type Story = StoryObj<typeof Switch>;

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    onChange: fn(),
    disabled: false,
    checked: false,
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<SwitchProps>();
    const onChange = (isChecked: boolean) => {
      updateArgs({ checked: isChecked });
    };

    return <Switch {...args} onChange={onChange} checked={checked} />;
  },
};
