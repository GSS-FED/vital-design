import { DisabledIcon } from '@/icons/DisabledIcon';
import { UserIcon } from '@/icons/UserIcon';
import { cn } from '@/lib/utils';
import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ReactNode,
} from 'react';

export type AvatarSize = AvatarVariants['size'];
export type AvatarColor = AvatarVariants['color'];

const avatarVariants = cva(
  [
    'relative inline-flex items-center justify-center',
    'aspect-square rounded-full overflow-hidden',
    'font-sans box-border p-0 align-middle',
    '[&_img]:w-full [&_img]:h-full [&_img]:object-cover',
  ],
  {
    variants: {
      size: {
        xs: 'w-6 text-xs [&_[data-slot=avatar-placeholder-icon]]:size-2.5',
        sm: 'w-8 text-base [&_[data-slot=avatar-placeholder-icon]]:size-3',
        md: 'w-10 text-xl [&_[data-slot=avatar-placeholder-icon]]:size-4',
        lg: 'w-12 text-2xl [&_[data-slot=avatar-placeholder-icon]]:size-4.5',
        xl: 'w-[60px] text-[32px] [&_[data-slot=avatar-placeholder-icon]]:size-6',
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
      disabled: {
        true: 'cursor-not-allowed',
        false: '',
      },
      clickable: {
        true: 'cursor-pointer focus-visible:outline-none focus-visible:shadow-focus-primary',
        false: '',
      },
    },
    compoundVariants: [
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
      disabled: false,
      clickable: false,
    },
  },
);

const fallbackVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      color: {
        default: 'text-grayscale-600',
        tiffany: 'text-avatar-tiffany-fg',
        green: 'text-avatar-green-fg',
        orange: 'text-avatar-orange-fg',
        pink: 'text-avatar-pink-fg',
        blue: 'text-avatar-blue-fg',
        sky: 'text-avatar-sky-fg',
        purple: 'text-avatar-purple-fg',
        'light-gold': 'text-avatar-light-gold-fg',
        salmon: 'text-avatar-salmon-fg',
        ice: 'text-avatar-ice-fg',
        lavender: 'text-avatar-lavender-fg',
      },
    },
    defaultVariants: { color: 'default' },
  },
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;
export type FallbackVariants = VariantProps<typeof fallbackVariants>;

type BaseAvatarRootProps = Omit<
  ComponentPropsWithoutRef<typeof BaseAvatar.Root>,
  'children' | 'className' | 'color'
>;

export type AvatarRootProps = BaseAvatarRootProps & {
  children?: ReactNode;
  className?: string;
  color?: AvatarColor;
  bordered?: boolean;
  disabled?: boolean;
  size?: AvatarSize;
};

export type AvatarImageProps = Omit<
  ComponentPropsWithoutRef<typeof BaseAvatar.Image>,
  'className'
> & {
  className?: string;
};

export type AvatarFallbackProps = Omit<
  ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>,
  'className' | 'color'
> & {
  className?: string;
  color?: AvatarColor;
};

export type AvatarProps = Omit<AvatarRootProps, 'children'> & {
  name?: string;
  alt?: string;
  src?: string;
  fallback?: ReactNode;
  onLoadingStatusChange?: AvatarImageProps['onLoadingStatusChange'];
};

const AvatarRoot = forwardRef<
  ComponentRef<typeof BaseAvatar.Root>,
  AvatarRootProps
>(function AvatarRoot(props, ref) {
  const {
    children,
    className,
    color = 'default',
    bordered = true,
    disabled = false,
    size = 'md',
    onClick,
    render,
    ...rootProps
  } = props;
  const isClickable = Boolean(onClick) && !disabled;

  return (
    <BaseAvatar.Root
      {...rootProps}
      ref={ref}
      data-slot="avatar"
      data-size={size}
      data-disabled={disabled ? '' : undefined}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      render={
        render ?? (isClickable ? <button type="button" /> : undefined)
      }
      className={cn(
        avatarVariants({
          size,
          color,
          bordered,
          disabled,
          clickable: isClickable,
        }),
        className,
      )}
    >
      {children}
    </BaseAvatar.Root>
  );
});

const AvatarImage = forwardRef<
  ComponentRef<typeof BaseAvatar.Image>,
  AvatarImageProps
>(function AvatarImage(props, ref) {
  const { className, ...imageProps } = props;

  return (
    <BaseAvatar.Image
      {...imageProps}
      ref={ref}
      data-slot="avatar-image"
      className={cn('h-full w-full object-cover', className)}
    />
  );
});

const AvatarFallback = forwardRef<
  ComponentRef<typeof BaseAvatar.Fallback>,
  AvatarFallbackProps
>(function AvatarFallback(props, ref) {
  const { className, color = 'default', ...fallbackProps } = props;

  return (
    <BaseAvatar.Fallback
      {...fallbackProps}
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(fallbackVariants({ color }), className)}
    />
  );
});

function getInitials(name: string | undefined) {
  return name
    ?.trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

function Avatar(props: AvatarProps) {
  const {
    name,
    alt = 'Avatar',
    color = 'default',
    disabled = false,
    size = 'md',
    src,
    fallback,
    onLoadingStatusChange,
    ...rootProps
  } = props;
  const initials = getInitials(name);

  return (
    <AvatarRoot
      {...rootProps}
      color={color}
      disabled={disabled}
      size={size}
    >
      <AvatarImage
        src={src}
        alt={alt}
        onLoadingStatusChange={onLoadingStatusChange}
      />
      <AvatarFallback color={color} delay={300}>
        {fallback ?? initials ?? (
          <UserIcon data-slot="avatar-placeholder-icon" />
        )}
      </AvatarFallback>
      {disabled && (
        <span
          data-slot="avatar-disabled-overlay"
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 inline-flex items-center justify-center text-white',
            'before:absolute before:inset-0 before:bg-grayscale-500 before:content-[""]',
            '[&_svg]:absolute [&_svg]:inset-1/2 [&_svg]:w-3/4 [&_svg]:-translate-x-1/2 [&_svg]:-translate-y-1/2',
          )}
        >
          <DisabledIcon />
        </span>
      )}
    </AvatarRoot>
  );
}

export { Avatar, AvatarFallback, AvatarImage, AvatarRoot };
