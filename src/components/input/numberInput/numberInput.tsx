import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import { colors, styles } from '../../../constants';

/* ---------------------------------- Types --------------------------------- */
export type NumberInputProps = {
  className?: string;
  label?: string;
  hint?: string;
  labelDirection?: 'horizontal' | 'vertical';
  mustFillIcon?: boolean;
  mustFillText?: boolean;
  width?: string;
  value: number | null;
  max?: number;
  min?: number;
  step?: number;
  disabled?: boolean;
  isError?: boolean;
  style?: CSSProperties;
  onChange: (value: number | null) => void;
};

/* ---------------------------------- Component --------------------------------- */
const NumberInput = forwardRef(function NumberInput(
  props: NumberInputProps &
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'onChange' | 'value' | 'defaultValue'
    >,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    className,
    label,
    labelDirection: direction = 'vertical',
    hint,
    width,
    value,
    disabled = false,
    mustFillIcon = false,
    mustFillText = false,
    max,
    min,
    step = 1,
    isError,
    style,
    onChange,
    ...inputProps
  } = props;

  const [localValue, setLocalValue] = useState<number | string>(
    value ?? '',
  );

  const isNumber = (input: number | string) => {
    return typeof input === 'number';
  };

  const handleIncrease = () => {
    if (localValue === null || localValue.toString() === '') {
      handleChangeValue(1);
      return;
    }
    if (
      max !== undefined &&
      isNumber(localValue) &&
      localValue >= max
    )
      return;

    if (!disabled && isNumber(localValue)) {
      if (step !== undefined) {
        handleChangeValue(localValue + step);
      } else {
        handleChangeValue(localValue + 1);
      }
    }
  };

  const handleDecrease = () => {
    if (localValue === null || localValue.toString() === '') {
      handleChangeValue(-1);
      return;
    }
    if (
      min !== undefined &&
      isNumber(localValue) &&
      localValue <= min
    )
      return;

    if (!disabled && isNumber(localValue)) {
      if (step !== undefined) {
        handleChangeValue(localValue - step);
      } else {
        handleChangeValue(localValue - 1);
      }
    }
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleInput = (input: string) => {
    handleChangeValue(input);
  };

  const handleBlur = () => {
    if (localValue === null) return;

    if (localValue.toString() === '-') handleChangeValue('');
    if (
      max !== undefined &&
      isNumber(localValue) &&
      localValue > max
    ) {
      handleChangeValue(max);
    } else if (
      min !== undefined &&
      isNumber(localValue) &&
      localValue < min
    ) {
      handleChangeValue(min);
    }
    setIsFocused(false);
  };

  const handleChangeValue = (newValue: number | string) => {
    if (newValue === '' || newValue === '-') {
      setLocalValue(newValue);
      onChange(null);
      return;
    }

    if (
      typeof newValue === 'string' &&
      isFocused &&
      !isNaN(parseInt(newValue))
    ) {
      const parsedValue = parseInt(
        newValue.replace(/^(-)|[^0-9]+/g, '$1'),
      );

      setLocalValue(parsedValue);
      onChange(parsedValue);
      return;
    }

    if (typeof newValue === 'number') {
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <>
      <Container $direction={direction}>
        <LabelContainer
          $direction={direction}
          $mustFillText={mustFillText}
        >
          <DotContainer $mustFillIcon={mustFillIcon}>
            {mustFillIcon &&
              !mustFillText &&
              label !== undefined &&
              label?.length > 0 && <div>˙</div>}
          </DotContainer>
          <Label>{label}</Label>
          {mustFillText &&
            label !== undefined &&
            label?.length > 0 && <div>(選填)</div>}
        </LabelContainer>

        <InputAndHintContainer>
          <InputContainer
            $width={width}
            $disabled={disabled}
            $isError={isError}
            className={className}
            style={style}
            data-testid="numberInput-container"
          >
            <Input
              ref={ref}
              value={localValue}
              disabled={disabled}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              onInput={(e) => handleInput(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  handleIncrease();
                }
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  handleDecrease();
                }
              }}
              {...inputProps}
              data-testid="input-element"
            />
            <IconsContainer>
              <IconContainer
                $disabled={
                  disabled ||
                  (max !== undefined &&
                    isNumber(localValue) &&
                    localValue >= max)
                }
                data-testid="increase-value"
                onClick={handleIncrease}
              >
                <IncreaseIcon />
              </IconContainer>
              <IconContainer
                $disabled={
                  disabled ||
                  (min !== undefined &&
                    isNumber(localValue) &&
                    localValue <= min)
                }
                data-testid="decrease-value"
                onClick={handleDecrease}
              >
                <DecreaseIcon />
              </IconContainer>
            </IconsContainer>
          </InputContainer>
          <Hint>{hint}</Hint>
        </InputAndHintContainer>
      </Container>
    </>
  );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;

type ContainerProps = {
  $direction?: NumberInputProps['labelDirection'];
};

type LabelProps = {
  $direction?: NumberInputProps['labelDirection'];
  $mustFillText?: NumberInputProps['mustFillText'];
};

type DotProps = {
  $mustFillIcon?: NumberInputProps['mustFillIcon'];
};

/* --------------------------------- Style --------------------------------- */
const DotContainer = styled.div<DotProps>`
  position: absolute;
  top: -7px;
  left: -12px;
  ${(props) =>
    props.$mustFillIcon === true &&
    css`
      color: ${colors.alarm500};
      font-size: 40px;
    `}
`;

const LabelContainer = styled.div<LabelProps>`
  display: flex;
  flex-direction: row;
  margin-right: 10%;
  position: relative;

  ${(props) =>
    props.$direction === 'horizontal' &&
    css`
      margin-top: 7px;
    `}

  ${(props) =>
    props.$mustFillText === true &&
    css`
      color: ${colors.grayscale500};
      font-family: 'Noto Sans TC';
      font-size: 12px;
      gap: 5px;
      line-height: 20px;
    `}
`;

const Label = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${colors.grayscale800};
  font-family: 'Noto Sans TC';
  padding-bottom: 5px;
`;

const Container = styled.div<ContainerProps>`
  display: flex;
  margin-top: 2px;
  flex-direction: ${(props) =>
    props.$direction === 'vertical' ? 'column' : 'row'};
`;

const InputAndHintContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div<{
  $width?: string;
  $disabled?: boolean;
  $isError?: boolean;
}>`
  ${styles.boxSizing}

  width: ${({ $width }) => $width ?? '100%'};
  height: auto;
  border: 1px solid ${colors.grayscale300};
  border-radius: 4px;
  transition: 0.2s;
  display: flex;
  gap: 12px;
  color: ${colors.grayscale500};
  background-color: ${colors.white};

  &:hover {
    border: 1px solid ${colors.grayscale500};
  }

  &:focus-within {
    border: 1px solid ${colors.primary500};
  }

  &[aria-selected='true'] {
    outline-color: ${colors.primary500};
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

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${colors.grayscale800};
`;

const IconContainer = styled.button<{
  $disabled?: boolean;
}>`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-left: 1px solid ${colors.grayscale300};
  background-color: ${colors.white};
  width: 25px;

  &:first-child {
    border-top-right-radius: 3px;
    border-bottom: 1px solid ${colors.grayscale300};
  }

  &:last-child {
    border-bottom-right-radius: 3px;
  }

  &:hover {
    background-color: ${colors.grayscale100};
  }

  &:hover:active {
    background-color: ${colors.grayscale200};
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      color: ${colors.grayscale300};
      background-color: ${colors.grayscale100};
      pointer-events: none;
    `}
`;

const Input = styled.input`
  all: unset; // 移除預設樣式
  text-align: right;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.grayscale800};

  &:disabled {
    color: ${colors.grayscale200};
  }
`;

const Hint = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.grayscale600};
  margin-top: 4px;
  font-family: 'Noto Sans TC';
`;

/* ---------------------------------- Icons --------------------------------- */
function IncreaseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9 5"
      width={10}
      height={15}
      fill="currentColor"
    >
      <path d="M1.21094 3.73438L4.1875 0.734375C4.35156 0.59375 4.53906 0.5 4.75 0.5C4.9375 0.5 5.125 0.59375 5.26562 0.734375L8.24219 3.73438C8.45312 3.94531 8.52344 4.27344 8.40625 4.55469C8.28906 4.83594 8.03125 5 7.72656 5H1.75C1.44531 5 1.16406 4.83594 1.04688 4.55469C0.929688 4.27344 1 3.94531 1.21094 3.73438Z" />
    </svg>
  );
}

function DecreaseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9 5"
      width={10}
      height={15}
      fill="currentColor"
    >
      <path d="M8.26562 1.28906L5.28906 4.28906C5.125 4.42969 4.9375 4.5 4.75 4.5C4.53906 4.5 4.35156 4.42969 4.21094 4.28906L1.23438 1.28906C1 1.07812 0.929688 0.75 1.04688 0.46875C1.16406 0.1875 1.44531 0 1.75 0H7.72656C8.03125 0 8.28906 0.1875 8.40625 0.46875C8.52344 0.75 8.47656 1.07812 8.26562 1.28906Z" />
    </svg>
  );
}
