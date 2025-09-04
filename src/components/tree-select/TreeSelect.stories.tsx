import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { testData, treeSelectValueData } from './TestData';
import TreeSelect from './TreeSelect';

type Story = StoryObj<typeof TreeSelect>;

const meta: Meta<typeof TreeSelect> = {
  title: 'Components/TreeSelect',
  component: TreeSelect,
  tags: ['autodocs'],
};
export default meta;

export const Default: Story = {
  render: (args) => {
    function App() {
      const [_value, setValue] = useState<unknown>();
      return (
        <TreeSelect
          {...args}
          data={testData}
          onChange={setValue}
          globalSearchLabel=""
        />
      );
    }
    return (
      <Theme data-is-root-theme={false}>
        <App />
      </Theme>
    );
  },
};

export const WithValue: Story = {
  render: (args) => {
    function App() {
      const [_value, setValue] = useState<unknown>();
      return (
        <TreeSelect
          {...args}
          data={testData}
          onChange={setValue}
          globalSearchLabel=""
          value={treeSelectValueData}
        />
      );
    }
    return (
      <Theme data-is-root-theme={false}>
        <App />
      </Theme>
    );
  },
};
