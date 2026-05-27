import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { CSSProperties, ReactNode } from 'react';

export type ChipProps = {
  children: ReactNode;
  selected: boolean;
  onChange?: (selected: boolean) => void;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const chipVariants = cva(
  // Base classes
  [
    'relative inline-flex gap-1 text-sm leading-[18px]',
    'py-1.5 px-4 rounded-full cursor-pointer',
    'font-sans box-border',
    'transition-colors duration-100',
    'before:content-[""] before:absolute before:inset-0',
    'before:rounded-[inherit] before:transition-colors before:duration-100',
  ],
  {
    variants: {
      selected: {
        true: [
          'text-primary-500 bg-primary-100',
          'hover:before:bg-primary-500/20',
        ],
        false: [
          'text-grayscale-opacity-800 bg-grayscale-opacity-200',
          'hover:before:bg-grayscale-opacity-800/20',
        ],
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export type ChipVariants = VariantProps<typeof chipVariants>;

export function Chip(props: ChipProps) {
  const { children, selected, onChange, icon, className, style } =
    props;

  return (
    <button
      type="button"
      onClick={() => {
        onChange?.(!selected);
      }}
      data-state={selected ? 'selected' : 'unselected'}
      className={cn(
        chipVariants({ selected }),
        '[&:has(>[data-slot=chip-icon])]:pl-3.5',
        className,
      )}
      style={style}
    >
      {icon && (
        <span data-slot="chip-icon" className="flex items-center">
          {icon}
        </span>
      )}
      <span className="flex items-center">{children}</span>
    </button>
  );
}
