import { cn } from '@/utils/cn';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { type VariantProps, cva } from 'class-variance-authority';
import type { CSSProperties, ReactNode } from 'react';

const radioGroupVariants = cva(
  [
    'flex flex-wrap gap-4',
    'text-sm leading-5 text-grayscale-800',
    'font-sans box-border',
  ],
  {
    variants: {
      direction: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
    },
    defaultVariants: { direction: 'horizontal' },
  },
);

export type RadioGroupVariants = VariantProps<
  typeof radioGroupVariants
>;

export type RadioOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};
export type RadioGroupProps = {
  options: RadioOption[];
  value: string;
  onChange?: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  style?: CSSProperties;
  allowCancel?: boolean;
};

export default function RadioGroup(props: RadioGroupProps) {
  const {
    options,
    value,
    onChange,
    direction = 'horizontal',
    className,
    style,
    allowCancel = false,
  } = props;

  return (
    <BaseRadioGroup
      value={value}
      onValueChange={(nextValue: string) => {
        onChange?.(nextValue);
      }}
      className={cn(radioGroupVariants({ direction }), className)}
      style={style}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'group flex items-center gap-2',
            option.disabled
              ? 'text-grayscale-500 cursor-not-allowed'
              : 'cursor-pointer',
          )}
        >
          <div className="flex-none flex items-center h-5">
            <BaseRadio.Root
              value={option.value}
              disabled={option.disabled}
              onClick={() => {
                if (
                  !option.disabled &&
                  allowCancel &&
                  option.value === value
                ) {
                  onChange?.('');
                }
              }}
              className={cn(
                'inline-flex justify-center items-center',
                'w-4 h-4 border border-grayscale-400 rounded-full',
                'bg-white transition-colors duration-100',
                'font-sans box-border',
                'data-disabled:border-grayscale-300 data-disabled:bg-grayscale-200 data-disabled:cursor-not-allowed',
                !option.disabled &&
                  'group-hover:border-primary-500 group-hover:shadow-(--shadow-focus-ring-primary)',
                'data-checked:border-transparent data-checked:bg-primary-500',
                option.disabled &&
                  option.value === value &&
                  'data-disabled:data-checked:border-transparent data-disabled:data-checked:bg-primary-500 opacity-40',
              )}
            >
              <BaseRadio.Indicator
                className={cn(
                  'w-1.5 h-1.5 rounded-full bg-white',
                  option.disabled &&
                    option.value === value &&
                    'bg-white/80',
                )}
              />
            </BaseRadio.Root>
          </div>
          <div>{option.label}</div>
        </label>
      ))}
    </BaseRadioGroup>
  );
}
RadioGroup.displayName = 'RadioGroup';
