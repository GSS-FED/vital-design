import type React from 'react';
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

export type SplitButtonTheme = 'primary' | 'default';

export type SplitButtonProps = {
  disabled?: boolean;
  focusableWhenDisabled?: boolean;
  icon?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  size?: ButtonSize;
  splitOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  theme?: SplitButtonTheme;
} & ComponentPropsWithoutRef<'div'>;
