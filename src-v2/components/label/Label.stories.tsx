import { Input } from '@/components/input/input/Input';
import { type Meta, type StoryObj } from '@storybook/react';
import { Label } from './Label';

type Story = StoryObj<typeof Label>;

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  args: {
    children: 'Email',
    htmlFor: 'label-email',
  },
};

export default meta;

export const Default: Story = {
  render: function Render(args) {
    return <Label {...args} />;
  },
};

export const WithInput: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex w-80 flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="name@example.com" />
      </div>
    );
  },
};

export const Required: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex w-80 flex-col gap-2">
        <Label htmlFor="required-email" required>
          Email
        </Label>
        <Input
          id="required-email"
          placeholder="name@example.com"
          required
        />
      </div>
    );
  },
};

export const WithDisabledInput: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div className="flex w-80 flex-col gap-2">
        <Label htmlFor="disabled-email">Email</Label>
        <Input
          id="disabled-email"
          placeholder="name@example.com"
          disabled
        />
      </div>
    );
  },
};
