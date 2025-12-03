import * as RadixAvatar from '@radix-ui/react-avatar';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'src/constants';
import { styles } from 'src/constants';
import { UserIcon } from 'src/icons';
import { COLOR_PALETTES } from './AvatarConstants';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Color =
  | 'default'
  | 'tiffany'
  | 'green'
  | 'orange'
  | 'pink'
  | 'blue'
  | 'sky'
  | 'purple'
  | 'light-gold'
  | 'salmon'
  | 'ice'
  | 'lavender';

export type AvatarProps = {
  name?: string;
  alt?: string;
  color?: Color;
  bordered?: boolean;
  disabled?: boolean;
  size?: AvatarSize;
  src?: string;
  style?: React.CSSProperties;
  fallback?: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  onLoadingStatusChange?: (
    status: 'idle' | 'loading' | 'loaded' | 'error',
  ) => void;
};

const SIZE = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 60,
};
const FONT_SIZE = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export default function Avatar(props: AvatarProps) {
  const {
    name,
    alt = 'Avatar',
    color = 'default',
    bordered = true,
    disabled = false,
    size = 'md',
    src,
    style,
    fallback,
    onClick,
    onLoadingStatusChange,
  } = props;

  const fallbackNameFormater = (name: AvatarProps['name']) => {
    const splitName = name
      ?.split(' ')
      .map((value) => value.toUpperCase());
    const sliceName = splitName?.slice(0, 2);
    const formedName = sliceName?.reduce(
      (acc, current) => acc + current[0],
      '',
    );
    return formedName;
  };

  return (
    <AvatarRoot
      style={style}
      onClick={(event) => onClick?.(event)}
      $size={size}
      $color={color}
      $bordered={bordered}
    >
      <AvatarImage
        src={src}
        alt={alt}
        onLoadingStatusChange={onLoadingStatusChange}
      />
      <Fallback delayMs={300} $size={size} $color={color}>
        {fallback ? (
          fallback
        ) : name ? (
          fallbackNameFormater(name)
        ) : (
          <UserIcon
            width={
              // 避免奇數比例爆版
              Math.round(SIZE[size] * 0.4) -
              (Math.round(SIZE[size] * 0.4) % 2)
            }
            fill={COLOR_PALETTES[color].color}
          />
        )}
      </Fallback>
      {disabled && (
        <DisabledWrapper>
          <DisabledIcon />
        </DisabledWrapper>
      )}
    </AvatarRoot>
  );
}

const AvatarImage = styled(RadixAvatar.Image)``;
const Fallback = styled(RadixAvatar.Fallback)<{
  $size: AvatarSize;
  $color: Color;
}>`
  ${({ $size, $color }) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: ${COLOR_PALETTES[$color].color};
    font-size: ${FONT_SIZE[$size]}px;
  `}
`;

const AvatarRoot = styled(RadixAvatar.Root)<{
  $size: AvatarSize;
  $bordered: boolean;
  $color: Color;
}>`
  ${({ $size, $bordered, $color }) => css`
    ${styles.boxSizing};
    ${styles.typography};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: ${SIZE[$size]}px;
    aspect-ratio: 1;
    border: ${$bordered
      ? COLOR_PALETTES[$color].border
      : '1px solid transparent'};
    border-radius: 50%;
    background: ${COLOR_PALETTES[$color].background};
    overflow: hidden;

    ${AvatarImage},img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `};
`;

const DisabledWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${colors.grayscale500};
  }

  svg {
    position: absolute;
    inset: 50% auto auto 50%;
    width: 75%;
    transform: translate(-50%, -50%);
  }
`;

function DisabledIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 42 42"
      fill={colors.white}
    >
      <path
        d="M42 21C42 32.6484 32.5664 42 21 42C9.35156 42 0 32.6484 0 21C0 9.43359 9.35156 0 21 0C32.5664 0 42 9.43359 42 21ZM7.54687 10.418C5.25 13.3711 3.9375 17.0625 3.9375 21C3.9375 30.4336 11.5664 38.0625 21 38.0625C24.9375 38.0625 28.6289 36.75 31.582 34.4531L7.54687 10.418ZM38.0625 21C38.0625 11.6484 30.3516 3.9375 21 3.9375C16.9805 3.9375 13.2891 5.33203 10.3359 7.62891L34.3711 31.6641C36.668 28.7109 38.0625 25.0195 38.0625 21Z"
        fill="white"
      />
    </svg>
  );
}
