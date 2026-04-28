import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/input/input-group/InputGroup';
import type { InputGroupVariants } from '@/components/input/input-group/InputGroup';
import { forwardRef } from 'react';
import type {
  CSSProperties,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

export type TextInputVariants = InputGroupVariants;

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
      InputHTMLAttributes<HTMLInputElement>,
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

  return (
    <InputGroup
      className={className}
      disabled={disabled}
      isError={isError}
      style={{ width: width ?? '100%', ...style }}
      data-testid="textInput-container"
    >
      {!!prefix && <InputGroupAddon>{prefix}</InputGroupAddon>}
      <InputGroupInput
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
        {...inputProps}
      />
      {!!suffix && (
        <InputGroupAddon align="inline-end">{suffix}</InputGroupAddon>
      )}
    </InputGroup>
  );
});

export { TextInput };
