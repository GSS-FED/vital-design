import { ChevronDownIcon, ChevronUpIcon } from '@/icons/ChevronIcon';
import { cn } from '@/utils/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import type {
  ComponentPropsWithoutRef,
  MouseEvent,
  ReactNode,
} from 'react';

export type SplitButtonSize = 'medium' | 'large';
export type SplitButtonTheme = 'primary' | 'default';

export type SplitButtonProps = {
  disabled?: boolean;
  focusableWhenDisabled?: boolean;
  icon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  size?: SplitButtonSize;
  splitOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  theme?: SplitButtonTheme;
} & ComponentPropsWithoutRef<'div'>;

const SIZE_CONFIG = {
  medium: { iconSize: 12 },
  large: { iconSize: 14 },
} as const;

const splitButtonVariants = cva(
  [
    'inline-flex justify-center items-stretch overflow-hidden',
    'font-sans box-border',
    'focus-visible:shadow-focus-primary',
  ],
  {
    variants: {
      size: {
        medium: 'rounded-[var(--radius-lg)]',
        large:
          'rounded-[var(--radius-xl)] transition-all duration-150',
      },
      theme: {
        primary:
          'text-white bg-gradient-to-tr from-info-400 to-primary-500',
        default:
          'text-grayscale-800 bg-white border border-grayscale-300',
      },
      disabled: {
        true: 'opacity-60',
        false: '',
      },
    },
    compoundVariants: [
      {
        size: 'large',
        theme: 'primary',
        disabled: false,
        class:
          'shadow-button-primary hover:-translate-y-px active:translate-y-0 active:shadow-button-primary-active',
      },
      {
        size: 'large',
        theme: 'default',
        disabled: false,
        class:
          'shadow-base hover:-translate-y-px active:translate-y-0 active:shadow-button-primary-active',
      },
    ],
    defaultVariants: {
      size: 'medium',
      theme: 'default',
      disabled: false,
    },
  },
);

export type SplitButtonVariants = VariantProps<
  typeof splitButtonVariants
>;

export default function SplitButton(props: SplitButtonProps) {
  const {
    children,
    disabled = false,
    focusableWhenDisabled = false,
    icon,
    onClick,
    open,
    size = 'medium',
    splitOnClick,
    theme = 'default',
  } = props;

  const handleClick = disabled ? undefined : onClick;
  const handleSplitClick = disabled ? undefined : splitOnClick;

  const buttonDisabledProps =
    focusableWhenDisabled && disabled
      ? ({ 'aria-disabled': true, 'data-disabled': '' } as const)
      : ({ disabled } as const);

  const hasIcon = Boolean(icon);

  return (
    <div
      data-size={size}
      className={splitButtonVariants({ size, theme, disabled })}
    >
      {/* Main Button */}
      <button
        type="button"
        {...buttonDisabledProps}
        onClick={handleClick}
        className={cn(
          'relative w-fit font-sans box-border overflow-hidden',
          'transition-all duration-150 ease-in-out',
          size === 'medium' ? 'text-sm' : 'text-base',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          hasIcon ? 'py-[5px] pr-2 pl-3' : 'py-[5px] pr-2 pl-4',
          // Overlay effect
          'before:content-[""] before:absolute before:inset-0',
          'before:pointer-events-none before:opacity-0',
          'before:transition-all before:duration-150 before:z-[1]',
          'hover:not-disabled:not-data-[disabled]:before:bg-grayscale-100 hover:not-disabled:not-data-[disabled]:before:opacity-100',
          'active:not-disabled:not-data-[disabled]:before:bg-grayscale-200 active:not-disabled:not-data-[disabled]:before:opacity-100',
          // Divider line
          'after:content-[""] after:absolute after:top-0 after:right-0',
          'after:w-px after:h-full',
          theme === 'primary'
            ? 'after:bg-white/30'
            : 'after:bg-grayscale-200',
        )}
      >
        <div className="relative inline-flex justify-center items-center whitespace-nowrap gap-1 leading-5 z-[2]">
          {hasIcon && (
            <div
              className={cn(
                'relative flex items-center justify-center m-[3px] z-[2]',
                size === 'large' ? 'w-3.5 h-3.5' : 'w-3 h-3',
              )}
            >
              {icon}
            </div>
          )}
          {children}
        </div>
      </button>

      {/* Split Button (chevron) */}
      <button
        type="button"
        {...buttonDisabledProps}
        onClick={handleSplitClick}
        className={cn(
          'relative w-fit font-sans box-border overflow-hidden',
          'transition-all duration-150 ease-in-out',
          'py-1.5 pr-2 pl-1',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          // Overlay effect
          'before:content-[""] before:absolute before:inset-0',
          'before:pointer-events-none before:opacity-0',
          'before:transition-all before:duration-150 before:z-[1]',
          'hover:not-disabled:not-data-[disabled]:before:bg-grayscale-100 hover:not-disabled:not-data-[disabled]:before:opacity-100',
          'active:not-disabled:not-data-[disabled]:before:bg-grayscale-200 active:not-disabled:not-data-[disabled]:before:opacity-100',
        )}
      >
        <div
          className={cn(
            'relative flex items-center justify-center m-[3px] z-[2]',
            size === 'large' ? 'w-3.5 h-3.5' : 'w-3 h-3',
          )}
        >
          {open ? (
            <ChevronUpIcon width={SIZE_CONFIG[size].iconSize} />
          ) : (
            <ChevronDownIcon width={SIZE_CONFIG[size].iconSize} />
          )}
        </div>
      </button>
    </div>
  );
}
