import { cn } from '@/lib/utils';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  Ref,
} from 'react';

export type CollapsibleProps = ComponentPropsWithoutRef<
  typeof BaseCollapsible.Root
>;

const Collapsible = function Collapsible({
  className,
  ref,
  ...props
}: Omit<CollapsibleProps, 'ref'> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <BaseCollapsible.Root
      ref={ref}
      data-slot="collapsible"
      className={cn(className)}
      {...props}
    />
  );
};

export type CollapsibleTriggerProps = ComponentPropsWithoutRef<
  typeof BaseCollapsible.Trigger
>;

const CollapsibleTrigger = function CollapsibleTrigger({
  className,
  type = 'button',
  ref,
  ...props
}: Omit<CollapsibleTriggerProps, 'ref'> & {
  ref?: Ref<HTMLButtonElement>;
}) {
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
};

export type CollapsibleContentProps = ComponentPropsWithoutRef<
  typeof BaseCollapsible.Panel
>;

const CollapsibleContent = function CollapsibleContent({
  className,
  ref,
  ...props
}: Omit<CollapsibleContentProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof BaseCollapsible.Panel>>;
}) {
  return (
    <BaseCollapsible.Panel
      ref={ref}
      data-slot="collapsible-content"
      className={cn(
        'h-(--collapsible-panel-height) overflow-hidden font-sans text-sm leading-5 text-grayscale-opacity-700 transition-[height] duration-150 ease-out data-starting-style:h-0 data-ending-style:h-0',
        className,
      )}
      {...props}
    />
  );
};

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
