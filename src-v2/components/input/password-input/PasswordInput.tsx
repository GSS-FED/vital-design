import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/input/input-group/InputGroup';
import { EyeIcon } from '@/icons/EyeIcon';
import { EyeSlashIcon } from '@/icons/EyeSlashIcon';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/* ---------------------------------- Types --------------------------------- */
export type PasswordInputProps = {
  'aria-invalid'?: ComponentPropsWithoutRef<'input'>['aria-invalid'];
  className?: string;
  placeholder?: string;
  prefix?: ReactNode;
  initiallyVisible?: boolean;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  style?: ComponentPropsWithoutRef<'div'>['style'];
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
};

/* ---------------------------------- Component --------------------------------- */
export function PasswordInput(props: PasswordInputProps) {
  const {
    'aria-invalid': ariaInvalid,
    className,
    value,
    defaultValue,
    placeholder,
    initiallyVisible = false,
    prefix,
    style,
    onChange,
    onEnter,
    disabled = false,
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
        data-state={passwordVisible ? 'visible' : 'invisible'}
        data-testid="password-input"
        aria-invalid={ariaInvalid}
        defaultValue={defaultValue}
        disabled={disabled}
        onInput={(event) => onChange?.(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onEnter?.(event.currentTarget.value);
          }
        }}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <InputGroupAddon align="inline-end">
        <VisibilityToggle
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
  disabled,
  onClick,
  children,
}: {
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
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
