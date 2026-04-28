import { Button } from '@/components/button/Button';
import { type Meta, type StoryObj } from '@storybook/react';
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from './ButtonGroup';

type Story = StoryObj<typeof ButtonGroup>;

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  args: {
    orientation: 'horizontal',
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    return (
      <ButtonGroup {...args}>
        <Button theme="default">Save</Button>
        <Button theme="default">More</Button>
      </ButtonGroup>
    );
  },
};

export const WithSeparator: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <ButtonGroup>
        <Button>Archive</Button>
        <ButtonGroupSeparator />
        <Button>Snooze</Button>
      </ButtonGroup>
    );
  },
};

export const WithText: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <ButtonGroup>
        <ButtonGroupText>Status</ButtonGroupText>
        <Button theme="default">Publish</Button>
      </ButtonGroup>
    );
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: function Render(args) {
    return (
      <ButtonGroup {...args} className="w-[160px]">
        <Button theme="default">Action A</Button>
        <Button theme="default">Action B</Button>
      </ButtonGroup>
    );
  },
};

export const Nested: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <ButtonGroup>
        <ButtonGroup>
          <Button theme="default">Back</Button>
          <Button theme="default">Next</Button>
        </ButtonGroup>
        <Button>Submit</Button>
      </ButtonGroup>
    );
  },
};
