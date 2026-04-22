// 元件結構模板
// 替換所有 ComponentName 為實際元件名稱
import { cn } from '@/utils/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import type { CSSProperties } from 'react';

const componentNameVariants = cva(
  // Base classes（所有 variant 共用）
  ['font-sans box-border transition-colors duration-150'],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
      },
      // 新增其他 variant 維度
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export type ComponentNameProps = {
  className?: string;
  style?: CSSProperties;
  // 新增元件專屬 props
} & VariantProps<typeof componentNameVariants>;

export default function ComponentName({
  className,
  style,
  size,
}: ComponentNameProps) {
  return (
    <div
      className={cn(componentNameVariants({ size }), className)}
      style={style}
    />
  );
}
