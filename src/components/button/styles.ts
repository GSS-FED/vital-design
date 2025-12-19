import styled, { css } from 'styled-components';
import {
  ButtonSize,
  IconPlacement,
} from 'src/components/button/types';
import { styles } from 'src/constants';
import { colors } from 'src/constants';

// Button 元件樣式常數
export const SIZE_STYLE = {
  medium: {
    height: 28,
    gap: 4,
    fontSize: 14,
    iconSize: 12,
    iconMargin: 3,
    borderRadius: 15,
  },
  large: {
    height: 32,
    gap: 4,
    fontSize: 16,
    iconSize: 14,
    iconMargin: 3,
    borderRadius: 16,
  },
} as const;

// 共用的樣式常數
export const COMMON_STYLES = {
  transition: {
    default: 'all 150ms ease-in-out',
    active: 'all 50ms ease-in-out',
  },
  boxShadow: {
    default: '0 6px 10px',
    active: '0 2px 4px',
    focus: '0 0 0 2px',
  },
} as const;

export const FILLED_THEME_COLOR = {
  primary: {
    color: {
      default: colors.white,
      disabled: colors.white + 'cc',
      loading: colors.white,
    },
    background: {
      default: 'linear-gradient(45deg,#33CFFF 0%,#0E86FE 100%)',
    },
    boxShadow: {
      default: `${COMMON_STYLES.boxShadow.default} ${colors.primary500}4D`,
      active: `${COMMON_STYLES.boxShadow.active} ${colors.primary500}66`,
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.primary200}`,
    },
  },
  warning: {
    color: {
      default: colors.white,
      disabled: colors.white + 'cc',
      loading: colors.white,
    },
    background: {
      default: colors.warning500,
    },
    boxShadow: {
      default: `${COMMON_STYLES.boxShadow.default} ${colors.warning500}4D`,
      active: `${COMMON_STYLES.boxShadow.active} ${colors.warning500}66`,
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.warning200}`,
    },
  },
  info: {
    color: {
      default: colors.white,
      disabled: colors.white + 'cc',
      loading: colors.white,
    },
    background: {
      default: colors.info500,
    },
    boxShadow: {
      default: `${COMMON_STYLES.boxShadow.default} ${colors.info500}4D`,
      active: `${COMMON_STYLES.boxShadow.active} ${colors.info500}66`,
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.info200}`,
    },
  },
  success: {
    color: {
      default: colors.white,
      disabled: colors.white + 'cc',
      loading: colors.white,
    },
    background: {
      default: colors.success500,
    },
    boxShadow: {
      default: `${COMMON_STYLES.boxShadow.default} ${colors.success500}4D`,
      active: `${COMMON_STYLES.boxShadow.active} ${colors.success500}66`,
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.success200}`,
    },
  },
  alarm: {
    color: {
      default: colors.white,
      disabled: colors.white + 'cc',
      loading: colors.white,
    },
    background: {
      default: colors.alarm500,
    },
    boxShadow: {
      default: `${COMMON_STYLES.boxShadow.default} ${colors.alarm500}4D`,
      active: `${COMMON_STYLES.boxShadow.active} ${colors.alarm500}66`,
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.alarm200}`,
    },
  },
  dangerous: {
    color: {
      default: colors.alarm500,
      disabled: colors.alarm100,
      loading: colors.alarm100,
    },
    background: {
      default: colors.white,
    },
    boxShadow: {
      default: `${COMMON_STYLES.boxShadow.default} ${colors.grayscale200}`,
      active: `${COMMON_STYLES.boxShadow.active} ${colors.grayscale200}`,
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.alarm200}`,
    },
  },
  default: {
    color: {
      default: colors.grayscale800,
      disabled: colors.grayscale300,
      loading: colors.grayscale300,
    },

    background: {
      default: colors.white,
    },
    boxShadow: {
      default: `${COMMON_STYLES.boxShadow.default} ${colors.grayscale200}`,
      active: `${COMMON_STYLES.boxShadow.active} ${colors.grayscale200}`,
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.primary200}`,
    },
  },
} as const;

export const SPLIT_THEME_COLOR = {
  primary: {
    color: {
      default: colors.white,
      disabled: colors.white + 'cc',
    },
    background: {
      default: 'linear-gradient(45deg,#33CFFF 0%,#0E86FE 100%)',
    },
    boxShadow: {
      default: `${COMMON_STYLES.boxShadow.default} ${colors.primary500}4D`,
      active: `${COMMON_STYLES.boxShadow.active} ${colors.primary500}66`,
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.primary200}`,
    },
  },
  default: {
    color: {
      default: colors.grayscale800,
      disabled: colors.grayscale300,
    },
    background: {
      default: colors.white,
    },
    boxShadow: {
      default: `${COMMON_STYLES.boxShadow.default} ${colors.grayscale200}`,
      active: `${COMMON_STYLES.boxShadow.active} ${colors.grayscale200}`,
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.primary200}`,
    },
  },
} as const;

export const TEXT_THEME_COLOR = {
  primary: {
    color: {
      default: colors.primary500,
      hover: colors.primary400,
      active: colors.primary600,
      disabled: colors.grayscale300,
    },
    boxShadow: {
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.primary200}`,
    },
  },
  warning: {
    color: {
      default: colors.warning500,
      hover: colors.warning400,
      active: colors.warning600,
      disabled: colors.grayscale300,
    },
    boxShadow: {
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.warning200}`,
    },
  },
  info: {
    color: {
      default: colors.info500,
      hover: colors.info400,
      active: colors.info600,
      disabled: colors.grayscale300,
    },
    boxShadow: {
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.info200}`,
    },
  },
  success: {
    color: {
      default: colors.success500,
      hover: colors.success400,
      active: colors.success600,
      disabled: colors.grayscale300,
    },
    boxShadow: {
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.success200}`,
    },
  },
  alarm: {
    color: {
      default: colors.alarm500,
      hover: colors.alarm400,
      active: colors.alarm600,
      disabled: colors.grayscale300,
    },
    boxShadow: {
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.alarm200}`,
    },
  },
  default: {
    color: {
      default: colors.grayscale800,
      hover: colors.grayscale700,
      active: colors.grayscale800,
      disabled: colors.grayscale300,
    },
    boxShadow: {
      focus: `${COMMON_STYLES.boxShadow.focus} ${colors.primary200}`,
    },
  },
} as const;

