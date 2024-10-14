import { Meta, StoryObj } from '@storybook/react';
import TextAreaInput from './textareaInput';

const meta: Meta<typeof TextAreaInput> = {
  title: 'Components/Input/TextAreaInput',
  component: TextAreaInput,
  tags: ['autodocs'],
  argTypes: {
    width: {
      table: {
        defaultValue: { summary: `100%` },
      },
    },
    height: {
      table: {
        defaultValue: { summary: `auto` },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: false },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextAreaInput>;

export const Basic: Story = {
  render() {
    function App() {
      return (
        <TextAreaInput
          placeholder="請輸入內容"
          width="450px"
          height="200px"
        />
      );
    }
    return <App />;
  },
};

export const Disabled: Story = {
  render() {
    function App() {
      return (
        <TextAreaInput placeholder="請輸入內容" disabled={true} />
      );
    }
    return <App />;
  },
};
