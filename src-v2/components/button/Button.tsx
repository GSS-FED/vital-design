import { SpinnerIcon } from '@/icons/SpinnerIcon';
import { cn } from '@/utils/cn';
import { Button as BaseButton } from '@base-ui/react/button';
import { type VariantProps, cva } from 'class-variance-authority';
import { Children } from 'react';
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

export type ButtonSize = 'medium' | 'large';

export type IconPlacement = 'left' | 'right';

export type CommonButton = {
  size?: ButtonSize;
} & ComponentPropsWithoutRef<'button'>;

export type FilledButtonProps = {
  variant?: 'filled';
  theme?:
    | 'primary'
    | 'default'
    | 'success'
    | 'info'
    | 'warning'
    | 'alarm'
    | 'dangerous';
};

export type TextButtonProps = {
  variant?: 'text';
  theme?:
    | 'primary'
    | 'default'
    | 'success'
    | 'info'
    | 'warning'
    | 'alarm';
};

export type ButtonProps = {
  size?: ButtonSize;
  className?: string;
  style?: CSSProperties;
  icon?: ReactNode;
  iconPlacement?: IconPlacement;
  isLoading?: boolean;
  focusableWhenDisabled?: boolean;
} & (FilledButtonProps | TextButtonProps) &
  ComponentPropsWithoutRef<'button'>;

const SIZE_CONFIG = {
  medium: { iconSize: 12 },
  large: { iconSize: 14 },
} as const;

const BUTTON_BASE_CLASSES = [
  'relative inline-flex items-center justify-center w-fit font-sans box-border overflow-hidden',
  'transition-all duration-150 ease-in-out',
] as const;

// CVA for text button spinner
const textSpinnerVariants = cva(
  'relative flex items-center justify-center m-[3px] z-[2] text-grayscale-300',
  {
    variants: {
      size: {
        medium: 'w-3 h-3',
        large: 'w-3.5 h-3.5',
      },
    },
    defaultVariants: { size: 'medium' },
  },
);

// CVA for filled button variant
const filledButtonVariants = cva(BUTTON_BASE_CLASSES, {
  variants: {
    size: {
      medium: 'h-[30px] text-sm rounded-[var(--radius-lg)]',
      large: 'h-8 text-base rounded-[var(--radius-xl)]',
    },
    theme: {
      primary:
        'text-white bg-[image:var(--gradient-primary-button)] focus-visible:shadow-focus-primary',
      default:
        'text-grayscale-800 bg-white focus-visible:shadow-focus-primary disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 data-[loading=true]:text-grayscale-300',
      success:
        'text-white bg-success-500 focus-visible:shadow-focus-success',
      info: 'text-white bg-info-500 focus-visible:shadow-focus-info',
      warning:
        'text-white bg-warning-500 focus-visible:shadow-focus-warning',
      alarm:
        'text-white bg-alarm-500 focus-visible:shadow-focus-alarm',
      dangerous:
        'text-alarm-500 bg-white focus-visible:shadow-focus-alarm disabled:text-alarm-100 data-[disabled]:text-alarm-100 data-[loading=true]:text-alarm-100',
    },
    isLoading: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // Medium size border for default/dangerous
    {
      size: 'medium',
      theme: ['default', 'dangerous'],
      class: 'border border-grayscale-300',
    },
    // Large size shadow (applies regardless of loading state)
    {
      size: 'large',
      theme: 'primary',
      class: 'shadow-button-primary',
    },
    {
      size: 'large',
      theme: 'success',
      class: 'shadow-button-success',
    },
    { size: 'large', theme: 'info', class: 'shadow-button-info' },
    {
      size: 'large',
      theme: 'warning',
      class: 'shadow-button-warning',
    },
    { size: 'large', theme: 'alarm', class: 'shadow-button-alarm' },
    {
      size: 'large',
      theme: ['default', 'dangerous'],
      class: 'shadow-base',
    },
    // Large size lift effect (only when not loading)
    {
      size: 'large',
      theme: 'primary',
      isLoading: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-button-primary-active',
    },
    {
      size: 'large',
      theme: 'success',
      isLoading: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-button-success-active',
    },
    {
      size: 'large',
      theme: 'info',
      isLoading: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-button-info-active',
    },
    {
      size: 'large',
      theme: 'warning',
      isLoading: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-button-warning-active',
    },
    {
      size: 'large',
      theme: 'alarm',
      isLoading: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-button-alarm-active',
    },
    {
      size: 'large',
      theme: ['default', 'dangerous'],
      isLoading: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-[0_2px_4px_rgba(35,35,50,0.08)]',
    },
  ],
  defaultVariants: {
    size: 'medium',
    theme: 'primary',
    isLoading: false,
  },
});

