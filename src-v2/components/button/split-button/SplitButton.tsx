import { Button } from '@/components/button/Button';
import type { ButtonTheme } from '@/components/button/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/button/button-group/ButtonGroup';
import { ChevronDownIcon, ChevronUpIcon } from '@/icons/ChevronIcon';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, MouseEvent } from 'react';

export type SplitButtonSize = 'medium' | 'large';
export type SplitButtonTheme = ButtonTheme;

export type SplitButtonProps = {
  disabled?: boolean;
  focusableWhenDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  size?: SplitButtonSize;
  splitOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  theme?: SplitButtonTheme;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>;

const SPLIT_BUTTON_SEGMENT_CLASSES = [
  '[&>[data-slot=button]]:bg-transparent!',
  '[&>[data-slot=button]]:bg-none!',
  '[&>[data-slot=button]]:border-0!',
  '[&>[data-slot=button]]:shadow-none!',
  '[&>[data-slot=button]]:opacity-100!',
  '[&>[data-slot=button]:hover]:translate-y-0!',
  '[&>[data-slot=button]:active]:translate-y-0!',
  '[&>[data-slot=button]:active]:shadow-none!',
] as const;

const splitButtonGroupVariants = cva(
  [
    'inline-flex items-stretch overflow-hidden font-sans box-border',
    ...SPLIT_BUTTON_SEGMENT_CLASSES,
  ],
  {
    variants: {
      size: {
        medium: 'rounded-[var(--radius-lg)]',
        large:
          'rounded-[var(--radius-xl)] transition-all duration-150',
      },
      theme: {
        primary: 'bg-[image:var(--gradient-primary-button)]',
        success: 'bg-success-500',
        info: 'bg-info-500',
        warning: 'bg-warning-500',
        alarm: 'bg-alarm-500',
        default: 'bg-white',
        dangerous: 'bg-white',
      },
      disabled: {
        true: 'opacity-60',
        false: '',
      },
    },
    compoundVariants: [
      {
        theme: ['default', 'dangerous'],
        class: 'border border-grayscale-300',
      },
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
      {
        size: 'large',
        theme: 'alarm',
        class: 'shadow-button-alarm',
      },
      {
        size: 'large',
        theme: ['default', 'dangerous'],
        class: 'shadow-base',
      },
      {
        size: 'large',
        disabled: false,
        class: 'hover:-translate-y-px active:translate-y-0',
      },
      {
        size: 'large',
        theme: 'primary',
        disabled: false,
        class: 'active:shadow-button-primary-active',
      },
      {
        size: 'large',
        theme: 'success',
        disabled: false,
        class: 'active:shadow-button-success-active',
      },
      {
        size: 'large',
        theme: 'info',
        disabled: false,
        class: 'active:shadow-button-info-active',
      },
      {
        size: 'large',
        theme: 'warning',
        disabled: false,
        class: 'active:shadow-button-warning-active',
      },
      {
        size: 'large',
        theme: 'alarm',
        disabled: false,
        class: 'active:shadow-button-alarm-active',
      },
      {
        size: 'large',
        theme: ['default', 'dangerous'],
        disabled: false,
        class: 'active:shadow-[0_2px_4px_rgba(35,35,50,0.08)]',
      },
    ],
    defaultVariants: {
      size: 'medium',
      theme: 'default',
      disabled: false,
    },
  },
);

const LIGHT_SEPARATOR_THEMES = new Set<SplitButtonTheme>([
  'primary',
  'success',
  'info',
  'warning',
  'alarm',
]);

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

  const ChevronIcon = open ? ChevronUpIcon : ChevronDownIcon;
  const splitSize = size === 'large' ? 'icon-large' : 'icon-medium';

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
      <Button
        variant="filled"
        theme={theme}
        size={size}
        disabled={disabled}
        focusableWhenDisabled={focusableWhenDisabled}
        onClick={onClick}
        className="pr-2 has-[_[data-icon=inline-start]]:pl-3"
      >
        {children}
      </Button>
      <ButtonGroupSeparator
        className={cn(
          LIGHT_SEPARATOR_THEMES.has(theme)
            ? 'bg-white/30'
            : 'bg-grayscale-300',
        )}
      />
      <Button
        variant="filled"
        theme={theme}
        size={splitSize}
        disabled={disabled}
        focusableWhenDisabled={focusableWhenDisabled}
        onClick={splitOnClick}
        aria-label={open ? 'Collapse options' : 'Expand options'}
        className="pl-1 pr-2"
      >
        <ChevronIcon aria-hidden="true" data-icon="inline-end" />
      </Button>
    </ButtonGroup>
  );
}
