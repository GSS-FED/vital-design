import { DisabledIcon } from '@/icons/DisabledIcon';
import { UserIcon } from '@/icons/UserIcon';
import { cn } from '@/utils/cn';
import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { type VariantProps, cva } from 'class-variance-authority';
import { type ReactNode } from 'react';
import type React from 'react';

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

const avatarVariants = cva(
  // Base classes
  [
    'inline-flex justify-center items-center relative',
    'aspect-square rounded-full overflow-hidden',
    'font-sans box-border',
    '[&_img]:w-full [&_img]:h-full [&_img]:object-cover',
  ],
  {
    variants: {
      size: {
        xs: 'w-6 text-xs',
        sm: 'w-8 text-base',
        md: 'w-10 text-xl',
        lg: 'w-12 text-2xl',
        xl: 'w-[60px] text-[32px]',
      },
      color: {
        default: 'bg-grayscale-100',
        tiffany: 'bg-avatar-tiffany-bg',
        green: 'bg-avatar-green-bg',
        orange: 'bg-avatar-orange-bg',
        pink: 'bg-avatar-pink-bg',
        blue: 'bg-avatar-blue-bg',
        sky: 'bg-avatar-sky-bg',
        purple: 'bg-avatar-purple-bg',
        'light-gold': 'bg-avatar-light-gold-bg',
        salmon: 'bg-avatar-salmon-bg',
        ice: 'bg-avatar-ice-bg',
        lavender: 'bg-avatar-lavender-bg',
      },
      bordered: {
        true: 'border',
        false: 'border border-transparent',
      },
    },
    compoundVariants: [
      // Border colors when bordered
      {
        color: 'default',
        bordered: true,
        class: 'border-border',
      },
      {
        color: 'tiffany',
        bordered: true,
        class: 'border-avatar-tiffany-border',
      },
      {
        color: 'green',
        bordered: true,
        class: 'border-avatar-green-border',
      },
      {
        color: 'orange',
        bordered: true,
        class: 'border-avatar-orange-border',
      },
      {
        color: 'pink',
        bordered: true,
        class: 'border-avatar-pink-border',
      },
      {
        color: 'blue',
        bordered: true,
        class: 'border-avatar-blue-border',
      },
      {
        color: 'sky',
        bordered: true,
        class: 'border-avatar-sky-border',
      },
      {
        color: 'purple',
        bordered: true,
        class: 'border-avatar-purple-border',
      },
      {
        color: 'light-gold',
        bordered: true,
        class: 'border-avatar-light-gold-border',
      },
      {
        color: 'salmon',
        bordered: true,
        class: 'border-avatar-salmon-border',
      },
      {
        color: 'ice',
        bordered: true,
        class: 'border-avatar-ice-border',
      },
      {
        color: 'lavender',
        bordered: true,
        class: 'border-avatar-lavender-border',
      },
    ],
    defaultVariants: {
      size: 'md',
      color: 'default',
      bordered: true,
    },
  },
);

// CVA for fallback text colors
const fallbackVariants = cva(
  'inline-flex justify-center items-center',
  {
    variants: {
      color: {
        default: 'text-grayscale-600',
        tiffany: 'text-avatar-tiffany-color',
        green: 'text-avatar-green-color',
        orange: 'text-avatar-orange-color',
        pink: 'text-avatar-pink-color',
        blue: 'text-avatar-blue-color',
        sky: 'text-avatar-sky-color',
        purple: 'text-avatar-purple-color',
        'light-gold': 'text-avatar-light-gold-color',
        salmon: 'text-avatar-salmon-color',
        ice: 'text-avatar-ice-color',
        lavender: 'text-avatar-lavender-color',
      },
    },
    defaultVariants: { color: 'default' },
  },
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;
export type FallbackVariants = VariantProps<typeof fallbackVariants>;

export function Avatar(props: AvatarProps) {
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

  const iconSize =
    Math.round(SIZE[size] * 0.4) - (Math.round(SIZE[size] * 0.4) % 2);

  return (
    <BaseAvatar.Root
      style={style}
      onClick={(event) => onClick?.(event)}
      className={cn(avatarVariants({ size, color, bordered }))}
    >
      <BaseAvatar.Image
        src={src}
        alt={alt}
        onLoadingStatusChange={onLoadingStatusChange}
        className="w-full h-full object-cover"
      />
      <BaseAvatar.Fallback
        delay={300}
        className={fallbackVariants({ color })}
      >
        {fallback ? (
          fallback
        ) : name ? (
          fallbackNameFormater(name)
        ) : (
          <UserIcon width={iconSize} />
        )}
      </BaseAvatar.Fallback>
      {disabled && (
        <div
          className={cn(
            'inline-flex justify-center items-center absolute inset-0 text-white',
            'before:content-[""] before:absolute before:inset-0 before:bg-grayscale-500',
            '[&_svg]:absolute [&_svg]:inset-1/2 [&_svg]:w-3/4 [&_svg]:-translate-x-1/2 [&_svg]:-translate-y-1/2',
          )}
        >
          <DisabledIcon />
        </div>
      )}
    </BaseAvatar.Root>
  );
}
