import { cn } from '@/utils/cn';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { type VariantProps, cva } from 'class-variance-authority';
import { createContext, useContext } from 'react';
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

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

type RadioGroupContextValue = {
  allowCancel: boolean;
  onChange?: (value: string) => void;
  value: string;
};

const RadioGroupContext =
  createContext<RadioGroupContextValue | null>(null);

const useRadioGroupContext = () => {
  return useContext(RadioGroupContext);
};

export type RadioGroupProps = {
  options?: RadioOption[];
  value: string;
  onChange?: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  style?: CSSProperties;
  allowCancel?: boolean;
  children?: ReactNode;
} & Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'defaultValue' | 'dir' | 'onChange'
>;

function RadioGroup(props: RadioGroupProps) {
  const {
    options,
    value,
    onChange,
    direction = 'horizontal',
    className,
    style,
    allowCancel = false,
    children,
    ...groupProps
  } = props;

  return (
    <RadioGroupContext.Provider
      value={{ allowCancel, onChange, value }}
    >
      <BaseRadioGroup
        value={value}
        onValueChange={(nextValue: string) => {
          onChange?.(nextValue);
        }}
        className={cn(radioGroupVariants({ direction }), className)}
        style={style}
        {...groupProps}
      >
        {children ??
          options?.map((option) => (
            <RadioGroupItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </RadioGroupItem>
          ))}
      </BaseRadioGroup>
    </RadioGroupContext.Provider>
  );
}

export type RadioGroupItemProps = {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
} & Omit<
  ComponentPropsWithoutRef<'label'>,
  'children' | 'defaultValue' | 'onChange'
>;

function RadioGroupItem(props: RadioGroupItemProps) {
  const {
    value,
    disabled,
    children,
    className,
    style,
    ...labelProps
  } = props;
  const context = useRadioGroupContext();
  const isChecked = context?.value === value;

  return (
    <label
      className={cn(
        'group flex items-center gap-2',
        disabled
          ? 'text-grayscale-500 cursor-not-allowed'
          : 'cursor-pointer',
        className,
      )}
      style={style}
      {...labelProps}
    >
      <div className="flex-none flex items-center h-5">
        <BaseRadio.Root
          value={value}
          disabled={disabled}
          onClick={() => {
            if (
              disabled ||
              !context?.allowCancel ||
              context.value !== value
            ) {
              return;
            }
            context.onChange?.('');
          }}
          className={cn(
            'inline-flex justify-center items-center',
            'w-4 h-4 border border-grayscale-400 rounded-full',
            'bg-white transition-colors duration-100',
            'font-sans box-border',
            'data-disabled:border-grayscale-300 data-disabled:bg-grayscale-200 data-disabled:cursor-not-allowed',
            !disabled &&
              'group-hover:border-primary-500 group-hover:shadow-(--shadow-focus-ring-primary)',
            'data-checked:border-transparent data-checked:bg-primary-500',
            disabled &&
              isChecked &&
              'data-disabled:data-checked:border-transparent data-disabled:data-checked:bg-primary-500 opacity-40',
          )}
        >
          <BaseRadio.Indicator
            className={cn(
              'w-1.5 h-1.5 rounded-full bg-white',
              disabled && isChecked && 'bg-white/80',
            )}
          />
        </BaseRadio.Root>
      </div>
      <div>{children}</div>
    </label>
  );
}

export { RadioGroup, RadioGroupItem };
export default RadioGroup;
