import { rgba } from 'polished';
import { CSSProperties, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors, styles } from 'src/constants';

type Color =
  | 'default'
  | 'teal'
  | 'olive'
  | 'brown'
  | 'rose'
  | 'indigo'
  | 'blue'
  | 'green'
  | 'gold'
  | 'red'
  | 'purple'
  | 'navy';

type ColorVariant = 'solid' | 'tint';

export type TagProps = {
  color?: Color;
  colorVariant?: ColorVariant;
  children: ReactNode;
  icon?: ReactNode;
  removable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
  style?: CSSProperties;
};

const COLOR_PALETTE: Record<
  Color,
  Record<ColorVariant, { color: string; backgroundColor: string }>
> = {
  default: {
    solid: {
      color: colors.white,
      backgroundColor: colors.grayscale700,
    },
    tint: {
      color: colors.grayscale700,
      backgroundColor: colors.grayscale200,
    },
  },
  teal: {
    solid: {
      color: colors.white,
      backgroundColor: '#057C7F',
    },
    tint: {
      color: '#057C7F',
      backgroundColor: '#EBFAF9',
    },
  },
  olive: {
    solid: {
      color: colors.white,
      backgroundColor: '#597D10',
    },
    tint: {
      color: '#597D10',
      backgroundColor: '#F5FAEB',
    },
  },
  brown: {
    solid: {
      color: colors.white,
      backgroundColor: '#AD5E0B',
    },
    tint: {
      color: '#AD5E0B',
      backgroundColor: '#FEF7F0',
    },
  },
  rose: {
    solid: {
      color: colors.white,
      backgroundColor: '#901957',
    },
    tint: {
      color: '#901957',
      backgroundColor: '#FEF5F9',
    },
  },
  indigo: {
    solid: {
      color: colors.white,
      backgroundColor: '#5A51AE',
    },
    tint: {
      color: '#5A51AE',
      backgroundColor: '#EDF2FD',
    },
  },
  blue: {
    solid: {
      color: colors.white,
      backgroundColor: '#0576BD',
    },
    tint: {
      color: '#0576BD',
      backgroundColor: '#EBF9FF',
    },
  },
  green: {
    solid: {
      color: colors.white,
      backgroundColor: '#0A8518',
    },
    tint: {
      color: '#0A8518',
      backgroundColor: '#E7FFEA',
    },
  },
  gold: {
    solid: {
      color: colors.white,
      backgroundColor: '#7B7312',
    },
    tint: {
      color: '#7B7312',
      backgroundColor: '#F8F6EB',
    },
  },
  red: {
    solid: {
      color: colors.white,
      backgroundColor: '#B93025',
    },
    tint: {
      color: '#B93025',
      backgroundColor: '#FFF4F3',
    },
  },
  purple: {
    solid: {
      color: colors.white,
      backgroundColor: '#641559',
    },
    tint: {
      color: '#641559',
      backgroundColor: '#F9F3FB',
    },
  },
  navy: {
    solid: {
      color: colors.white,
      backgroundColor: '#185273',
    },
    tint: {
      color: '#185273',
      backgroundColor: '#F0F6FA',
    },
  },
};

export default function Tag(props: TagProps) {
  const {
    children,
    icon,
    removable,
    selected,
    onClick,
    onRemove,
    color = 'default',
    colorVariant = 'solid',
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
      color={color}
      colorVariant={colorVariant}
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

const Container = styled.div<{
  color: Color;
  colorVariant: ColorVariant;
}>`
  ${({ color, colorVariant }) => css`
    ${styles.boxSizing};
    ${styles.typography};

    position: relative;
    display: inline-flex;
    font-size: 12px;
    line-height: 20px;
    border-radius: 9999px; // 確保任何大小都是圓角
    outline: 2px solid transparent;
    outline-offset: 2px;
    color: ${COLOR_PALETTE[color][colorVariant].color};
    background-color: ${COLOR_PALETTE[color][colorVariant]
      .backgroundColor};
    transition: outline-color 100ms;

    &[aria-selected='true'] {
      outline-color: ${colors.primary500};
    }
  `}
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
