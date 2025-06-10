import * as RadixSwitch from '@radix-ui/react-switch';
import { rgba } from 'polished';
import { CSSProperties } from 'react';
import styled from 'styled-components';
import { colors, styles } from 'src/constants';

export type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function Switch(props: SwitchProps) {
  const { checked, onChange, disabled, className, style } = props;

  return (
    <Container
      checked={checked}
      onCheckedChange={disabled ? undefined : onChange}
      disabled={disabled}
      className={className}
      style={style}
    >
      <Thumb />
    </Container>
  );
}
Switch.displayName = 'Switch';

const Container = styled(RadixSwitch.Root)`
  all: unset; // 移除按鈕預設樣式
  ${styles.boxSizing}
  ${styles.typography}

  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  width: 52px;
  height: 24px;
  padding: 0 3px;
  border: 1px solid ${colors.grayscale300};
  border-radius: 100px;
  color: ${colors.grayscale500};
  background-color: ${colors.grayscale200};
  transition:
    color 100ms,
    background-color 100ms;
  cursor: pointer;

  &::before {
    content: 'Off';
    position: absolute;
    left: auto;
    right: 8px;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    color: ${colors.white};
    background-color: ${colors.primary500};
    border-color: transparent;

    &::before {
      content: 'On';
      left: 8px;
      right: auto;
    }
  }
`;
const Thumb = styled(RadixSwitch.Thumb)`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid ${colors.grayscale300};
  border-radius: 50%;
  transform: translateX(0);
  background-color: ${colors.white};
  transition: transform 100ms;

  &[data-state='checked'] {
    transform: translateX(150%);
    border-color: transparent;
  }

  ${Container}:disabled & {
    opacity: 0.8;
  }
  ${Container}:not(:disabled):hover & {
    box-shadow: 0 0 0 1px ${colors.grayscale200};

    &[data-state='checked'] {
      box-shadow: 0 0 0 5px ${rgba(colors.primary500, 0.2)};
    }
  }
`;
