import { cn } from '@/utils/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import {
  type CSSProperties,
  type ForwardedRef,
  type ReactNode,
  forwardRef,
} from 'react';

const textInputVariants = cva(
  [
    'flex items-center gap-2 px-2 py-1.5',
    'border rounded',
    'transition-all duration-200',
    'text-grayscale-500 box-border',
  ],
  {
    variants: {
      disabled: {
        true: 'border-grayscale-300 bg-grayscale-200 hover:border-grayscale-300',
        false:
          'bg-white border-grayscale-300 hover:border-grayscale-500 focus-within:border-primary-500',
      },
      isError: {
        true: 'border-alarm-500 hover:border-alarm-500 focus-within:border-alarm-500',
        false: '',
      },
    },
    compoundVariants: [
      {
        disabled: true,
        isError: true,
        class: 'border-grayscale-300 hover:border-grayscale-300',
      },
    ],
    defaultVariants: { disabled: false, isError: false },
  },
);

export type TextInputVariants = VariantProps<
  typeof textInputVariants
>;

/* ---------------------------------- Types --------------------------------- */
export type TextInputProps = {
  className?: string;
  width?: string;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  isError?: boolean;
  style?: CSSProperties;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
};

/* ---------------------------------- Component --------------------------------- */
const TextInput = forwardRef(function TextInput(
  props: TextInputProps &
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'prefix' | 'onChange' | 'value' | 'defaultValue'
    >,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    className,
    width,
    defaultValue,
    value,
    placeholder,
    prefix,
    suffix,
    style,
    isError,
    disabled = false,
    onChange,
    onEnter,
    ...inputProps
  } = props;

  const hasPrefix = !!prefix;
  const hasSuffix = !!suffix;

  return (
    <div
      className={cn(
        textInputVariants({ disabled, isError }),
        className,
      )}
      style={{ width: width ?? '100%', ...style }}
      data-testid="textInput-container"
    >
      {hasPrefix && prefix}
      <input
        ref={ref}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        onInput={(e) => onChange?.(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter?.(e.currentTarget.value);
          }
        }}
        className={cn(
          'appearance-none outline-none w-full text-sm font-normal leading-5',
          'text-grayscale-800 bg-transparent',
          'placeholder:text-grayscale-400',
          'disabled:text-grayscale-500',
        )}
        {...inputProps}
      />
      {hasSuffix && suffix}
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
