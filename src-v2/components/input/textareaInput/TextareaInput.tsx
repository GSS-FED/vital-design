import {
  InputGroup,
  InputGroupTextarea,
} from '@/components/input/input-group/InputGroup';
import type { InputGroupVariants } from '@/components/input/input-group/InputGroup';
import { forwardRef } from 'react';
import type {
  CSSProperties,
  ForwardedRef,
  TextareaHTMLAttributes,
} from 'react';

export type TextareaVariants = InputGroupVariants;

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
  style?: CSSProperties;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
};

/* ---------------------------------- Component --------------------------------- */
const TextAreaInput = forwardRef(function TextAreaInput(
  props: TextAreaInputProps &
    Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
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
    <InputGroup
      className={className}
      disabled={disabled}
      isError={isError}
      style={{
        width: width ?? '100%',
      }}
      data-testid="textarea-container"
    >
      <InputGroupTextarea
        ref={ref}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        resizable={resizable}
        style={{
          height: height ?? 'auto',
          ...style,
        }}
        onInput={(e) => onChange?.(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter?.(e.currentTarget.value);
          }
        }}
        {...textAreaProps}
      />
    </InputGroup>
  );
});

export { TextAreaInput };
