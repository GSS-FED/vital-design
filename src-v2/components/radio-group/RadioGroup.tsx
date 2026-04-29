import { cn } from '@/utils/cn';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';

export type RadioGroupProps = BaseRadioGroup.Props<string>;

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      className={cn('grid w-full gap-2', className)}
      {...props}
    />
  );
}

export type RadioGroupItemProps = BaseRadio.Root.Props<string>;

function RadioGroupItem({
  className,
  ...props
}: RadioGroupItemProps) {
  return (
    <BaseRadio.Root
      data-slot="radio-group-item"
      className={cn(
        'group/radio-group-item relative flex size-4 shrink-0 items-center justify-center rounded-full border border-grayscale-400 bg-white outline-none transition-colors duration-100',
        'after:absolute after:-inset-x-3 after:-inset-y-2',
        'focus-visible:border-primary-500 focus-visible:shadow-(--shadow-focus-ring-primary)',
        'data-disabled:cursor-not-allowed data-disabled:border-grayscale-300 data-disabled:bg-grayscale-200 data-disabled:opacity-50',
        'aria-invalid:border-alarm-500 aria-invalid:shadow-(--shadow-focus-ring-alarm)',
        'data-checked:border-transparent data-checked:bg-primary-500',
        className,
      )}
      {...props}
    >
      <BaseRadio.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="size-1.5 rounded-full bg-white" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  );
}

export { RadioGroup, RadioGroupItem };
