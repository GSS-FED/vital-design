import { ForwardedRef, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { colors, styles } from '../../../constants';

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
    disabled = false,
    onChange,
    onEnter,
    ...textAreaProps
  } = props;

  return (
    <Container
      $width={width}
      $height={height}
      $isError={isError}
      $disabled={disabled}
      className={className}
      style={style}
      data-testid="textarea-container"
    >
      <TextArea
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
        {...textAreaProps}
      />
    </Container>
  );
});

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;

/* --------------------------------- Style --------------------------------- */
const Container = styled.div<{
  $width?: string;
  $height?: string;
  $isError?: boolean;
  $disabled: boolean;
}>`
  ${styles.boxSizing}

  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? 'auto'};
  padding: 6px 8px;
  border: 1px solid ${colors.grayscale300};
  border-radius: 4px;
  transition: 0.2s;
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
const TextArea = styled.textarea`
  all: unset; // 移除預設樣式
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${colors.grayscale800};

  &::placeholder {
    color: ${colors.grayscale400};
  }

  &:disabled {
    color: ${colors.grayscale500};
  }
`;