// 覆蓋背景層樣式。用於 hover 時降低背景顏色彩度
export const overlayStyles = (isLoading: boolean) =>
  !isLoading &&
  css`
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      opacity: 0;
      transition: ${COMMON_STYLES.transition.default};
      z-index: 1;
    }
    &:hover:not(:disabled) {
      &::before {
        background-color: ${colors.grayscale100};
        opacity: 1;
      }
    }

    &:active:not(:disabled) {
      &::before {
        background-color: ${colors.grayscale200};
        opacity: 1;
      }
    }
  `;

type BasicButtonProps = {
  $hasChildren?: boolean;
  $hasIcon?: boolean;
  $iconPlacement?: IconPlacement;
  $isLoading?: boolean;
  $size: ButtonSize;
  disabled: boolean;
};

export const BasicButton = styled.button<BasicButtonProps>`
  ${({ disabled, $size, $isLoading: $loading }) => {
    return css`
      all: unset;
      ${styles.boxSizing};
      ${styles.typography};

      position: relative;
      width: fit-content;
      font-size: ${SIZE_STYLE[$size].fontSize}px;
      cursor: ${disabled ? 'default' : 'pointer'};
      transition: ${COMMON_STYLES.transition.default};
      overflow: hidden;

      ${($loading || disabled) &&
      css`
        cursor: not-allowed;
      `}
    `;
  }}
`;

type IconWrapperProps = {
  size: ButtonSize;
};

export const IconWrapper = styled.div<IconWrapperProps>`
  ${({ size }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${SIZE_STYLE[size].iconMargin}px;
    width: ${SIZE_STYLE[size].iconSize}px;
    height: ${SIZE_STYLE[size].iconSize}px;
    z-index: 2; /* 防止文字被 Overlay */
  `};
`;

type ContentWrapperProps = {
  size: ButtonSize;
};

export const ContentWrapper = styled.div<ContentWrapperProps>`
  ${({ size }) => css`
    position: relative;
    display: inline-flex;
    justity-content: center;
    align-items: center;
    white-space: nowrap;
    gap: ${SIZE_STYLE[size].gap}px;
    line-height: 20px;
    z-index: 2; /* 防止文字被 Overlay */
  `};
`;
