import { cn } from '@/lib/utils';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  Ref,
} from 'react';

export type SeparatorProps = ComponentPropsWithoutRef<
  typeof BaseSeparator
>;

const Separator = function Separator({
  className,
  orientation = 'horizontal',
  ref,
  ...props
}: Omit<SeparatorProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseSeparator>>;
}) {
  return (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      data-slot="separator"
      className={cn(
        'shrink-0 bg-grayscale-opacity-200',
        orientation === 'horizontal'
          ? 'h-px w-full'
          : 'h-full min-h-4 w-px',
        className,
      )}
      {...props}
    />
  );
};

export { Separator };
