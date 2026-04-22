import TextInput from '@/components/input/textInput/TextInput';
import { EyeIcon } from '@/icons/EyeIcon';
import { EyeSlashIcon } from '@/icons/EyeSlashIcon';
import { cn } from '@/utils/cn';
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
    <div
      className={cn(
        'box-border',
        disabled && 'pointer-events-none',
        className,
      )}
      style={{ width: width ?? '100%', ...style }}
    >
      {passwordVisible ? (
        <TextInput
          value={value}
          data-state="visible"
          placeholder={placeholder}
          prefix={prefix}
          onChange={onChange}
          onEnter={onEnter}
          isError={isError}
          disabled={disabled}
          suffix={
            <VisibilityToggle
              onClick={() => setPasswordVisible(false)}
            >
              <EyeIcon />
            </VisibilityToggle>
          }
        />
      ) : (
        <TextInput
          value={value.replace(/./g, '＊')}
          data-state="invisible"
          placeholder={placeholder}
          prefix={prefix}
          isError={isError}
          disabled={disabled}
          onEnter={() => onEnter?.(value)}
          onChange={(val) => {
            if (value.length > val.length) {
              //Deletion
              onChange(value.substring(0, val.length));
            } else {
              //Addition
              onChange(value + val.replace(/＊/g, ''));
            }
          }}
          suffix={
            <VisibilityToggle
              onClick={() => setPasswordVisible(true)}
            >
              <EyeSlashIcon />
            </VisibilityToggle>
          }
        />
      )}
    </div>
  );
}

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;

/* --------------------------------- Components --------------------------------- */
function VisibilityToggle({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <div
      data-testid="visibility-toggle"
      onClick={onClick}
      className={cn(
        'w-5 h-5 flex justify-center items-center',
        'cursor-pointer transition-all duration-200',
        'hover:text-grayscale-700',
      )}
    >
      {children}
    </div>
  );
}
