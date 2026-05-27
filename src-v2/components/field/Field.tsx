'use client';

import { Label } from '@/components/label/Label';
import { Separator } from '@/components/separator/Separator';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { useMemo } from 'react';
import type { ComponentProps, ReactNode } from 'react';

export type FieldSetProps = ComponentProps<'fieldset'>;

function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        'flex flex-col gap-4',
        'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className,
      )}
      {...props}
    />
  );
}

export type FieldLegendProps = ComponentProps<'legend'> & {
  variant?: 'legend' | 'label';
};

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        'mb-1.5 font-sans font-medium text-grayscale-opacity-800',
        'data-[variant=label]:text-sm',
        'data-[variant=legend]:text-base',
        className,
      )}
      {...props}
    />
  );
}

export type FieldGroupProps = ComponentProps<'div'>;

function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-5',
        'data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4',
        className,
      )}
      {...props}
    />
  );
}

const fieldVariants = cva(
  'group/field flex w-full data-[invalid=true]:text-destructive-500',
  {
    variants: {
      orientation: {
        vertical: 'flex-col gap-1 [&>*]:w-full [&>.sr-only]:w-auto',
        horizontal: [
          'flex-row items-start gap-2',
          '[&>[data-slot=field-label]]:flex-auto',
          '[&>[data-slot=checkbox]]:mt-px',
          '[&>[data-slot=radio-group-item]]:mt-px',
          'not-data-[disabled]:hover:[&>[data-slot=checkbox]]:border-primary-500',
          'not-data-[disabled]:hover:[&>[data-slot=checkbox]]:shadow-(--shadow-focus-ring-primary)',
          'not-data-[disabled]:hover:[&>[data-slot=radio-group-item]]:border-primary-500',
          'not-data-[disabled]:hover:[&>[data-slot=radio-group-item]]:shadow-(--shadow-focus-ring-primary)',
          'has-[>[data-slot=field-content]]:items-start',
          'has-[>[data-slot=field-content]]:[&>[data-slot=checkbox]]:mt-px',
          'has-[>[data-slot=field-content]]:[&>[data-slot=radio-group-item]]:mt-px',
        ],
        responsive: [
          'flex-col gap-1 @md/field-group:flex-row @md/field-group:items-start @md/field-group:gap-2',
          '[&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto',
          '@md/field-group:[&>[data-slot=field-label]]:flex-auto',
          '@md/field-group:[&>[data-slot=checkbox]]:mt-px',
          '@md/field-group:[&>[data-slot=radio-group-item]]:mt-px',
          '@md/field-group:not-data-[disabled]:hover:[&>[data-slot=checkbox]]:border-primary-500',
          '@md/field-group:not-data-[disabled]:hover:[&>[data-slot=checkbox]]:shadow-(--shadow-focus-ring-primary)',
          '@md/field-group:not-data-[disabled]:hover:[&>[data-slot=radio-group-item]]:border-primary-500',
          '@md/field-group:not-data-[disabled]:hover:[&>[data-slot=radio-group-item]]:shadow-(--shadow-focus-ring-primary)',
          '@md/field-group:has-[>[data-slot=field-content]]:items-start',
          '@md/field-group:has-[>[data-slot=field-content]]:[&>[data-slot=checkbox]]:mt-px',
          '@md/field-group:has-[>[data-slot=field-content]]:[&>[data-slot=radio-group-item]]:mt-px',
        ],
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
);

export type FieldProps = ComponentProps<'div'> &
  VariantProps<typeof fieldVariants>;

function Field({
  className,
  orientation = 'vertical',
  ...props
}: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

export type FieldContentProps = ComponentProps<'div'>;

function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        'group/field-content flex flex-1 flex-col gap-1 leading-snug',
        className,
      )}
      {...props}
    />
  );
}

export type FieldLabelProps = ComponentProps<typeof Label>;

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 font-normal leading-5',
        'group-data-[disabled=true]/field:opacity-50',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
        'has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border',
        '[&>*]:data-[slot=field]:p-2.5',
        'has-data-[checked]:border-primary-500/30 has-data-[checked]:bg-primary-50',
        className,
      )}
      {...props}
    />
  );
}

export type FieldTitleProps = ComponentProps<'div'>;

function FieldTitle({ className, ...props }: FieldTitleProps) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        'flex w-fit items-center gap-2 font-sans text-sm font-medium text-grayscale-opacity-800',
        'group-data-[disabled=true]/field:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export type FieldDescriptionProps = ComponentProps<'p'>;

function FieldDescription({
  className,
  ...props
}: FieldDescriptionProps) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-left font-sans text-xs leading-4 font-normal text-grayscale-opacity-600',
        'group-has-[[data-orientation=horizontal]]/field:text-balance',
        '[[data-variant=legend]+&]:-mt-1.5',
        'last:mt-0 nth-last-2:-mt-1',
        '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary-500',
        className,
      )}
      {...props}
    />
  );
}

export type FieldSeparatorProps = ComponentProps<'div'> & {
  children?: ReactNode;
};

function FieldSeparator({
  children,
  className,
  ...props
}: FieldSeparatorProps) {
  return (
    <div
      data-content={!!children}
      data-slot="field-separator"
      className={cn(
        'relative -my-2 h-5 text-sm',
        'group-data-[variant=outline]/field-group:-mb-2',
        className,
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children ? (
        <span
          data-slot="field-separator-content"
          className="relative mx-auto block w-fit bg-white px-2 text-grayscale-opacity-500"
        >
          {children}
        </span>
      ) : null}
    </div>
  );
}

export type FieldErrorMessage = {
  message?: string;
};

export type FieldErrorProps = ComponentProps<'div'> & {
  errors?: Array<FieldErrorMessage | undefined>;
};

function FieldError({
  children,
  className,
  errors,
  ...props
}: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(
        errors.map((error) => [error?.message, error]),
      ).values(),
    ];

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error, index) =>
          error?.message ? (
            <li key={`${error.message}-${index}`}>{error.message}</li>
          ) : null,
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn(
        'font-sans text-sm font-normal text-destructive-500',
        className,
      )}
      {...props}
    >
      {content}
    </div>
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
};
