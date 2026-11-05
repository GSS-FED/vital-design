import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/input/input-group/InputGroup';
import { EyeIcon } from '@/icons/EyeIcon';
import { EyeSlashIcon } from '@/icons/EyeSlashIcon';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ComponentRef,
  ReactNode,
  Ref,
} from 'react';

/* ---------------------------------- Types --------------------------------- */
export type PasswordInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  | 'className'
  | 'defaultValue'
  | 'onChange'
  | 'prefix'
  | 'style'
  | 'type'
  | 'value'
> & {
  /** Applied to the InputGroup shell, not the inner `<input>`. */
  className?: string;
  /** Applied to the InputGroup shell, not the inner `<input>`. */
  style?: CSSProperties;
  prefix?: ReactNode;
  initiallyVisible?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  /** Accessible name of the toggle while the password is hidden. */
  showPasswordLabel?: string;
  /** Accessible name of the toggle while the password is visible. */
  hidePasswordLabel?: string;
};

/* ---------------------------------- Component --------------------------------- */
export function PasswordInput({
  ref,
  ...props
}: PasswordInputProps & {
  ref?: Ref<ComponentRef<'input'>>;
}) {
  const {
    className,
    value,
    defaultValue,
    initiallyVisible = false,
    prefix,
    style,
    onChange,
    onEnter,
    onInput,
    onKeyDown,
    disabled = false,
    showPasswordLabel = 'Show password',
    hidePasswordLabel = 'Hide password',
    ...inputProps
  } = props;

  const [passwordVisible, setPasswordVisible] =
    useState(initiallyVisible);
  const type = passwordVisible ? 'text' : 'password';

  return (
    <InputGroup
      data-slot="password-input"
      className={cn('w-full', className)}
      style={style}
    >
      {prefix !== null && prefix !== undefined && (
        <InputGroupAddon>{prefix}</InputGroupAddon>
      )}
      <InputGroupInput
        data-testid="password-input"
        {...inputProps}
        ref={ref}
        data-state={passwordVisible ? 'visible' : 'invisible'}
        disabled={disabled}
        onInput={(event) => {
          onInput?.(event);
          onChange?.(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key === 'Enter') {
            onEnter?.(event.currentTarget.value);
          }
        }}
        type={type}
        {...(value !== undefined ? { value } : { defaultValue })}
      />
      <InputGroupAddon align="inline-end">
        <VisibilityToggle
          aria-label={
            passwordVisible ? hidePasswordLabel : showPasswordLabel
          }
          disabled={disabled}
          onClick={() => setPasswordVisible((visible) => !visible)}
        >
          {passwordVisible ? <EyeIcon /> : <EyeSlashIcon />}
        </VisibilityToggle>
      </InputGroupAddon>
    </InputGroup>
  );
}

/* --------------------------------- Components --------------------------------- */
function VisibilityToggle({
  'aria-label': ariaLabel,
  disabled,
  onClick,
  children,
}: {
  'aria-label': string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      data-slot="password-input-toggle"
      data-testid="visibility-toggle"
      disabled={disabled}
      onClick={onClick}
      className="flex h-5 w-5 items-center justify-center transition-colors duration-200 hover:text-grayscale-opacity-700 disabled:cursor-not-allowed disabled:text-grayscale-opacity-300"
    >
      {children}
    </button>
  );
}
