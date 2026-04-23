import { SearchIcon } from '@/icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './InputGroup';

type Story = StoryObj<typeof InputGroup>;

const meta: Meta<typeof InputGroup> = {
  title: 'Components/Input/InputGroup',
  component: InputGroup,
  args: {
    disabled: false,
    isError: false,
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    return (
      <InputGroup {...args} style={{ width: '450px' }}>
        <InputGroupAddon>
          <SearchIcon width={18} height={18} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Clear" onClick={fn()}>
            ×
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
};

export const WithText: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <InputGroup style={{ width: '450px' }}>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput defaultValue="vital.example.com" />
      </InputGroup>
    );
  },
};

export const Textarea: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <InputGroup style={{ width: '450px' }}>
        <InputGroupTextarea
          defaultValue="Multiline content"
          placeholder="Enter your message"
          style={{ height: '120px' }}
        />
      </InputGroup>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: function Render(args) {
    return (
      <InputGroup {...args} style={{ width: '450px' }}>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput defaultValue="2000" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Increase">+</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
};
