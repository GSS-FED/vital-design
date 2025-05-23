import { ForwardedRef, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { colors, styles } from 'src/constants';

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
    <TextArea
      $width={width}
      $height={height}
      $isError={isError}
      $disabled={disabled}
      $resizable={resizable}
      className={className}
      style={style}
      data-testid="textarea-container"
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
  );
});

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;

/* --------------------------------- Style --------------------------------- */
//   $width?: string;
//   $height?: string;
//   $isError?: boolean;
//   $disabled: boolean;
// }>`
//   ${styles.boxSizing}

//   width: ${({ $width }) => $width ?? '100%'};
//   height: ${({ $height }) => $height ?? 'auto'};
//   padding: 6px 8px;
//   border: 1px solid ${colors.grayscale300};
//   border-radius: 4px;
//   transition: 0.2s;
//   color: ${colors.grayscale500};
//   background-color: ${colors.white};

//   &:hover {
//     border: 1px solid ${colors.grayscale500};
//   }
//   &:focus-within {
//     border: 1px solid ${colors.primary500};
//   }
//   ${({ $isError }) =>
//     $isError &&
//     css`
//       border: 1px solid ${colors.alarm500};
//       &:hover,
//       &:focus-within {
//         border: 1px solid ${colors.alarm500};
//       }
//     `}

//   ${({ $disabled }) =>
//     $disabled &&
//     css`
//       border: 1px solid ${colors.grayscale300};
//       background-color: ${colors.grayscale200};
//       &:hover {
//         border: 1px solid ${colors.grayscale300};
//       }
//     `}
// `;
const TextArea = styled.textarea<{
  $width?: string;
  $height?: string;
  $isError?: boolean;
  $disabled: boolean;
  $resizable: boolean;
}>`
  all: unset; // 移除預設樣式

  ${styles.boxSizing}
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${colors.grayscale800};
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? 'auto'};
  padding: 6px 8px;
  border: 1px solid ${colors.grayscale300};
  border-radius: 4px;
  transition: 0.2s;
  background-color: ${colors.white};
  resize: ${({ $resizable }) => ($resizable ? 'both' : 'none')};

  &:hover {
    border: 1px solid ${colors.grayscale500};
  }
  &:focus-within {
    border: 1px solid ${colors.primary500};
  }
  &::placeholder {
    color: ${colors.grayscale400};
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
