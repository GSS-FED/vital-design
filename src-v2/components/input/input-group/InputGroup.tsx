import { Button } from '@/components/button/Button';
import type {
  ButtonProps,
  ButtonTheme,
} from '@/components/button/Button';
import { Input } from '@/components/input/input/Input';
import { Textarea } from '@/components/textarea/Textarea';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type InputGroupProps = ComponentPropsWithoutRef<'div'>;

const InputGroup = forwardRef<ElementRef<'div'>, InputGroupProps>(
  function InputGroup({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="input-group"
        className={cn(
          'group/input-group relative box-border flex h-8 w-full min-w-0 items-center rounded border border-grayscale-300 bg-white font-sans text-grayscale-500 transition-colors duration-200 outline-none',
          'hover:border-grayscale-500',
          'has-[:disabled]:border-grayscale-300 has-[:disabled]:bg-grayscale-200 has-[:disabled]:text-grayscale-500 has-[:disabled]:opacity-100 has-[:disabled]:hover:border-grayscale-300',
          'has-[[data-slot=input-group-control]:focus-visible]:border-primary-500',
          'has-[[data-slot][aria-invalid=true]]:border-destructive-500 has-[[data-slot][aria-invalid=true]]:hover:border-destructive-500 has-[[data-slot][aria-invalid=true]]:focus-within:border-destructive-500',
          'aria-invalid:border-destructive-500 aria-invalid:hover:border-destructive-500 aria-invalid:focus-within:border-destructive-500',
          'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col',
          'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col',
          'has-[>textarea]:h-auto',
          'has-[>[data-align=block-end]]:[&>input]:pt-3',
          'has-[>[data-align=block-start]]:[&>input]:pb-3',
          'has-[>[data-align=inline-end]]:[&>input]:pr-1.5',
          'has-[>[data-align=inline-start]]:[&>input]:pl-1.5',
          className,
        )}
        {...props}
      />
    );
  },
);

const inputGroupAddonVariants = cva(
  'flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm leading-5 font-medium text-grayscale-500 select-none group-has-[:disabled]/input-group:opacity-50 [&>svg:not([class*=size-])]:size-4',
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-2 has-[>button]:ml-[-0.3rem]',
        'inline-end': 'order-last pr-2 has-[>button]:mr-[-0.3rem]',
        'block-start':
          'order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
        'block-end':
          'order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
);

export type InputGroupAddonAlign = NonNullable<
  VariantProps<typeof inputGroupAddonVariants>['align']
>;

export type InputGroupAddonProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof inputGroupAddonVariants>;

const InputGroupAddon = forwardRef<
  ElementRef<'div'>,
  InputGroupAddonProps
>(function InputGroupAddon(
  { align = 'inline-start', className, onClick, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="group"
      data-align={align}
      data-slot="input-group-addon"
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          (event.target as HTMLElement).closest('button')
        ) {
          return;
        }

        event.currentTarget.parentElement
          ?.querySelector<HTMLElement>(
            '[data-slot="input-group-control"]',
          )
          ?.focus();
      }}
      {...props}
    />
  );
});

const inputGroupButtonVariants = cva(
  'flex items-center gap-2 text-sm shadow-none',
  {
    variants: {
      size: {
        xs: 'h-6 gap-1 rounded px-1.5 [&>span]:gap-1 [&_svg:not([class*=size-])]:size-3.5',
        sm: 'h-7 rounded px-2',
        'icon-xs':
          'size-6 rounded p-0 [&>span]:size-full [&>span]:gap-0',
        'icon-sm':
          'size-8 rounded p-0 [&>span]:size-full [&>span]:gap-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
);

export type InputGroupButtonProps = Omit<
  ButtonProps,
  'size' | 'variant' | 'theme'
> & {
  theme?: Exclude<ButtonTheme, 'dangerous'>;
} & VariantProps<typeof inputGroupButtonVariants>;

const InputGroupButton = forwardRef<
  ElementRef<typeof Button>,
  InputGroupButtonProps
>(function InputGroupButton(
  { className, size = 'xs', type = 'button', ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      type={type}
      data-size={size}
      variant="text"
      size="md"
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
});

export type InputGroupTextProps = ComponentPropsWithoutRef<'span'>;

const InputGroupText = forwardRef<
  ElementRef<'span'>,
  InputGroupTextProps
>(function InputGroupText({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="input-group-text"
      className={cn(
        'flex items-center gap-2 text-sm leading-5 text-grayscale-500 [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4',
        className,
      )}
      {...props}
    />
  );
});

export type InputGroupInputProps = ComponentPropsWithoutRef<
  typeof Input
>;

const InputGroupInput = forwardRef<
  ElementRef<typeof Input>,
  InputGroupInputProps
>(function InputGroupInput({ className, ...props }, ref) {
  return (
    <Input
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent px-0 py-0 shadow-none',
        'hover:border-0 focus-visible:border-0 focus-visible:ring-0 disabled:bg-transparent',
        'aria-invalid:border-0 aria-invalid:ring-0',
        className,
      )}
      {...props}
    />
  );
});

export type InputGroupTextareaProps =
  ComponentPropsWithoutRef<'textarea'>;

const InputGroupTextarea = forwardRef<
  ElementRef<'textarea'>,
  InputGroupTextareaProps
>(function InputGroupTextarea({ className, ...props }, ref) {
  return (
    <Textarea
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent px-0 py-2 shadow-none',
        'hover:border-0 focus-visible:border-0 focus-visible:ring-0 disabled:bg-transparent',
        'aria-invalid:border-0 aria-invalid:ring-0',
        className,
      )}
      {...props}
    />
  );
});

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
