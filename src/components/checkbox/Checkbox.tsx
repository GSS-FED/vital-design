import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { rgba } from 'polished';
import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';
import { colors, styles } from 'src/constants';

export type CheckboxProps = {
  checked: boolean | 'indeterminate';
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Checkbox(props: CheckboxProps) {
  const {
    checked,
    onChange,
    disabled,
    required,
    children,
    className,
    style,
  } = props;

  const handleCheckedChange = disabled ? undefined : onChange;
  const isInvalid = !!required && !checked;
  const customAttributes = {
    'data-invalid': isInvalid ? '' : undefined,
  };

  return (
    <Container
      $disabled={disabled}
      className={className}
      style={style}
    >
      <ButtonWrapper>
        <Button
          checked={checked}
          onCheckedChange={handleCheckedChange}
          disabled={disabled}
          required={required}
          {...customAttributes}
        >
          <Indicator>
            {checked === 'indeterminate' && <MinusIcon />}
            {checked === true && <CheckIcon />}
          </Indicator>
        </Button>
      </ButtonWrapper>
      {!!children && <ChildrenWrapper>{children}</ChildrenWrapper>}
    </Container>
  );
}
Checkbox.displayName = 'Checkbox';

const Container = styled.label<{ $disabled?: boolean }>`
  ${styles.boxSizing}
  ${styles.typography}

  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) =>
    props.$disabled ? colors.grayscale500 : colors.grayscale800};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
`;
const ButtonWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: 20px; // 要跟文字的 line-height 相同，才能做到單行文字時置中，多行文字時置頂
`;
const Button = styled(RadixCheckbox.Root)`
  all: unset; // 移除按鈕預設樣式
  ${styles.boxSizing}
  ${styles.typography}

  display: flex;
  align-items: center;
  width: 16px;
  height: 16px;
  border: 1px solid ${colors.grayscale400};
  border-radius: 2px;
  background-color: ${colors.white};
  transition: background-color 100ms;

  &:disabled {
    border-color: ${colors.grayscale300};
    background-color: ${colors.grayscale200};
  }
  &[data-invalid] {
    border-color: ${colors.alarm500};
  }
  &:is([data-state='checked'], [data-state='indeterminate']) {
    border-color: ${colors.primary500};
    background-color: ${colors.primary500};

    &:disabled {
      background-color: ${colors.primary500};
      opacity: 0.4;
    }
  }

  ${Container}:hover & {
    border-color: ${colors.primary500};
    box-shadow: 0px 0px 0px 2px ${rgba(colors.primary500, 0.2)};

    &:disabled {
      border-color: revert;
      box-shadow: revert;
    }
    &[data-invalid] {
      border-color: ${colors.alarm500};
      box-shadow: 0px 0px 0px 2px ${rgba(colors.alarm500, 0.2)};
    }
  }
`;
const Indicator = styled(RadixCheckbox.Indicator)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${colors.white};

  &[data-state='checked'] {
    svg {
      width: 12px;
      height: 9px;
    }
  }
  &[data-state='indeterminate'] {
    svg {
      width: 10px;
      height: 3px;
    }
  }
`;
const ChildrenWrapper = styled.div`
  flex: 0 1 auto;
`;

function MinusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 3">
      <path
        d="M9.125 2.25H.875a.74.74 0 0 1-.75-.75c0-.398.328-.75.75-.75h8.25c.398 0 .75.352.75.75 0 .422-.352.75-.75.75z"
        fill="currentColor"
      />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 9">
      <path
        d="M11.016.984c.305.281.305.773 0 1.055l-6 6c-.281.305-.773.305-1.055 0l-3-3c-.305-.281-.305-.773 0-1.055.281-.305.773-.305 1.055 0l2.461 2.461L9.961.984c.281-.305.773-.305 1.055 0z"
        fill="currentColor"
      />
    </svg>
  );
}
