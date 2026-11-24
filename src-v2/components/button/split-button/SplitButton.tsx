import { Button } from '@/components/button/Button';
import type { ButtonProps } from '@/components/button/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/button/button-group/ButtonGroup';
import { AngleDownIcon } from '@/icons/AngleDownIcon';
import { AngleDownSolidIcon } from '@/icons/AngleDownSolidIcon';
import { AngleUpIcon } from '@/icons/AngleUpIcon';
import { AngleUpSolidIcon } from '@/icons/AngleUpSolidIcon';
import { type CvaProps, cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, MouseEvent } from 'react';

const SPLIT_BUTTON_SEGMENT_CLASSES = [
  '[&>[data-slot=button]]:bg-transparent!',
  '[&>[data-slot=button]]:bg-none!',
  '[&>[data-slot=button]]:border-0!',
  '[&>[data-slot=button]]:shadow-none!',
  '[&>[data-slot=button]]:opacity-100!',
  // The group clips Button's focus ring, so segments keep the browser outline.
  '[&>[data-slot=button]:focus-visible]:[outline-style:auto]!',
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
        md: 'rounded-[var(--radius-lg)]',
        lg: 'rounded-[var(--radius-xl)] transition-all duration-150',
      },
      theme: {
        primary: 'bg-[image:var(--gradient-primary-button)]',
        success: 'bg-success-500',
        info: 'bg-info-500',
        warning: 'bg-warning-500',
        alarm: 'bg-destructive-500',
        default: 'bg-background',
        dangerous: 'bg-background',
      },
      disabled: {
        true: 'opacity-60',
        false: '',
      },
    },
    compoundVariants: [
      {
        theme: ['default', 'dangerous'],
        class: 'border border-grayscale-opacity-300',
      },
      {
        size: 'lg',
        theme: 'primary',
        class: 'shadow-button-primary',
      },
      {
        size: 'lg',
        theme: 'success',
        class: 'shadow-button-success',
      },
      { size: 'lg', theme: 'info', class: 'shadow-button-info' },
      {
        size: 'lg',
        theme: 'warning',
        class: 'shadow-button-warning',
      },
      {
        size: 'lg',
        theme: 'alarm',
        class: 'shadow-button-destructive',
      },
      {
        size: 'lg',
        theme: ['default', 'dangerous'],
        class: 'shadow-base',
      },
      {
        size: 'lg',
        disabled: false,
        class: 'hover:-translate-y-px active:translate-y-0',
      },
      {
        size: 'lg',
        theme: 'primary',
        disabled: false,
        class: 'active:shadow-button-primary-active',
      },
      {
        size: 'lg',
        theme: 'success',
        disabled: false,
        class: 'active:shadow-button-success-active',
      },
      {
        size: 'lg',
        theme: 'info',
        disabled: false,
        class: 'active:shadow-button-info-active',
      },
      {
        size: 'lg',
        theme: 'warning',
        disabled: false,
        class: 'active:shadow-button-warning-active',
      },
      {
        size: 'lg',
        theme: 'alarm',
        disabled: false,
        class: 'active:shadow-button-destructive-active',
      },
      {
        size: 'lg',
        theme: ['default', 'dangerous'],
        disabled: false,
        class: 'active:shadow-[0_2px_4px_rgba(35,35,50,0.08)]',
      },
    ],
    defaultVariants: {
      size: 'md',
      theme: 'default',
      disabled: false,
    },
  },
);

export type SplitButtonVariants = Omit<
  VariantProps<typeof splitButtonGroupVariants>,
  'disabled'
>;

export type SplitButtonSize = NonNullable<
  SplitButtonVariants['size']
>;
export type SplitButtonTheme = NonNullable<
  SplitButtonVariants['theme']
>;

export type SplitButtonProps = {
  disabled?: boolean;
  focusableWhenDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Shows the chevron in its open state. Optional when `splitRender` is a
   * popup trigger, which reports its own open state.
   */
  open?: boolean;
  splitOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Renders the chevron segment as another element, such as
   * `<DropdownMenuTrigger />`, so it opens a popup and anchors it.
   */
  splitRender?: ButtonProps['render'];
  /**
   * Accessible name of the chevron segment. Defaults to `More options`, or to
   * `Expand options` / `Collapse options` when `open` is set.
   */
  splitLabel?: string;
} & CvaProps<SplitButtonVariants> &
  Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>;

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
    size = 'md',
    splitOnClick,
    splitLabel,
    splitRender,
    style,
    theme = 'default',
    ...groupProps
  } = props;

  const solid = LIGHT_SEPARATOR_THEMES.has(theme);
  const DownIcon = solid ? AngleDownSolidIcon : AngleDownIcon;
  const UpIcon = solid ? AngleUpSolidIcon : AngleUpIcon;
  const splitSize = size === 'lg' ? 'icon-lg' : 'icon-md';

  return (
    <div
      data-slot="split-button"
      data-size={size}
      data-theme={theme}
      className={cn('contents', className)}
      style={style}
      {...groupProps}
    >
      <ButtonGroup
        className={cn(
          splitButtonGroupVariants({ size, theme, disabled }),
        )}
      >
        <Button
          variant="default"
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
              : 'bg-grayscale-opacity-300',
          )}
        />
        <Button
          variant="default"
          theme={theme}
          size={splitSize}
          disabled={disabled}
          focusableWhenDisabled={focusableWhenDisabled}
          onClick={splitOnClick}
          render={splitRender}
          aria-label={
            splitLabel ??
            (open === undefined
              ? 'More options'
              : open
                ? 'Collapse options'
                : 'Expand options')
          }
          {...(open ? { 'data-popup-open': '' } : {})}
          className="group/split pl-1 pr-2"
        >
          <DownIcon
            aria-hidden="true"
            data-icon="inline-end"
            className="group-data-[popup-open]/split:hidden"
          />
          <UpIcon
            aria-hidden="true"
            data-icon="inline-end"
            className="hidden group-data-[popup-open]/split:block"
          />
        </Button>
      </ButtonGroup>
    </div>
  );
}
