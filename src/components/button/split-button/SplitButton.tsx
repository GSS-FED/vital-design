import { Children } from 'react';
import styled, { css } from 'styled-components';
import {
  BasicButton,
  COMMON_STYLES,
  ContentWrapper,
  IconWrapper,
  SIZE_STYLE,
  SPLIT_THEME_COLOR,
  overlayStyles,
} from 'src/components/button/styles';
import {
  ButtonSize,
  SplitButtonProps,
  SplitButtonTheme,
} from 'src/components/button/types';
import { colors } from 'src/constants';
import { ChevronDownIcon, ChevronUpIcon } from 'src/icons';

const getColor = ({
  isDisabled,
  theme,
}: {
  isDisabled: boolean;
  theme: SplitButtonTheme;
}) => {
  return isDisabled
    ? SPLIT_THEME_COLOR[theme].color.disabled
    : SPLIT_THEME_COLOR[theme].color.default;
};

export default function SplitButton(props: SplitButtonProps) {
  const {
    children,
    disabled = false,
    icon,
    onClick,
    open,
    size = 'medium',
    splitOnClick,
    theme = 'default',
  } = props;

  const customAttributes = {
    'data-size': size,
  };

  const handleClick = disabled ? undefined : onClick;
  const handleSplitClick = disabled ? undefined : splitOnClick;

  const hasChildren = Children.count(children) > 0;
  const hasIcon = Boolean(icon);

  return (
    <SplitContainer $size={size} $theme={theme} disabled={disabled}>
      <SplitMainButton
        $hasChildren={hasChildren}
        $hasIcon={hasIcon}
        $size={size}
        $theme={theme}
        disabled={disabled}
        onClick={handleClick}
        {...customAttributes}
      >
        <ContentWrapper size={size}>
          {hasIcon && <IconWrapper size={size}>{icon}</IconWrapper>}
          {children}
        </ContentWrapper>
      </SplitMainButton>
      <SplitSecondaryButton
        $size={size}
        disabled={disabled}
        onClick={handleSplitClick}
        {...customAttributes}
      >
        <IconWrapper size={size}>
          {open ? (
            <ChevronUpIcon
              width={SIZE_STYLE[size].iconSize}
              color={getColor({ isDisabled: disabled, theme: theme })}
            />
          ) : (
            <ChevronDownIcon
              width={SIZE_STYLE[size].iconSize}
              color={getColor({ isDisabled: disabled, theme: theme })}
            />
          )}
        </IconWrapper>
      </SplitSecondaryButton>
    </SplitContainer>
  );
}

type SplitContainerProps = {
  $size: ButtonSize;
  $theme: SplitButtonProps['theme'];
  disabled: boolean;
};

const SplitContainer = styled.div<SplitContainerProps>`
  ${({ $size, $theme = 'default', disabled }) => {
    const isLargeSize = $size === 'large';
    const isMediumSizeBordered =
      $size === 'medium' && $theme === 'default';

    return css`
      display: inline-flex;
      justify-content: center;
      align-items: stretch;
      color: ${getColor({ isDisabled: disabled, theme: $theme })};
      background: ${SPLIT_THEME_COLOR[$theme].background.default};
      border-radius: ${SIZE_STYLE[$size].borderRadius}px;
      overflow: hidden;

      ${isLargeSize &&
      css`
        box-shadow: ${SPLIT_THEME_COLOR[$theme].boxShadow.default};
        transition: ${COMMON_STYLES.transition.default};
        ${!disabled &&
        css`
          &:hover:not(:disabled) {
            transform: translateY(-1px);
          }
          &:active:not(:disabled) {
            box-shadow: ${SPLIT_THEME_COLOR[$theme].boxShadow.active};
            transition: ${COMMON_STYLES.transition.active};
            transform: translateY(0px);
          }
        `}
      `};

      ${isMediumSizeBordered &&
      css`
        border: 1px solid ${colors.grayscale300};
      `};

      ${disabled &&
      css`
        opacity: 0.6;
      `};

      &:focus-visible {
        box-shadow: ${SPLIT_THEME_COLOR[$theme].boxShadow.focus};
      }
    `;
  }};
`;

type SplitMainButtonProps = {
  $theme: SplitButtonProps['theme'];
  $hasIcon: boolean;
};

const SplitMainButton = styled(BasicButton)<SplitMainButtonProps>`
  ${({ $theme = 'default', $hasIcon }) => css`
    ${overlayStyles(false)};
    padding: 5px 8px 5px ${$hasIcon ? 12 : 16}px;

    /* 分割線 */
    &::after {
      content: '';
      position: absolute;
      inset: 0 0 auto auto;
      width: 1px;
      height: 100%;
      background-color: ${$theme === 'primary'
        ? `${colors.white}4D`
        : colors.grayscale200};
    }
  `}
`;

const SplitSecondaryButton = styled(BasicButton)`
  ${overlayStyles(false)};
  padding: 6px 8px 6px 4px;
`;
