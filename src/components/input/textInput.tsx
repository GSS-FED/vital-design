import {
  CSSProperties,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react';
import styled, { css } from 'styled-components';
import { colors, styles } from '../../constants';

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

  const hasPreifx = !!prefix;
  const hasSuffix = !!suffix;

  return (
    <Container
      $width={width}
      $isError={isError}
      $disabled={disabled}
      className={className}
      style={style}
    >
      {hasPreifx && prefix}
      <Input
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
      {hasSuffix && suffix}
    </Container>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;

/* --------------------------------- Style --------------------------------- */
const Container = styled.div<{
  $width?: string;
  $disabled?: boolean;
  $isError?: boolean;
}>`
  ${styles.boxSizing}

  width: ${({ $width }) => $width ?? '100%'};
  padding: 6px 8px;
  border: 1px solid ${colors.grayscale300};
  border-radius: 4px;
  transition: 0.2s;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${colors.grayscale500};
  background-color: ${colors.white};

  &:hover {
    border: 1px solid ${colors.grayscale500};
  }
  &:focus-within {
    border: 1px solid ${colors.primary500};
  }

  ${({ $isError }) =>
    $isError &&
    css`
      border: 1px solid ${colors.alarm500};
      &:hover,
      &:focus-within {
        border: 1px solid ${colors.alarm500};
      }
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      border: 1px solid ${colors.grayscale300};
      background-color: ${colors.grayscale200};
      &:hover {
        border: 1px solid ${colors.grayscale300};
      }
    `}
`;
const Input = styled.input`
  all: unset; // 移除預設樣式
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${colors.grayscale800};

  ::placeholder {
    color: ${colors.grayscale400};
  }

  &:disabled {
    color: ${colors.grayscale500};
  }
`;
