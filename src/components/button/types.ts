import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';
import { SIZE_STYLE } from 'src/components/button/styles';

export type ButtonSize = keyof typeof SIZE_STYLE;

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
} & (FilledButtonProps | TextButtonProps) &
  ComponentPropsWithoutRef<'button'>;

export type SplitButtonTheme = 'primary' | 'default';

export type SplitButtonProps = {
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  size?: ButtonSize;
  splitOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  theme?: SplitButtonTheme;
} & ComponentPropsWithoutRef<'div'>;
