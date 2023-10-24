import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import RadioGroup from './radio-group';

type Story = StoryObj<typeof RadioGroup>;

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};
export default meta;

export const Horizontal: Story = {
  render() {
    function App() {
      const [value, setValue] = useState('');
      return (
        <RadioGroup
          options={[
            { label: '選項一', value: 'unique-value-a' },
            { label: '選項二', value: 'unique-value-b' },
            { label: '選項三', value: 'unique-value-c' },
          ]}
          value={value}
          onChange={setValue}
        />
      );
    }
    return <App />;
  },
};

export const Vertical: Story = {
  render() {
    function App() {
      const [value, setValue] = useState('');
      return (
        <RadioGroup
          direction="vertical"
          options={[
            {
              label: '選項一',
              value: 'unique-value-a',
            },
            {
              label: '選項二',
              value: 'unique-value-b',
            },
            {
              label: `${'很長'.repeat(50)}的選項`,
              value: 'unique-value-c',
            },
          ]}
          value={value}
          onChange={setValue}
        />
      );
    }
    return <App />;
  },
};

export const Unchecked: Story = {
  render() {
    function App() {
      const [value, setValue] = useState('');
      return (
        <RadioGroup
          options={[{ label: '選項', value: 'unique-value' }]}
          value={value}
          onChange={setValue}
        />
      );
    }
    return <App />;
  },
};

export const Checked: Story = {
  render() {
    function App() {
      const [value, setValue] = useState('unique-value');
      return (
        <RadioGroup
          options={[{ label: '選項', value: 'unique-value' }]}
          value={value}
          onChange={setValue}
        />
      );
    }
    return <App />;
  },
};

export const UncheckedAndDisabled: Story = {
  name: 'Unchecked & Disabled',
  render() {
    function App() {
      const [value, setValue] = useState('');
      return (
        <RadioGroup
          options={[
            { label: '選項', value: 'unique-value', disabled: true },
          ]}
          value={value}
          onChange={setValue}
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
      const [value, setValue] = useState('unique-value');
      return (
        <RadioGroup
          options={[
            { label: '選項', value: 'unique-value', disabled: true },
          ]}
          value={value}
          onChange={setValue}
        />
      );
    }
    return <App />;
  },
};
