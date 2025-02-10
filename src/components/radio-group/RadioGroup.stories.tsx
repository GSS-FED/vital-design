import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import RadioGroup, { RadioGroupProps } from './RadioGroup';

type Story = StoryObj<typeof RadioGroup>;

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
      defaultValue: { summary: 'horizontal' },
    },
  },
  args: {
    onChange: fn(),
    direction: 'horizontal',
    options: [
      { label: '選項一', value: 'unique-value-a', disabled: false },
      { label: '選項二', value: 'unique-value-b', disabled: false },
      { label: '選項三', value: 'unique-value-c', disabled: false },
    ],
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<RadioGroupProps>();
    const onChange = (checkedValue: string) => {
      updateArgs({ value: checkedValue });
    };

    return <RadioGroup {...args} onChange={onChange} value={value} />;
  },
};

export const CheckedAndDisabled: Story = {
  name: 'Checked & Disabled',
  args: {
    options: [
      { label: '選項', value: 'unique-value', disabled: true },
    ],
    value: 'unique-value',
  },
};

export const LongTextOption: Story = {
  name: 'Option With Long Text',
  args: {
    direction: 'vertical',
    options: [
      {
        label: `${'很長'.repeat(50)}的選項一`,
        value: 'unique-value-a',
      },
      { label: '選項二', value: 'unique-value-b' },
      { label: '選項三', value: 'unique-value-c' },
    ],
  },
};
