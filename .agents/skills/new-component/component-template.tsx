// 元件結構模板
// 替換所有 ComponentName 為實際元件名稱
import { type CvaProps, cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { CSSProperties, Ref } from 'react';

const componentNameVariants = cva(
  // Base classes（所有 variant 共用）
  ['font-sans box-border transition-colors duration-150'],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export type ComponentNameVariants = VariantProps<
  typeof componentNameVariants
>;

export type ComponentNameProps = {
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
} & CvaProps<ComponentNameVariants>;

export function ComponentName({
  className,
  style,
  size,
  ref,
}: ComponentNameProps) {
  return (
    <div
      ref={ref}
      data-slot="component-name"
      className={cn(componentNameVariants({ size }), className)}
      style={style}
    />
  );
}
