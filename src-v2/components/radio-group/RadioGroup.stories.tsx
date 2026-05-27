import { useArgs } from '@storybook/preview-api';
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Label } from '../label/Label';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

type RadioOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};

type RadioGroupStoryArgs = {
  options: RadioOption[];
  value: string;
  onValueChange: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  className?: string;
};

type Story = StoryObj<RadioGroupStoryArgs>;

const options = [
  { label: '選項一', value: 'unique-value-a', disabled: false },
  { label: '選項二', value: 'unique-value-b', disabled: false },
  { label: '選項三', value: 'unique-value-c', disabled: false },
] satisfies RadioOption[];

function radioGroupClassName(
  direction: RadioGroupStoryArgs['direction'] = 'horizontal',
) {
  return [
    'flex flex-wrap gap-4 box-border font-sans text-sm leading-5 text-grayscale-opacity-800',
    direction === 'vertical' ? 'flex-col' : 'flex-row',
  ].join(' ');
}

function RadioOption({
  disabled,
  idPrefix = 'radio-story',
  label,
  value,
}: {
  disabled?: boolean;
  idPrefix?: string;
  label: ReactNode;
  value: string;
}) {
  const id = `${idPrefix}-${value}`;

  return (
    <div
      className="group flex items-center gap-2"
      data-disabled={disabled ? true : undefined}
    >
      <div className="flex h-5 flex-none items-center">
        <RadioGroupItem
          className={
            disabled
              ? 'data-checked:opacity-40'
              : 'group-hover:border-primary-500 group-hover:shadow-(--shadow-focus-ring-primary)'
          }
          disabled={disabled}
          id={id}
          value={value}
        />
      </div>
      <Label
        className={
          disabled
            ? 'cursor-not-allowed font-normal leading-5 text-grayscale-opacity-500'
            : 'cursor-pointer font-normal leading-5 text-grayscale-opacity-800'
        }
        htmlFor={id}
      >
        {label}
      </Label>
    </div>
  );
}

function renderOptions(args: RadioGroupStoryArgs) {
  const {
    className,
    direction = 'horizontal',
    onValueChange,
    options,
    value,
  } = args;

  return (
    <RadioGroup
      className={[radioGroupClassName(direction), className]
        .filter(Boolean)
        .join(' ')}
      value={value}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <RadioOption key={option.value} {...option} />
      ))}
    </RadioGroup>
  );
}

const meta: Meta<RadioGroupStoryArgs> = {
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
    onValueChange: fn(),
    direction: 'horizontal',
    options,
    value: 'unique-value-a',
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<RadioGroupStoryArgs>();
    const onValueChange = (checkedValue: string) => {
      updateArgs({ value: checkedValue });
    };

    return renderOptions({ ...args, onValueChange, value });
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
  render: renderOptions,
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
  render: renderOptions,
};

export const OptionWithCustomizedLabel: Story = {
  name: 'Customizable Label',
  args: {
    direction: 'vertical',
    options: [
      {
        label: (
          <div>
            我養了一隻{' '}
            <select name="pets" id="pet-select">
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option>
            </select>
          </div>
        ),
        value: 'unique-value-a',
      },
      { label: '我沒有養寵物', value: 'unique-value-b' },
    ],
  },
  render: renderOptions,
};

export const CompoundItems: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [checkedValue, setCheckedValue] = useState('basic');

    return (
      <RadioGroup
        className={radioGroupClassName('horizontal')}
        value={checkedValue}
        onValueChange={setCheckedValue}
      >
        <div className="group flex items-center gap-2">
          <div className="flex h-5 flex-none items-center">
            <RadioGroupItem
              className="group-hover:border-primary-500 group-hover:shadow-(--shadow-focus-ring-primary)"
              id="radio-story-basic"
              value="basic"
            />
          </div>
          <Label
            className="cursor-pointer font-normal leading-5"
            htmlFor="radio-story-basic"
          >
            <span>
              <span className="block">Basic</span>
              <span className="block text-xs text-grayscale-opacity-500">
                Good for individual use
              </span>
            </span>
          </Label>
        </div>
        <div className="group flex items-center gap-2">
          <div className="flex h-5 flex-none items-center">
            <RadioGroupItem
              className="group-hover:border-primary-500 group-hover:shadow-(--shadow-focus-ring-primary)"
              id="radio-story-pro"
              value="pro"
            />
          </div>
          <Label
            className="cursor-pointer font-normal leading-5"
            htmlFor="radio-story-pro"
          >
            <span>
              <span className="block">Pro</span>
              <span className="block text-xs text-grayscale-opacity-500">
                Recommended for teams
              </span>
            </span>
          </Label>
        </div>
      </RadioGroup>
    );
  },
};
