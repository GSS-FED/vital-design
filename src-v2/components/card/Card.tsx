import { cn } from '@/lib/utils';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  Ref,
} from 'react';

export type CardProps = ComponentPropsWithoutRef<'div'>;

const Card = function Card({
  className,
  ref,
  ...props
}: Omit<CardProps, 'ref'> & { ref?: Ref<ElementRef<'div'>> }) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        'flex flex-col rounded bg-white font-sans text-grayscale-opacity-800 shadow-emphasis',
        className,
      )}
      {...props}
    />
  );
};

export type CardHeaderProps = ComponentPropsWithoutRef<'div'>;

const CardHeader = function CardHeader({
  className,
  ref,
  ...props
}: Omit<CardHeaderProps, 'ref'> & { ref?: Ref<ElementRef<'div'>> }) {
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
};

export type CardTitleProps = ComponentPropsWithoutRef<'div'>;

const CardTitle = function CardTitle({
  className,
  ref,
  ...props
}: Omit<CardTitleProps, 'ref'> & { ref?: Ref<ElementRef<'div'>> }) {
  return (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn(
        'text-base leading-6 font-medium text-grayscale-opacity-900',
        className,
      )}
      {...props}
    />
  );
};

export type CardDescriptionProps = ComponentPropsWithoutRef<'div'>;

const CardDescription = function CardDescription({
  className,
  ref,
  ...props
}: Omit<CardDescriptionProps, 'ref'> & {
  ref?: Ref<ElementRef<'div'>>;
}) {
  return (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn(
        'text-sm leading-5 text-grayscale-opacity-600',
        className,
      )}
      {...props}
    />
  );
};

export type CardActionProps = ComponentPropsWithoutRef<'div'>;

const CardAction = function CardAction({
  className,
  ref,
  ...props
}: Omit<CardActionProps, 'ref'> & { ref?: Ref<ElementRef<'div'>> }) {
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
};

export type CardContentProps = ComponentPropsWithoutRef<'div'>;

const CardContent = function CardContent({
  className,
  ref,
  ...props
}: Omit<CardContentProps, 'ref'> & { ref?: Ref<ElementRef<'div'>> }) {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn('px-4 py-3', className)}
      {...props}
    />
  );
};

export type CardFooterProps = ComponentPropsWithoutRef<'div'>;

const CardFooter = function CardFooter({
  className,
  ref,
  ...props
}: Omit<CardFooterProps, 'ref'> & { ref?: Ref<ElementRef<'div'>> }) {
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
};

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
