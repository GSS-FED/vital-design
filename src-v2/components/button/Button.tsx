import { cn } from '@/lib/utils';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
} from 'react';

export type ButtonSize = 'md' | 'lg' | 'icon-md' | 'icon-lg';

export type ButtonTheme =
  | 'primary'
  | 'default'
  | 'success'
  | 'info'
  | 'warning'
  | 'alarm'
  | 'dangerous';

export type FilledButtonProps = {
  variant?: 'filled';
  theme?: ButtonTheme;
};

export type TextButtonProps = {
  variant: 'text';
  theme?: Exclude<ButtonTheme, 'dangerous'>;
};

type BaseButtonProps = Omit<
  ComponentPropsWithoutRef<typeof BaseButton>,
  'className' | 'children'
>;

export type ButtonProps = {
  children?: ReactNode;
  className?: string;
  size?: ButtonSize;
} & (FilledButtonProps | TextButtonProps) &
  BaseButtonProps;

const BUTTON_BASE_CLASSES = [
  'relative inline-flex w-fit items-center justify-center overflow-hidden font-sans box-border select-none',
  'transition-all duration-150 ease-in-out',
  'disabled:pointer-events-none',
  '[&_[data-icon]]:relative [&_[data-icon]]:z-[2] [&_[data-icon]]:m-0.75 [&_[data-icon]]:pointer-events-none [&_[data-icon]]:shrink-0',
  '[&_[data-icon]]:size-3 data-[size=lg]:[&_[data-icon]]:size-3.5 data-[size=icon-lg]:[&_[data-icon]]:size-3.5',
] as const;

const OVERLAY_CLASSES = [
  'before:content-[""] before:absolute before:inset-0',
  'before:rounded-[inherit] before:pointer-events-none before:opacity-0',
  'before:transition-all before:duration-150 before:z-[1]',
  'hover:not-disabled:not-data-[disabled]:before:bg-grayscale-100 hover:not-disabled:not-data-[disabled]:before:opacity-100',
  'active:not-disabled:not-data-[disabled]:before:bg-grayscale-200 active:not-disabled:not-data-[disabled]:before:opacity-100',
] as const;

