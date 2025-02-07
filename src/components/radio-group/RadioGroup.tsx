import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { rgba } from 'polished';
import { CSSProperties } from 'react';
import styled from 'styled-components';
import { colors, styles } from '../../constants';

export type RadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
};
export type RadioGroupProps = {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  style?: CSSProperties;
};

export default function RadioGroup(props: RadioGroupProps) {
  const {
    options,
    value,
    onChange,
    direction = 'horizontal',
    className,
    style,
  } = props;

  return (
    <Container
      value={value}
      onValueChange={onChange}
      $direction={direction}
      className={className}
      style={style}
    >
      {options.map((option) => (
        <Label key={option.value} $disabled={option.disabled}>
          <ButtonWrapper>
            <Button value={option.value} disabled={option.disabled}>
              <Indictor />
            </Button>
          </ButtonWrapper>
          {!!option.label && <div>{option.label}</div>}
        </Label>
      ))}
    </Container>
  );
}
RadioGroup.displayName = 'RadioGroup';

type ContainerProps = {
  $direction?: RadioGroupProps['direction'];
};

const Container = styled(RadixRadioGroup.Root)<ContainerProps>`
  ${styles.boxSizing}
  ${styles.typography}

  display: flex;
  flex-direction: ${(props) =>
    props.$direction === 'vertical' ? 'column' : 'row'};
  flex-wrap: wrap;
  gap: 16px;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.grayscale800};
`;
const Label = styled.label<{ $disabled?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: ${(props) => props.$disabled && colors.grayscale500};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
`;
const ButtonWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: 20px; // 要跟文字的 line-height 相同，才能做到單行文字時置中，多行文字時置頂
`;
const Button = styled(RadixRadioGroup.Item)`
  all: unset; // 移除按鈕預設樣式
  ${styles.boxSizing}
  ${styles.typography}

  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: 1px solid ${colors.grayscale400};
  border-radius: 50%;
  background-color: ${colors.white};
  transition: background-color 100ms;

  &:disabled {
    border-color: ${colors.grayscale300};
    background-color: ${colors.grayscale200};
    cursor: not-allowed;
  }
  &:not(:disabled) {
    ${Label}:hover & {
      border-color: ${colors.primary500};
      box-shadow: 0px 0px 0px 2px ${rgba(colors.primary500, 0.2)};
    }
  }
  &[data-state='checked'] {
    border-color: transparent;
    background-color: ${colors.primary500};

    &:disabled {
      opacity: 0.4;
      background-color: ${colors.primary500};
    }
  }
`;
const Indictor = styled(RadixRadioGroup.Indicator)`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${colors.white};

  ${Button}:disabled & {
    background-color: ${rgba(colors.white, 0.8)};
  }
`;
