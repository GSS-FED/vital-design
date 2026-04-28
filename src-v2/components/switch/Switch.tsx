import { cn } from '@/utils/cn';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { CSSProperties } from 'react';

export type SwitchProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function Switch(props: SwitchProps) {
  const { checked, onChange, disabled, className, style } = props;

  return (
    <BaseSwitch.Root
      checked={checked}
      onCheckedChange={
        disabled
          ? undefined
          : (nextChecked: boolean) => {
              onChange?.(nextChecked);
            }
      }
      disabled={disabled}
      className={cn(
        'group relative inline-flex items-center',
        'text-[13px] w-13 h-6 px-0.75',
        'border border-grayscale-300 rounded-[100px]',
        'text-grayscale-500 bg-grayscale-200',
        'transition-colors duration-100 cursor-pointer',
        'font-sans box-border',
        'before:content-["Off"] before:absolute before:right-2',
        'data-disabled:opacity-40 data-disabled:cursor-not-allowed',
        'data-checked:text-white data-checked:bg-primary-500',
        'data-checked:border-transparent',
        'data-checked:before:content-["On"]',
        'data-checked:before:left-2 data-checked:before:right-auto',
        className,
      )}
      style={style}
    >
      <BaseSwitch.Thumb
        className={cn(
          'inline-block w-4.5 h-4.5',
          'border border-grayscale-300 rounded-full',
          'translate-x-0 bg-white',
          'transition-transform duration-100',
          'data-checked:translate-x-[150%]',
          'data-checked:border-transparent',
          'data-disabled:opacity-80',
          !disabled &&
            'group-hover:shadow-[0_0_0_1px_var(--grayscale-200)]',
          !disabled &&
            'group-hover:data-checked:shadow-[0_0_0_5px_rgba(14,134,254,0.2)]',
        )}
      />
    </BaseSwitch.Root>
  );
}
