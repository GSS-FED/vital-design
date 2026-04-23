import TextInput from '@/components/input/textInput/TextInput';
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
function PasswordInput(props: PasswordInputProps) {
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

  return (
    <TextInput
      className={className}
      data-state={passwordVisible ? 'visible' : 'invisible'}
      data-testid="password-input"
      disabled={disabled}
      isError={isError}
      onChange={onChange}
      onEnter={onEnter}
      placeholder={placeholder}
      prefix={prefix}
      style={style}
      suffix={
        <VisibilityToggle
          disabled={disabled}
          onClick={() => setPasswordVisible((visible) => !visible)}
        >
          {passwordVisible ? <EyeIcon /> : <EyeSlashIcon />}
        </VisibilityToggle>
      }
      type={passwordVisible ? 'text' : 'password'}
      value={value}
      width={width}
    />
  );
}

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;

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
