/**
 * Class merging utility: conditional joining (clsx) + Tailwind conflict
 * resolution (tailwind-merge), both provided by the `cn` engine.
 */
export { cn } from 'cn';

/** Strip CVA `VariantProps` `| null`; `cva()` uses null to unset defaultVariants. */
export type CvaProps<T> = {
  [K in keyof T]?: NonNullable<T[K]>;
};
