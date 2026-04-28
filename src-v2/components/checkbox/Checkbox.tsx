import { CheckIcon } from '@/icons/CheckIcon';
import { MinusIcon } from '@/icons/MinusIcon';
import { cn } from '@/utils/cn';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import type { CSSProperties, ReactNode } from 'react';

export type CheckboxProps = {
  checked: boolean | 'indeterminate';
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Checkbox(props: CheckboxProps) {
  const {
    checked,
    onChange,
    disabled,
    required,
    children,
    className,
    style,
  } = props;

  const isChecked = checked === true;
  const isIndeterminate = checked === 'indeterminate';
  const isSelected = isChecked || isIndeterminate;
  const isInvalid = !!required && !checked;
  const handleCheckedChange = disabled
    ? undefined
    : (nextChecked: boolean) => {
        onChange?.(nextChecked);
      };

  return (
    <label
      className={cn(
        'group flex items-start gap-2',
        'text-sm leading-5 font-sans box-border',
        disabled
          ? 'text-grayscale-500 cursor-not-allowed'
          : 'text-grayscale-800 cursor-pointer',
        className,
      )}
      style={style}
    >
      <div className="flex-none flex items-center h-5">
        <BaseCheckbox.Root
          checked={isChecked}
          indeterminate={isIndeterminate}
          onCheckedChange={handleCheckedChange}
          disabled={disabled}
          required={required}
          data-invalid={isInvalid ? '' : undefined}
          className={cn(
            'flex items-center w-4 h-4',
            'border border-grayscale-400 rounded-sm',
            'bg-white transition-colors duration-100',
            'font-sans box-border',
            'data-disabled:border-grayscale-300 data-disabled:bg-grayscale-200',
            'data-invalid:border-alarm-500',
            'data-checked:border-primary-500 data-checked:bg-primary-500',
            'data-indeterminate:border-primary-500 data-indeterminate:bg-primary-500',
            !disabled &&
              'group-hover:border-primary-500 group-hover:shadow-(--shadow-focus-ring-primary)',
            !disabled &&
              'group-hover:data-invalid:border-alarm-500 group-hover:data-invalid:shadow-(--shadow-focus-ring-alarm)',
            disabled &&
              isSelected &&
              'data-checked:bg-primary-500 data-indeterminate:bg-primary-500 opacity-40',
          )}
        >
          <BaseCheckbox.Indicator
            className={cn(
              'inline-flex justify-center items-center w-full h-full text-white',
              'data-checked:[&_svg]:w-3 data-checked:[&_svg]:h-2.25',
              'data-indeterminate:[&_svg]:w-2.5 data-indeterminate:[&_svg]:h-0.75',
            )}
          >
            {isIndeterminate && <MinusIcon />}
            {isChecked && <CheckIcon />}
          </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
      </div>
      {!!children && <div className="shrink">{children}</div>}
    </label>
  );
}
