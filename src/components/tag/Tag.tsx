import { rgba } from 'polished';
import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';
import { colors, styles } from '../../constants';

export type TagProps = {
  children: ReactNode;
  icon?: ReactNode;
  removable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
  style?: CSSProperties;
};

export default function Tag(props: TagProps) {
  const {
    children,
    icon,
    removable,
    selected,
    onClick,
    onRemove,
    className,
    style,
  } = props;

  const hasIcon = !!icon;
  const isRemovable = !!removable;
  const isSelected = !!selected;
  const isClickable = !!onClick;

  return (
    <Container
      role="option"
      aria-selected={isSelected}
      className={className}
      style={style}
    >
      <Content
        role="button"
        tabIndex={isClickable ? 0 : undefined}
        aria-disabled={!isClickable}
        onClick={onClick}
        $isClickable={isClickable}
        $isRemovable={isRemovable}
      >
        {hasIcon && <IconWrapper>{icon}</IconWrapper>}
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Content>
      {isRemovable && (
        <CloseButton
          aria-label="Remove"
          onClick={(event) => {
            event.stopPropagation();
            onRemove?.();
          }}
        >
          <CloseIcon />
        </CloseButton>
      )}
    </Container>
  );
}
Tag.displayName = 'Tag';

type ContentProps = {
  $hasIcon?: boolean;
  $isClickable?: boolean;
  $isRemovable?: boolean;
};

const Container = styled.div`
  ${styles.boxSizing}
  ${styles.typography}

  position: relative;
  display: inline-flex;
  font-size: 12px;
  line-height: 20px;
  border-radius: 9999px; // 確保任何大小都是圓角
  outline: 2px solid transparent;
  outline-offset: 2px;
  color: ${colors.white};
  transition: outline-color 100ms;

  &[aria-selected='true'] {
    outline-color: ${colors.primary500};
  }
`;
const Content = styled.div<ContentProps>`
  position: relative;
  display: flex;
  gap: 4px;
  padding: 0 10px;
  padding-left: ${(props) => props.$hasIcon && '8px'};
  padding-right: ${(props) => props.$isRemovable && '4px'};
  border-radius: ${(props) =>
    props.$isRemovable ? '9999px 0 0 9999px' : '9999px'};
  background-color: ${colors.grayscale700};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: background-color 100ms;
  }
  &[aria-disabled='false'] {
    cursor: pointer;

    &:hover {
      &::before {
        background-color: ${rgba(colors.white, 0.2)};
      }
    }
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ChildrenWrapper = styled.div`
  margin-left: auto;
`;
const RawButton = styled.button.attrs({ type: 'button' })`
  all: unset; // 移除按鈕預設樣式
  cursor: pointer;
`;
const CloseButton = styled(RawButton)`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px 0 4px;
  border-radius: 0 9999px 9999px 0;
  color: ${colors.white};
  background-color: ${colors.grayscale700};
  transition: background-color 100ms;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: background-color 100ms;
  }
  &:hover {
    &::before {
      background-color: ${rgba(colors.white, 0.2)};
    }
  }

  svg {
    width: 9px;
    height: 9px;
  }
`;

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9">
      <path
        d="M8.086 1.711L5.273 4.523l2.789 2.789c.234.211.234.563 0 .773-.211.234-.562.234-.773 0L4.477 5.297 1.688 8.086c-.211.234-.562.234-.773 0-.234-.211-.234-.563 0-.797L3.703 4.5.914 1.711C.68 1.5.68 1.148.914.914c.211-.211.562-.211.797 0L4.5 3.727 7.289.938c.211-.234.563-.234.797 0a.55.55 0 0 1 0 .773z"
        fill="currentColor"
      />
    </svg>
  );
}
