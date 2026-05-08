import { Label } from '@/components/label/Label';
import { type Meta, type StoryObj } from '@storybook/react';
import { useId, useState } from 'react';
import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputScrubArea,
  NumberInputScrubAreaCursor,
  NumberInputSteppers,
} from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/Input/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    defaultValue: 0,
  },
  render: (args) => (
    <NumberInput {...args}>
      <NumberInputGroup>
        <NumberInputControl placeholder="0" />
        <NumberInputSteppers />
      </NumberInputGroup>
    </NumberInput>
  ),
};

export const WithRange: Story = {
  args: {
    defaultValue: 5,
    min: 0,
    max: 10,
    step: 1,
  },
  render: (args) => (
    <NumberInput {...args}>
      <NumberInputGroup>
        <NumberInputControl placeholder="0" />
        <NumberInputSteppers />
      </NumberInputGroup>
    </NumberInput>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: 12,
    disabled: true,
  },
  render: (args) => (
    <NumberInput {...args}>
      <NumberInputGroup>
        <NumberInputControl placeholder="0" />
        <NumberInputSteppers />
      </NumberInputGroup>
    </NumberInput>
  ),
};

export const Error: Story = {
  args: {
    defaultValue: 99,
  },
  render: (args) => (
    <NumberInput {...args}>
      <NumberInputGroup>
        <NumberInputControl aria-invalid placeholder="0" />
        <NumberInputSteppers />
      </NumberInputGroup>
    </NumberInput>
  ),
};

export const Controlled: Story = {
  render: function ControlledRender() {
    const [value, setValue] = useState<number | null>(0);
    const id = useId();

    return (
      <NumberInput
        id={id}
        className="flex flex-col gap-2"
        value={value}
        onValueChange={(next) => setValue(next)}
        min={-50}
        max={50}
        step={5}
      >
        <NumberInputGroup>
          <NumberInputControl placeholder="0" />
          <NumberInputSteppers />
        </NumberInputGroup>
        <NumberInputScrubArea>
          <Label
            htmlFor={id}
            className="font-sans text-xs text-grayscale-600"
          >
            目前值：{value ?? '空'}
          </Label>
          <NumberInputScrubAreaCursor />
        </NumberInputScrubArea>
      </NumberInput>
    );
  },
};

export const Decimals: Story = {
  args: {
    defaultValue: 1.5,
    step: 0.1,
    smallStep: 0.01,
    largeStep: 1,
  },
  render: (args) => (
    <NumberInput {...args}>
      <NumberInputGroup>
        <NumberInputControl placeholder="0.0" />
        <NumberInputSteppers />
      </NumberInputGroup>
    </NumberInput>
  ),
};

export const FormattedCurrency: Story = {
  args: {
    defaultValue: 1234,
    format: {
      style: 'currency',
      currency: 'TWD',
      maximumFractionDigits: 0,
    },
  },
  render: (args) => (
    <NumberInput {...args}>
      <NumberInputGroup>
        <NumberInputControl placeholder="NT$0" />
        <NumberInputSteppers />
      </NumberInputGroup>
    </NumberInput>
  ),
};
