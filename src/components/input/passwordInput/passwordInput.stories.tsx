import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import UserIcon from '../../../icons/user-icon';
import PasswordInput from './passwordInput';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Input/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],

  //TODO: 不知道為什麼這邊的 argTypes 不會自動產，所以先手動加
  argTypes: {
    width: {
      table: {
        defaultValue: { summary: `100%` },
      },
    },
    prefix: {},
    value: {
      type: { name: 'string', required: true },
    },
    initiallyVisible: {
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: false },
      },
    },
    onChange: {
      type: { name: 'function', required: true },
    },
  },
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Basic: Story = {
  render() {
    function App() {
      const [value, setValue] = useState('');

      return (
        <PasswordInput
          placeholder="請輸入密碼"
          value={value}
          onChange={setValue}
        />
      );
    }
    return <App />;
  },
};

export const Prefix: Story = {
  render() {
    function App() {
      const [value, setValue] = useState('');

      return (
        <PasswordInput
          placeholder="請輸入密碼"
          prefix={<UserIcon />}
          value={value}
          onChange={setValue}
        />
      );
    }
    return <App />;
  },
};

export const Disabled: Story = {
  render() {
    function App() {
      const [value, setValue] = useState('');

      return (
        <PasswordInput
          placeholder="請輸入密碼"
          value={value}
          onChange={setValue}
          disabled={true}
        />
      );
    }
    return <App />;
  },
};
