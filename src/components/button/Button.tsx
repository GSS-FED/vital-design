import { Children, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { overlayStyles } from 'src/components/button/styles';
import {
  COMMON_STYLES,
  FILLED_THEME_COLOR,
  SIZE_STYLE,
  TEXT_THEME_COLOR,
} from 'src/components/button/styles';
import {
  BasicButton,
  ContentWrapper,
  IconWrapper,
} from 'src/components/button/styles';
import {
  ButtonProps,
  ButtonSize,
  FilledButtonProps,
  IconPlacement,
  TextButtonProps,
} from 'src/components/button/types';
import { colors } from 'src/constants';
import { SpinnerIcon } from 'src/icons';

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = 'filled',
    size = 'medium',
    disabled = false,
    onClick,
    className,
    style,
    icon,
    iconPlacement,
    isLoading,
    ...rest
  } = props;

  const customAttributes = {
    'data-variant': variant,
    'data-size': size,
  };

  const hasChildren = Children.count(children) > 0;
  const hasIcon = Boolean(icon);

  if (props.variant === 'text') {
    const { theme = 'default' } = props;

    const handleClick = isLoading || disabled ? undefined : onClick;

    return (
      <TextButton
        $iconPlacement={iconPlacement}
        $isLoading={isLoading}
        $size={size}
        $theme={theme}
        className={className}
        data-loading={isLoading}
        disabled={disabled}
        onClick={handleClick}
        style={style}
        {...customAttributes}
        {...rest}
      >
        {isLoading ? (
          <IconWrapper size={size}>
            <SpinnerIcon
              width={SIZE_STYLE[size].iconSize}
              fill={TEXT_THEME_COLOR[theme].color.disabled}
            />
          </IconWrapper>
        ) : (
          <Content
            hasIcon={hasIcon}
            icon={icon}
            iconPlacement={iconPlacement}
            size={size}
          >
            {children}
          </Content>
        )}
      </TextButton>
    );
  }

  if (variant === 'filled') {
    const { theme = 'default' } = props;

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (disabled || isLoading) return;
      if (onClick) {
        onClick(event);
      }
    };
    return (
      <FilledButton
        $hasChildren={hasChildren}
        $hasIcon={hasIcon}
        $iconPlacement={iconPlacement}
        $isLoading={isLoading}
        $size={size}
        $theme={theme}
        className={className}
        data-loading={isLoading}
        disabled={disabled}
        onClick={handleClick}
        style={style}
        {...customAttributes}
        {...rest}
      >
        {isLoading ? (
          <IconWrapper size={size}>
            <SpinnerIcon
              width={SIZE_STYLE[size].iconSize}
              fill={FILLED_THEME_COLOR[theme].color.loading}
            />
          </IconWrapper>
        ) : (
          <Content
            hasIcon={hasIcon}
            icon={icon}
            iconPlacement={iconPlacement}
            size={size}
          >
            {children}
          </Content>
        )}
      </FilledButton>
    );
  }
}

Button.displayName = 'Button';

type StyledFilledButtonProps = {
  $theme: FilledButtonProps['theme'];
};

const FilledButton = styled(BasicButton)<StyledFilledButtonProps>`
  ${({
    $hasChildren,
    $hasIcon,
    $iconPlacement,
    $isLoading = false,
    $size,
    $theme = 'primary',
    disabled,
  }) => {
    const color = () => {
      if (disabled) return FILLED_THEME_COLOR[$theme].color.disabled;
      if ($isLoading) return FILLED_THEME_COLOR[$theme].color.loading;
      return FILLED_THEME_COLOR[$theme].color.default;
    };

    const isBordered = $theme === 'default' || $theme === 'dangerous';
    const isLargeSize = $size === 'large';
    const isMediumSizeBordered = $size === 'medium' && isBordered;

    const padding = () => {
      if ($isLoading || !$hasChildren)
        return isMediumSizeBordered ? '5px 12px' : '6px 12px';
      if (!$hasIcon) {
        return isMediumSizeBordered ? '4px 16px' : '5px 16px';
      }
      if ($iconPlacement === 'left') {
        return isMediumSizeBordered
          ? '4px 16px 4px 12px'
          : '5px 16px 5px 12px';
      }
      return isMediumSizeBordered
        ? '4px 12px 4px 16px'
        : '5px 12px 5px 16px';
    };

    return css`
      ${overlayStyles($isLoading)};
      background: ${FILLED_THEME_COLOR[$theme].background.default};
      border-radius: ${SIZE_STYLE[$size].borderRadius}px;
      color: ${color()};
      padding: ${padding()};

      ${isLargeSize &&
      css`
        box-shadow: ${FILLED_THEME_COLOR[$theme].boxShadow.default};

        ${!$isLoading &&
        css`
          &:hover:not(:disabled) {
            transform: translateY(-1px);
          }
          &:active:not(:disabled) {
            box-shadow: ${FILLED_THEME_COLOR[$theme].boxShadow
              .active};
            transform: translateY(0px);
            transition: ${COMMON_STYLES.transition.active};
          }
        `};
      `};

      ${isMediumSizeBordered &&
      css`
        border: 1px solid ${colors.grayscale300};
      `};

      ${!isBordered &&
      (disabled || $isLoading) &&
      css`
        opacity: 0.6;
      `};

      &:focus-visible {
        box-shadow: ${FILLED_THEME_COLOR[$theme].boxShadow.focus};
      }
    `;
  }}
`;

type StyledTextButtonProps = {
  $theme: TextButtonProps['theme'];
  $iconPlacement: ButtonProps['iconPlacement'];
};

const TextButton = styled(BasicButton)<StyledTextButtonProps>`
  ${({ $theme = 'primary' }) => css`
    color: ${TEXT_THEME_COLOR[$theme].color.default};

    &:hover:not(:disabled) {
      color: ${TEXT_THEME_COLOR[$theme].color.hover};
    }

    &:disabled {
      color: ${TEXT_THEME_COLOR[$theme].color.disabled};
    }

    &:active:not(:disabled) {
      color: ${TEXT_THEME_COLOR[$theme].color.active};
    }

    &:focus-visible {
      box-shadow: ${TEXT_THEME_COLOR[$theme].boxShadow.focus};
    }
  `};
`;

type ContentProps = {
  children: ReactNode;
  hasIcon: boolean;
  icon?: ReactNode;
  iconPlacement?: IconPlacement;
  size: ButtonSize;
};

function Content(props: ContentProps) {
  const { size, icon, children, iconPlacement, hasIcon } = props;

  return (
    <ContentWrapper size={size}>
      {hasIcon && iconPlacement === 'left' && (
        <IconWrapper size={size}>{icon}</IconWrapper>
      )}
      {children}
      {hasIcon && iconPlacement === 'right' && (
        <IconWrapper size={size}>{icon}</IconWrapper>
      )}
    </ContentWrapper>
  );
}
