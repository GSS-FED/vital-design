import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/input/input-group/InputGroup';
import { EyeIcon } from '@/icons/EyeIcon';
import { EyeSlashIcon } from '@/icons/EyeSlashIcon';
import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/* ---------------------------------- Types --------------------------------- */
export type PasswordInputProps = {
  className?: string;
  width?: string;
  placeholder?: string;
  prefix?: ReactNode;
  initiallyVisible?: boolean;
  value: string;
  disabled?: boolean;
  isError?: boolean;
  style?: CSSProperties;
  onChange: (value: string) => void;
  onEnter?: (value: string) => void;
};

/* ---------------------------------- Component --------------------------------- */
export function PasswordInput(props: PasswordInputProps) {
  const {
    className,
    width,
    value,
    placeholder,
    initiallyVisible = false,
    prefix,
    style,
    onChange,
    onEnter,
    isError,
    disabled = false,
  } = props;

  const [passwordVisible, setPasswordVisible] =
    useState(initiallyVisible);
  const type = passwordVisible ? 'text' : 'password';

  return (
    <InputGroup
      className={className}
      disabled={disabled}
      isError={isError}
      style={{ width: width ?? '100%', ...style }}
    >
      {prefix !== null && prefix !== undefined && (
        <InputGroupAddon>{prefix}</InputGroupAddon>
      )}
      <InputGroupInput
        data-state={passwordVisible ? 'visible' : 'invisible'}
        data-testid="password-input"
        aria-invalid={isError ? true : undefined}
        disabled={disabled}
        onInput={(event) => onChange(event.currentTarget.value)}
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
      data-testid="visibility-toggle"
      disabled={disabled}
      onClick={onClick}
      className="flex h-5 w-5 items-center justify-center transition-colors duration-200 hover:text-grayscale-700 disabled:cursor-not-allowed disabled:text-grayscale-300"
    >
      {children}
    </button>
  );
}
