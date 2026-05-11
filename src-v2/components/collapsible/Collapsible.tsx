import { cn } from '@/lib/utils';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type CollapsibleProps = ComponentPropsWithoutRef<
  typeof BaseCollapsible.Root
>;

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  function Collapsible({ className, ...props }, ref) {
    return (
      <BaseCollapsible.Root
        ref={ref}
        data-slot="collapsible"
        className={cn(className)}
        {...props}
      />
    );
  },
);

export type CollapsibleTriggerProps = ComponentPropsWithoutRef<
  typeof BaseCollapsible.Trigger
>;

const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(function CollapsibleTrigger(
  { className, type = 'button', ...props },
  ref,
) {
  return (
    <BaseCollapsible.Trigger
      ref={ref}
      type={type}
      data-slot="collapsible-trigger"
      className={cn(
        'cursor-pointer focus-visible:shadow-focus-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 data-disabled:cursor-not-allowed data-disabled:opacity-60',
        className,
      )}
      {...props}
    />
  );
});

export type CollapsibleContentProps = ComponentPropsWithoutRef<
  typeof BaseCollapsible.Panel
>;

const CollapsibleContent = forwardRef<
  ElementRef<typeof BaseCollapsible.Panel>,
  CollapsibleContentProps
>(function CollapsibleContent({ className, ...props }, ref) {
  return (
    <BaseCollapsible.Panel
      ref={ref}
      data-slot="collapsible-content"
      className={cn(
        'h-(--collapsible-panel-height) overflow-hidden font-sans text-sm leading-5 text-grayscale-700 transition-[height] duration-150 ease-out data-starting-style:h-0 data-ending-style:h-0',
        className,
      )}
      {...props}
    />
  );
});

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
