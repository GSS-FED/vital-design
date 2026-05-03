import { Separator } from '@/components/separator/Separator';
import { cn } from '@/lib/utils';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';
import { createContext, forwardRef, useContext } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

const buttonGroupVariants = cva(
  [
    'inline-flex w-fit items-stretch font-sans box-border',
    'has-[>[data-slot=button-group]]:gap-2',
    '[&>*]:focus-visible:relative [&>*]:focus-visible:z-10',
    '[&>input]:flex-1',
  ],
  {
    variants: {
      orientation: {
        horizontal:
          '[&>:not([data-slot=button-group])+*:not([data-slot=button-group])]:rounded-l-none [&>:not([data-slot=button-group])+*:not([data-slot=button-group])]:border-l-0 [&>:not([data-slot=button-group]):has(+*:not([data-slot=button-group]))]:rounded-r-none',
        vertical:
          'flex-col [&>:not([data-slot=button-group])+*:not([data-slot=button-group])]:rounded-t-none [&>:not([data-slot=button-group])+*:not([data-slot=button-group])]:border-t-0 [&>:not([data-slot=button-group]):has(+*:not([data-slot=button-group]))]:rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
);

export type ButtonGroupVariants = VariantProps<
  typeof buttonGroupVariants
>;

export type ButtonGroupProps = ComponentPropsWithoutRef<'div'> & {
  orientation?: 'horizontal' | 'vertical';
};

const ButtonGroupContext = createContext<{
  orientation: 'horizontal' | 'vertical';
} | null>(null);

const ButtonGroup = forwardRef<ElementRef<'div'>, ButtonGroupProps>(
  function ButtonGroup(props, ref) {
    const {
      className,
      orientation = 'horizontal',
      role = 'group',
      ...groupProps
    } = props;

    return (
      <ButtonGroupContext.Provider value={{ orientation }}>
        <div
          ref={ref}
          role={role}
          data-orientation={orientation}
          data-slot="button-group"
          className={cn(
            buttonGroupVariants({ orientation }),
            className,
          )}
          {...groupProps}
        />
      </ButtonGroupContext.Provider>
    );
  },
);

export type ButtonGroupSeparatorProps = ComponentPropsWithoutRef<
  typeof Separator
>;

const ButtonGroupSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ButtonGroupSeparatorProps
>(function ButtonGroupSeparator(props, ref) {
  const {
    className,
    orientation: orientationProp,
    role = 'separator',
    ...separatorProps
  } = props;
  const context = useContext(ButtonGroupContext);
  const orientation =
    orientationProp ??
    (context?.orientation === 'vertical' ? 'horizontal' : 'vertical');

  return (
    <Separator
      ref={ref}
      role={role}
      orientation={orientation}
      data-slot="button-group-separator"
      className={cn(
        orientation === 'horizontal'
          ? 'h-px w-auto self-stretch'
          : 'h-auto min-h-0 w-px self-stretch',
        'relative shrink-0 self-stretch bg-grayscale-300',
        className,
      )}
      {...separatorProps}
    />
  );
});

export type ButtonGroupTextProps = useRender.ComponentProps<'span'>;

const ButtonGroupText = forwardRef<
  ElementRef<'span'>,
  ButtonGroupTextProps
>(function ButtonGroupText(props, ref) {
  const { className, render, ...textProps } = props;

  return useRender({
    ref,
    render,
    defaultTagName: 'span',
    state: {
      slot: 'button-group-text',
    },
    props: mergeProps<'span'>(
      {
        className: cn(
          'flex items-center gap-2 border border-grayscale-300 bg-grayscale-100 px-4 text-sm font-medium leading-5 text-grayscale-700',
          className,
        ),
      },
      textProps,
    ),
  });
});

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