const buttonVariants = cva(BUTTON_BASE_CLASSES, {
  variants: {
    variant: {
      filled: '',
      text: '',
    },
    size: {
      md: 'text-sm rounded-[var(--radius-lg)]',
      lg: 'h-8 text-base rounded-[var(--radius-xl)]',
      'icon-md': 'h-[30px] text-sm rounded-[var(--radius-lg)]',
      'icon-lg': 'h-8 text-base rounded-[var(--radius-xl)]',
    },
    theme: {
      primary: '',
      default: '',
      success: '',
      info: '',
      warning: '',
      alarm: '',
      dangerous: '',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-pointer',
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      size: 'md',
      class: 'h-[30px]',
    },
    {
      variant: 'text',
      size: 'md',
      class: 'h-7',
    },
    {
      variant: 'filled',
      size: ['md', 'lg'],
      class:
        'px-4 has-[_[data-icon=inline-start]]:pl-3 has-[_[data-icon=inline-end]]:pr-3',
    },
    {
      variant: 'filled',
      size: ['icon-md', 'icon-lg'],
      class: 'px-3',
    },
    {
      variant: 'text',
      size: ['md', 'lg', 'icon-md', 'icon-lg'],
      class: 'px-0',
    },
    {
      variant: 'filled',
      theme: 'primary',
      class:
        'text-white bg-[image:var(--gradient-primary-button)] focus-visible:shadow-focus-primary',
    },
    {
      variant: 'filled',
      theme: 'default',
      class:
        'text-grayscale-800 bg-white focus-visible:shadow-focus-primary disabled:text-grayscale-300 data-[disabled]:text-grayscale-300',
    },
    {
      variant: 'filled',
      theme: 'success',
      class:
        'text-white bg-success-500 focus-visible:shadow-focus-success',
    },
    {
      variant: 'filled',
      theme: 'info',
      class: 'text-white bg-info-500 focus-visible:shadow-focus-info',
    },
    {
      variant: 'filled',
      theme: 'warning',
      class:
        'text-white bg-warning-500 focus-visible:shadow-focus-warning',
    },
    {
      variant: 'filled',
      theme: 'alarm',
      class:
        'text-white bg-alarm-500 focus-visible:shadow-focus-alarm',
    },
    {
      variant: 'filled',
      theme: 'dangerous',
      class:
        'text-alarm-500 bg-white focus-visible:shadow-focus-alarm disabled:text-alarm-100 data-[disabled]:text-alarm-100',
    },
    {
      variant: 'filled',
      size: ['md', 'icon-md'],
      theme: ['default', 'dangerous'],
      class: 'border border-grayscale-300',
    },
    {
      variant: 'filled',
      theme: ['primary', 'success', 'info', 'warning', 'alarm'],
      disabled: true,
      class: 'opacity-60',
    },
    {
      variant: 'text',
      theme: 'primary',
      class:
        'text-primary-500 hover:not-disabled:not-data-[disabled]:text-primary-400 active:not-disabled:not-data-[disabled]:text-primary-600 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-primary',
    },
    {
      variant: 'text',
      theme: 'default',
      class:
        'text-grayscale-800 hover:not-disabled:not-data-[disabled]:text-grayscale-700 active:not-disabled:not-data-[disabled]:text-grayscale-800 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-primary',
    },
    {
      variant: 'text',
      theme: 'success',
      class:
        'text-success-500 hover:not-disabled:not-data-[disabled]:text-success-400 active:not-disabled:not-data-[disabled]:text-success-600 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-success',
    },
    {
      variant: 'text',
      theme: 'info',
      class:
        'text-info-500 hover:not-disabled:not-data-[disabled]:text-info-400 active:not-disabled:not-data-[disabled]:text-info-600 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-info',
    },
    {
      variant: 'text',
      theme: 'warning',
      class:
        'text-warning-500 hover:not-disabled:not-data-[disabled]:text-warning-400 active:not-disabled:not-data-[disabled]:text-warning-600 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-warning',
    },
    {
      variant: 'text',
      theme: 'alarm',
      class:
        'text-alarm-500 hover:not-disabled:not-data-[disabled]:text-alarm-400 active:not-disabled:not-data-[disabled]:text-alarm-600 disabled:text-grayscale-300 data-[disabled]:text-grayscale-300 focus-visible:shadow-focus-alarm',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: 'primary',
      class: 'shadow-button-primary',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: 'success',
      class: 'shadow-button-success',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: 'info',
      class: 'shadow-button-info',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: 'warning',
      class: 'shadow-button-warning',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: 'alarm',
      class: 'shadow-button-alarm',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: ['default', 'dangerous'],
      class: 'shadow-base',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: 'primary',
      disabled: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-button-primary-active',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: 'success',
      disabled: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-button-success-active',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: 'info',
      disabled: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-button-info-active',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: 'warning',
      disabled: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-button-warning-active',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: 'alarm',
      disabled: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-button-alarm-active',
    },
    {
      variant: 'filled',
      size: ['lg', 'icon-lg'],
      theme: ['default', 'dangerous'],
      disabled: false,
      class:
        'hover:not-disabled:not-data-[disabled]:-translate-y-px active:not-disabled:not-data-[disabled]:translate-y-0 active:not-disabled:not-data-[disabled]:shadow-[0_2px_4px_rgba(35,35,50,0.08)]',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    size: 'md',
    theme: 'primary',
    disabled: false,
  },
});

const Button = forwardRef<ElementRef<typeof BaseButton>, ButtonProps>(
  function Button(props, ref) {
    const {
      children,
      className,
      disabled = false,
      focusableWhenDisabled,
      onClick,
      size = 'md',
      theme: themeProp,
      type = 'button',
      variant: variantProp,
      ...buttonProps
    } = props;
    const variant = variantProp ?? 'filled';
    const theme =
      themeProp ?? (variant === 'text' ? 'default' : 'primary');
    const isDisabled = Boolean(disabled);

    return (
      <BaseButton
        ref={ref}
        type={type}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        disabled={disabled}
        focusableWhenDisabled={focusableWhenDisabled}
        onClick={isDisabled ? undefined : onClick}
        className={cn(
          buttonVariants({
            variant,
            size,
            theme,
            disabled: isDisabled,
          }),
          variant === 'filled' && !isDisabled && OVERLAY_CLASSES,
          className,
        )}
        {...buttonProps}
      >
        <span
          data-slot="button-content"
          className="relative z-[2] inline-flex items-center justify-center gap-1 whitespace-nowrap leading-5"
        >
          {children}
        </span>
      </BaseButton>
    );
  },
);

export { Button };
