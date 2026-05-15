import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type CardProps = ComponentPropsWithoutRef<'div'>;

const Card = forwardRef<ElementRef<'div'>, CardProps>(function Card(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        'flex flex-col rounded bg-white font-sans text-grayscale-800 shadow-emphasis',
        className,
      )}
      {...props}
    />
  );
});

export type CardHeaderProps = ComponentPropsWithoutRef<'div'>;

const CardHeader = forwardRef<ElementRef<'div'>, CardHeaderProps>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          'grid auto-rows-min grid-rows-[auto_auto] items-start gap-y-1 px-4 py-3 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
          '[.border-b]:pb-3',
          className,
        )}
        {...props}
      />
    );
  },
);

export type CardTitleProps = ComponentPropsWithoutRef<'div'>;

const CardTitle = forwardRef<ElementRef<'div'>, CardTitleProps>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-title"
        className={cn(
          'text-base leading-6 font-medium text-grayscale-900',
          className,
        )}
        {...props}
      />
    );
  },
);

export type CardDescriptionProps = ComponentPropsWithoutRef<'div'>;

const CardDescription = forwardRef<
  ElementRef<'div'>,
  CardDescriptionProps
>(function CardDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn(
        'text-sm leading-5 text-grayscale-600',
        className,
      )}
      {...props}
    />
  );
});

export type CardActionProps = ComponentPropsWithoutRef<'div'>;

const CardAction = forwardRef<ElementRef<'div'>, CardActionProps>(
  function CardAction({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={cn(
          'col-start-2 row-span-2 row-start-1 flex items-center gap-2 self-start justify-self-end',
          className,
        )}
        {...props}
      />
    );
  },
);

export type CardContentProps = ComponentPropsWithoutRef<'div'>;

const CardContent = forwardRef<ElementRef<'div'>, CardContentProps>(
  function CardContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={cn('px-4 py-3', className)}
        {...props}
      />
    );
  },
);

export type CardFooterProps = ComponentPropsWithoutRef<'div'>;

const CardFooter = forwardRef<ElementRef<'div'>, CardFooterProps>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn(
          'flex items-center gap-2 px-4 py-3 [.border-t]:pt-3',
          className,
        )}
        {...props}
      />
    );
  },
);

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
