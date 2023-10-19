import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Switch from './switch';

type Story = StoryObj<typeof Switch>;

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
};
export default meta;

export const Unchecked: Story = {
  render() {
    function App() {
      const [isChecked, setIsChecked] = useState(false);
      return <Switch checked={isChecked} onChange={setIsChecked} />;
    }
    return <App />;
  },
};

export const Checked: Story = {
  render() {
    function App() {
      const [isChecked, setIsChecked] = useState(true);
      return <Switch checked={isChecked} onChange={setIsChecked} />;
    }
    return <App />;
  },
};

export const UncheckedAndDisabled: Story = {
  name: 'Unchecked & Disabled',
  render() {
    function App() {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <Switch
          disabled
          checked={isChecked}
          onChange={setIsChecked}
        />
      );
    }
    return <App />;
  },
};

export const CheckedAndDisabled: Story = {
  name: 'Checked & Disabled',
  render() {
    function App() {
      const [isChecked, setIsChecked] = useState(true);
      return (
        <Switch
          disabled
          checked={isChecked}
          onChange={setIsChecked}
        />
      );
    }
    return <App />;
  },
};
