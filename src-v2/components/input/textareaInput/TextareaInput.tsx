import { cn } from '@/utils/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';

const textareaVariants = cva(
  [
    'text-sm font-normal leading-5 text-grayscale-800',
    'px-2 py-1.5 border rounded',
    'transition-all duration-200',
    'font-sans box-border outline-none',
    'placeholder:text-grayscale-400',
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
      resizable: {
        true: 'resize',
        false: 'resize-none',
      },
    },
    compoundVariants: [
      {
        disabled: true,
        isError: true,
        class: 'border-grayscale-300 hover:border-grayscale-300',
      },
    ],
    defaultVariants: {
      disabled: false,
      isError: false,
      resizable: false,
    },
  },
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;

/* ---------------------------------- Types --------------------------------- */
export type TextAreaInputProps = {
  className?: string;
  width?: string;
  height?: string;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  resizable?: boolean;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
};

/* ---------------------------------- Component --------------------------------- */
const TextAreaInput = forwardRef(function TextAreaInput(
  props: TextAreaInputProps &
    Omit<
      React.HTMLAttributes<HTMLTextAreaElement>,
      'onChange' | 'value' | 'defaultValue'
    >,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const {
    className,
    width,
    height,
    defaultValue,
    value,
    placeholder,
    style,
    isError,
    resizable = false,
    disabled = false,
    onChange,
    onEnter,
    ...textAreaProps
  } = props;

  return (
    <textarea
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
        textareaVariants({ disabled, isError, resizable }),
        className,
      )}
      style={{
        width: width ?? '100%',
        height: height ?? 'auto',
        ...style,
      }}
      data-testid="textarea-container"
      {...textAreaProps}
    />
  );
});

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
