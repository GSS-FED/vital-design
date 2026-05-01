import { useArgs } from '@storybook/preview-api';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useId } from 'react';
import type { ReactNode } from 'react';
import { Label } from '../label/Label';
import { Checkbox } from './Checkbox';

type CheckboxStoryArgs = {
  checked: boolean | 'indeterminate';
  children: ReactNode;
  disabled?: boolean;
  required?: boolean;
  onCheckedChange: (checked: boolean) => void;
};

type Story = StoryObj<CheckboxStoryArgs>;

function checkboxStateProps(checked: CheckboxStoryArgs['checked']) {
  return {
    checked: checked === true,
    indeterminate: checked === 'indeterminate',
  };
}

function CheckboxField({
  checked,
  children,
  disabled,
  onCheckedChange,
  required,
}: CheckboxStoryArgs) {
  const id = useId();
  const isInvalid = !!required && checked !== true;

  return (
    <div
      className="group flex items-start gap-2 font-sans text-sm leading-5 text-grayscale-800"
      data-disabled={disabled ? true : undefined}
    >
      <div className="flex h-5 flex-none items-center">
        <Checkbox
          {...checkboxStateProps(checked)}
          aria-invalid={isInvalid || undefined}
          className={
            disabled
              ? 'data-checked:opacity-40 data-indeterminate:opacity-40'
              : undefined
          }
          disabled={disabled}
          id={id}
          onCheckedChange={onCheckedChange}
          required={required}
        />
      </div>
      <Label
        className={
          disabled
            ? 'cursor-not-allowed font-normal leading-5 text-grayscale-500'
            : 'cursor-pointer font-normal leading-5 text-grayscale-800'
        }
        htmlFor={id}
      >
        {children}
      </Label>
    </div>
  );
}

const meta: Meta<CheckboxStoryArgs> = {
  title: 'Components/Checkbox',
  argTypes: {
    checked: {
      options: [true, false, 'indeterminate'],
      control: { type: 'select' },
    },
  },
  args: {
    checked: false,
    children: 'Option A',
    onCheckedChange: fn(),
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs<CheckboxStoryArgs>();
    const onCheckedChange = (isChecked: boolean) => {
      updateArgs({ checked: isChecked });
    };

    return (
      <CheckboxField
        {...args}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: CheckboxField,
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true },
  render: CheckboxField,
};

export const Indeterminate: Story = {
  args: { checked: 'indeterminate' },
  render: CheckboxField,
};

export const DisabledIndeterminate: Story = {
  args: { checked: 'indeterminate', disabled: true },
  render: CheckboxField,
};
