import { rgba } from 'polished';
import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';
import { colors, styles } from 'src/constants';

export type ChipProps = {
  children: ReactNode;
  selected: boolean;
  onChange: (selected: boolean) => void;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Chip(props: ChipProps) {
  const { children, selected, onChange, icon, className, style } =
    props;

  const hasIcon = !!icon;
  const customAttributes = {
    'data-state': selected ? 'selected' : 'unselected',
  };

  return (
    <Container
      onClick={() => {
        onChange(!selected);
      }}
      {...customAttributes}
      $hasIcon={hasIcon}
      className={className}
      style={style}
    >
      {hasIcon && <IconWrapper>{icon}</IconWrapper>}
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  );
}
Chip.displayName = 'Chip';

const RawButton = styled.button.attrs({ type: 'button' })`
  all: unset; // 移除按鈕預設樣式
`;
const Container = styled(RawButton)<{ $hasIcon?: boolean }>`
  ${styles.boxSizing}
  ${styles.typography}

  position: relative;
  display: inline-flex;
  gap: 4px;
  font-size: 14px;
  line-height: 18px;
  padding: 6px 16px;
  padding-left: ${(props) => props.$hasIcon && '14px'};
  border-radius: 9999px; // 確保任何大小都是圓角
  color: ${colors.grayscale800};
  background-color: ${colors.grayscale200};
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    transition: background-color 100ms;
  }
  &[data-state='selected'] {
    color: ${colors.primary500};
    background-color: ${colors.primary100};
  }
  &:hover {
    &::before {
      background-color: ${rgba(colors.grayscale800, 0.2)};
    }
    &[data-state='selected'] {
      &::before {
        background-color: ${rgba(colors.primary500, 0.2)};
      }
    }
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ChildrenWrapper = styled.div`
  display: flex;
  align-items: center;
`;
