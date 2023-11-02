import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Checkbox, { CheckboxProps } from './checkbox';

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};
export default meta;

export const Unchecked: Story = {
  render() {
    function App() {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <Checkbox checked={isChecked} onChange={setIsChecked}>
          選項
        </Checkbox>
      );
    }
    return <App />;
  },
};

export const Checked: Story = {
  render() {
    function App() {
      const [isChecked, setIsChecked] = useState(true);
      return (
        <Checkbox checked={isChecked} onChange={setIsChecked}>
          選項
        </Checkbox>
      );
    }
    return <App />;
  },
};

export const Indeterminate: Story = {
  render() {
    function App() {
      const [isChecked, setIsChecked] =
        useState<CheckboxProps['checked']>('indeterminate');
      return (
        <Checkbox checked={isChecked} onChange={setIsChecked}>
          選項
        </Checkbox>
      );
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
        <Checkbox
          disabled
          checked={isChecked}
          onChange={setIsChecked}
        >
          選項
        </Checkbox>
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
        <Checkbox
          disabled
          checked={isChecked}
          onChange={setIsChecked}
        >
          選項
        </Checkbox>
      );
    }
    return <App />;
  },
};

export const IndeterminateAndDisabled: Story = {
  name: 'Indeterminate & Disabled',
  render() {
    function App() {
      const [isChecked, setIsChecked] =
        useState<CheckboxProps['checked']>('indeterminate');
      return (
        <Checkbox
          disabled
          checked={isChecked}
          onChange={setIsChecked}
        >
          選項
        </Checkbox>
      );
    }
    return <App />;
  },
};

export const Required: Story = {
  render() {
    function App() {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <Checkbox
          required
          checked={isChecked}
          onChange={setIsChecked}
        >
          選項
        </Checkbox>
      );
    }
    return <App />;
  },
};