// CVA for text button variant
const textButtonVariants = cva(BUTTON_BASE_CLASSES, {
  variants: {
    size: {
      medium: 'h-7 text-sm rounded-[var(--radius-lg)]',
      large: 'h-8 text-base rounded-[var(--radius-xl)]',
    },
    theme: {
      primary:
        'text-primary-500 hover:not-disabled:not-data-[disabled]:text-primary-400 active:not-disabled:not-data-[disabled]:text-primary-600 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-primary',
      default:
        'text-grayscale-800 hover:not-disabled:not-data-[disabled]:text-grayscale-700 active:not-disabled:not-data-[disabled]:text-grayscale-800 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-primary',
      success:
        'text-success-500 hover:not-disabled:not-data-[disabled]:text-success-400 active:not-disabled:not-data-[disabled]:text-success-600 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-success',
      info: 'text-info-500 hover:not-disabled:not-data-[disabled]:text-info-400 active:not-disabled:not-data-[disabled]:text-info-600 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-info',
      warning:
        'text-warning-500 hover:not-disabled:not-data-[disabled]:text-warning-400 active:not-disabled:not-data-[disabled]:text-warning-600 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-warning',
      alarm:
        'text-alarm-500 hover:not-disabled:not-data-[disabled]:text-alarm-400 active:not-disabled:not-data-[disabled]:text-alarm-600 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-alarm',
    },
  },
  defaultVariants: {
    size: 'medium',
    theme: 'default',
  },
});

// Overlay classes for hover/active effects on filled buttons
const OVERLAY_CLASSES = [
  'before:content-[""] before:absolute before:inset-0',
  'before:rounded-[inherit] before:pointer-events-none before:opacity-0',
  'before:transition-all before:duration-150 before:z-[1]',
  'hover:not-disabled:not-data-[disabled]:before:bg-grayscale-100 hover:not-disabled:not-data-[disabled]:before:opacity-100',
  'active:not-disabled:not-data-[disabled]:before:bg-grayscale-200 active:not-disabled:not-data-[disabled]:before:opacity-100',
];

export type FilledButtonVariants = VariantProps<
  typeof filledButtonVariants
>;
export type TextButtonVariants = VariantProps<
  typeof textButtonVariants
>;
export type TextSpinnerVariants = VariantProps<
  typeof textSpinnerVariants
>;

export default function Button(props: ButtonProps) {
  const {
    children,
    size = 'medium',
    disabled = false,
    onClick,
    className,
    style,
    icon,
    iconPlacement,
    isLoading,
    focusableWhenDisabled,
    ...rest
  } = props;

  const hasChildren = Children.count(children) > 0;
  const hasIcon = Boolean(icon);
  const handleClick = disabled || isLoading ? undefined : onClick;

  // Text variant
  if (props.variant === 'text') {
    const { theme = 'default' } = props;

    return (
      <BaseButton
        type="button"
        data-variant="text"
        data-size={size}
        data-loading={isLoading}
        disabled={disabled}
        focusableWhenDisabled={focusableWhenDisabled}
        onClick={handleClick}
        className={cn(
          textButtonVariants({ size, theme }),
          (isLoading || disabled) && 'cursor-not-allowed',
          !isLoading && !disabled && 'cursor-pointer',
          className,
        )}
        style={style}
        {...rest}
      >
        {isLoading ? (
          <div className={textSpinnerVariants({ size })}>
            <SpinnerIcon width={SIZE_CONFIG[size].iconSize} />
          </div>
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
      </BaseButton>
    );
  }

  // Filled variant
  const { theme = 'primary' } = props as FilledButtonProps &
    typeof props;

  const isBordered = theme === 'default' || theme === 'dangerous';

  // Calculate padding based on state (vertical centering handled by inline-flex items-center)
  const getPaddingClass = () => {
    if (isLoading || !hasChildren) {
      return 'px-3';
    }
    if (!hasIcon) {
      return 'px-4';
    }
    if (iconPlacement === 'left') {
      return 'pr-4 pl-3';
    }
    return 'pl-4 pr-3';
  };

  return (
    <BaseButton
      type="button"
      data-variant="filled"
      data-size={size}
      data-loading={isLoading}
      disabled={disabled}
      focusableWhenDisabled={focusableWhenDisabled}
      onClick={handleClick}
      className={cn(
        filledButtonVariants({ size, theme, isLoading: !!isLoading }),
        getPaddingClass(),
        // Overlay effect for hover/active
        !isLoading && OVERLAY_CLASSES,
        // Disabled/loading opacity for non-bordered themes
        !isBordered && (disabled || isLoading) && 'opacity-60',
        // Cursor
        (isLoading || disabled) && 'cursor-not-allowed',
        !isLoading && !disabled && 'cursor-pointer',
        className,
      )}
      style={style}
      {...rest}
    >
      {isLoading ? (
        <IconWrapper size={size}>
          <SpinnerIcon width={SIZE_CONFIG[size].iconSize} />
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
    </BaseButton>
  );
}

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
    <div className="relative inline-flex justify-center items-center whitespace-nowrap gap-1 leading-5 z-2">
      {hasIcon && iconPlacement === 'left' && (
        <IconWrapper size={size}>{icon}</IconWrapper>
      )}
      {children}
      {hasIcon && iconPlacement === 'right' && (
        <IconWrapper size={size}>{icon}</IconWrapper>
      )}
    </div>
  );
}

function IconWrapper({
  size,
  children,
  className,
}: {
  size: ButtonSize;
  children: ReactNode;
  className?: string;
}) {
  const sizeClass = size === 'large' ? 'w-3.5 h-3.5' : 'w-3 h-3';
  return (
    <div
      className={cn(
        'relative flex items-center justify-center m-0.75 z-2',
        sizeClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
