import { cn } from '@/utils/cn';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';
import { createContext, forwardRef, useContext } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

const inputGroupVariants = cva(
  [
    'group/input-group box-border flex min-h-8 w-full items-center gap-2',
    'rounded border border-grayscale-300 bg-white px-2 py-1.5',
    'font-sans text-grayscale-500 transition-colors duration-200',
    'hover:border-grayscale-500 focus-within:border-primary-500',
  ],
  {
    variants: {
      disabled: {
        true: [
          'border-grayscale-300 bg-grayscale-200 text-grayscale-500',
          'hover:border-grayscale-300',
        ],
        false: '',
      },
      isError: {
        true: [
          'border-alarm-500 hover:border-alarm-500',
          'focus-within:border-alarm-500',
        ],
        false: '',
      },
    },
    compoundVariants: [
      {
        disabled: true,
        isError: true,
        class: 'border-grayscale-300 hover:border-grayscale-300',
      },
    ],
    defaultVariants: {
      disabled: false,
      isError: false,
    },
  },
);

export type InputGroupVariants = VariantProps<
  typeof inputGroupVariants
>;

export type InputGroupProps = ComponentPropsWithoutRef<'div'> & {
  disabled?: boolean;
  isError?: boolean;
};

const InputGroupContext = createContext<{ disabled: boolean } | null>(
  null,
);

const InputGroup = forwardRef<ElementRef<'div'>, InputGroupProps>(
  function InputGroup(props, ref) {
    const {
      className,
      disabled = false,
      isError = false,
      ...groupProps
    } = props;

    return (
      <InputGroupContext.Provider value={{ disabled }}>
        <div
          ref={ref}
          data-disabled={disabled ? '' : undefined}
          data-invalid={isError ? '' : undefined}
          data-slot="input-group"
          className={cn(
            inputGroupVariants({ disabled, isError }),
            className,
          )}
          {...groupProps}
        />
      </InputGroupContext.Provider>
    );
  },
);

export type InputGroupInputProps = ComponentPropsWithoutRef<'input'>;

const InputGroupInput = forwardRef<
  ElementRef<'input'>,
  InputGroupInputProps
>(function InputGroupInput(
  { className, disabled: disabledProp, ...inputProps },
  ref,
) {
  const context = useContext(InputGroupContext);
  const disabled = disabledProp ?? context?.disabled ?? false;

  return (
    <input
      ref={ref}
      data-slot="input-group-control"
      disabled={disabled}
      className={cn(
        'order-1 min-w-0 flex-1 appearance-none border-none bg-transparent p-0',
        'font-sans text-sm font-normal leading-5 text-grayscale-800',
        'outline-none placeholder:text-grayscale-400',
        'disabled:cursor-not-allowed disabled:text-grayscale-500',
        className,
      )}
      {...inputProps}
    />
  );
});

export type InputGroupTextareaProps =
  ComponentPropsWithoutRef<'textarea'> & {
    resizable?: boolean;
  };

const InputGroupTextarea = forwardRef<
  ElementRef<'textarea'>,
  InputGroupTextareaProps
>(function InputGroupTextarea(props, ref) {
  const {
    className,
    disabled: disabledProp,
    resizable = false,
    ...textareaProps
  } = props;
  const context = useContext(InputGroupContext);
  const disabled = disabledProp ?? context?.disabled ?? false;

  return (
    <textarea
      ref={ref}
      data-slot="input-group-control"
      disabled={disabled}
      className={cn(
        'order-1 w-full min-w-0 flex-1 border-none bg-transparent p-0',
        'font-sans text-sm font-normal leading-5 text-grayscale-800',
        'outline-none placeholder:text-grayscale-400',
        'disabled:cursor-not-allowed disabled:text-grayscale-500',
        resizable ? 'resize' : 'resize-none',
        className,
      )}
      {...textareaProps}
    />
  );
});

export type InputGroupAddonAlign = 'inline-start' | 'inline-end';

export type InputGroupAddonProps = useRender.ComponentProps<'div'> & {
  align?: InputGroupAddonAlign;
};

const addonAlignClasses: Record<InputGroupAddonAlign, string> = {
  'inline-start': 'order-0',
  'inline-end': 'order-2',
};

const InputGroupAddon = forwardRef<
  ElementRef<'div'>,
  InputGroupAddonProps
>(function InputGroupAddon(props, ref) {
  const {
    align = 'inline-start',
    className,
    render,
    ...addonProps
  } = props;

  return useRender({
    ref,
    render,
    defaultTagName: 'div',
    state: {
      align,
      slot: 'input-group-addon',
    },
    props: mergeProps<'div'>(
      {
        className: cn(
          'flex shrink-0 items-center text-grayscale-500',
          addonAlignClasses[align],
          className,
        ),
      },
      addonProps,
    ),
  });
});

export type InputGroupButtonProps =
  ComponentPropsWithoutRef<'button'>;

const InputGroupButton = forwardRef<
  ElementRef<'button'>,
  InputGroupButtonProps
>(function InputGroupButton(props, ref) {
  const {
    className,
    disabled: disabledProp,
    type = 'button',
    ...buttonProps
  } = props;
  const context = useContext(InputGroupContext);
  const disabled = disabledProp ?? context?.disabled ?? false;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      data-slot="input-group-button"
      className={cn(
        'inline-flex h-5 w-5 items-center justify-center',
        'text-grayscale-500 transition-colors duration-200',
        'hover:text-grayscale-700 disabled:cursor-not-allowed disabled:text-grayscale-300',
        className,
      )}
      {...buttonProps}
    />
  );
});

export type InputGroupTextProps = useRender.ComponentProps<'span'>;

const InputGroupText = forwardRef<
  ElementRef<'span'>,
  InputGroupTextProps
>(function InputGroupText(props, ref) {
  const { className, render, ...textProps } = props;

  return useRender({
    ref,
    render,
    defaultTagName: 'span',
    state: {
      slot: 'input-group-text',
    },
    props: mergeProps<'span'>(
      {
        className: cn(
          'text-sm leading-5 text-grayscale-500',
          className,
        ),
      },
      textProps,
    ),
  });
});

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
