import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/button/button-group/ButtonGroup';
import { ChevronDownIcon, ChevronUpIcon } from '@/icons/ChevronIcon';
import { cn } from '@/utils/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, MouseEvent } from 'react';

export type SplitButtonSize = 'medium' | 'large';
export type SplitButtonTheme = 'primary' | 'default';

export type SplitButtonProps = {
  disabled?: boolean;
  focusableWhenDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  size?: SplitButtonSize;
  splitOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  theme?: SplitButtonTheme;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>;

const SIZE_CONFIG = {
  medium: { iconSize: 12 },
  large: { iconSize: 14 },
} as const;

const splitButtonGroupVariants = cva(
  [
    'inline-flex justify-center items-stretch',
    'overflow-hidden font-sans box-border',
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
          'shadow-base hover:-translate-y-px active:translate-y-0 active:shadow-[0_2px_4px_rgba(35,35,50,0.08)]',
      },
    ],
    defaultVariants: {
      size: 'medium',
      theme: 'default',
      disabled: false,
    },
  },
);

const splitButtonSegmentVariants = cva(
  [
    'relative inline-flex items-center justify-center overflow-hidden rounded-[inherit]',
    'font-sans box-border transition-all duration-150 ease-in-out',
    'border-0 bg-transparent text-inherit',
    '[&_[data-icon]]:pointer-events-none [&_[data-icon]]:shrink-0',
    '[&_[data-icon]]:size-3 data-[size=large]:[&_[data-icon]]:size-3.5',
    'before:pointer-events-none before:absolute before:inset-0 before:content-[""]',
    'before:rounded-[inherit] before:opacity-0 before:transition-all before:duration-150 before:z-[1]',
    'hover:not-disabled:not-data-[disabled]:before:bg-grayscale-100 hover:not-disabled:not-data-[disabled]:before:opacity-100',
    'active:not-disabled:not-data-[disabled]:before:bg-grayscale-200 active:not-disabled:not-data-[disabled]:before:opacity-100',
  ],
  {
    variants: {
      size: {
        medium: 'h-[30px] text-sm',
        large: 'h-8 text-base',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'medium',
      disabled: false,
    },
  },
);

export type SplitButtonGroupVariants = VariantProps<
  typeof splitButtonGroupVariants
>;

export type SplitButtonSegmentVariants = VariantProps<
  typeof splitButtonSegmentVariants
>;

export function SplitButton(props: SplitButtonProps) {
  const {
    children,
    className,
    disabled = false,
    focusableWhenDisabled = false,
    onClick,
    open,
    size = 'medium',
    splitOnClick,
    style,
    theme = 'default',
    ...groupProps
  } = props;

  const handleClick = disabled ? undefined : onClick;
  const handleSplitClick = disabled ? undefined : splitOnClick;

  const buttonDisabledProps =
    focusableWhenDisabled && disabled
      ? ({ 'aria-disabled': true, 'data-disabled': '' } as const)
      : ({ disabled } as const);

  return (
    <ButtonGroup
      data-size={size}
      data-theme={theme}
      className={cn(
        splitButtonGroupVariants({ size, theme, disabled }),
        className,
      )}
      style={style}
      {...groupProps}
    >
      <button
        type="button"
        data-size={size}
        {...buttonDisabledProps}
        onClick={handleClick}
        className={cn(
          splitButtonSegmentVariants({ size, disabled }),
          'pl-4 pr-2 has-[_[data-icon=inline-start]]:pl-3 [&_[data-icon]]:m-0.75',
        )}
      >
        <span className="relative z-[2] inline-flex items-center justify-center gap-1 whitespace-nowrap leading-5">
          {children}
        </span>
      </button>

      <ButtonGroupSeparator
        className={cn(
          theme === 'primary' ? 'bg-white/30' : 'bg-grayscale-300',
        )}
      />

      <button
        type="button"
        data-size={size}
        {...buttonDisabledProps}
        onClick={handleSplitClick}
        aria-label={open ? 'Collapse options' : 'Expand options'}
        className={cn(
          splitButtonSegmentVariants({ size, disabled }),
          'pl-1 pr-2',
        )}
      >
        <div
          className={cn(
            'relative flex items-center justify-center m-[3px] z-[2]',
            size === 'large' ? 'w-3.5 h-3.5' : 'w-3 h-3',
          )}
        >
          {open ? (
            <ChevronUpIcon
              aria-hidden="true"
              data-icon="inline-end"
              width={SIZE_CONFIG[size].iconSize}
            />
          ) : (
            <ChevronDownIcon
              aria-hidden="true"
              data-icon="inline-end"
              width={SIZE_CONFIG[size].iconSize}
            />
          )}
        </div>
      </button>
    </ButtonGroup>
  );
}
