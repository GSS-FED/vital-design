import { CloseIcon } from '@/icons/CloseIcon';
import { cn } from '@/utils/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import type { CSSProperties, ReactNode } from 'react';

type Color =
  | 'default'
  | 'teal'
  | 'olive'
  | 'brown'
  | 'rose'
  | 'indigo'
  | 'blue'
  | 'green'
  | 'gold'
  | 'red'
  | 'purple'
  | 'navy';

type ColorVariant = 'solid' | 'tint';

export type TagProps = {
  color?: Color;
  colorVariant?: ColorVariant;
  children: ReactNode;
  icon?: ReactNode;
  removable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
  style?: CSSProperties;
};

const tagVariants = cva(
  // Base classes
  [
    'relative inline-flex text-xs leading-5 rounded-full',
    'outline-2 outline-transparent outline-offset-2',
    'transition-[outline-color] duration-100',
    'font-sans box-border',
  ],
  {
    variants: {
      color: {
        default: '',
        teal: '',
        olive: '',
        brown: '',
        rose: '',
        indigo: '',
        blue: '',
        green: '',
        gold: '',
        red: '',
        purple: '',
        navy: '',
      },
      colorVariant: {
        solid: '',
        tint: '',
      },
      selected: {
        true: 'outline-primary-500',
        false: '',
      },
    },
    compoundVariants: [
      // default color
      {
        color: 'default',
        colorVariant: 'solid',
        class: 'text-white bg-grayscale-700',
      },
      {
        color: 'default',
        colorVariant: 'tint',
        class: 'text-grayscale-700 bg-grayscale-200',
      },
      // teal
      {
        color: 'teal',
        colorVariant: 'solid',
        class: 'text-white bg-tag-teal-solid',
      },
      {
        color: 'teal',
        colorVariant: 'tint',
        class: 'text-tag-teal-solid bg-tag-teal-tint',
      },
      // olive
      {
        color: 'olive',
        colorVariant: 'solid',
        class: 'text-white bg-tag-olive-solid',
      },
      {
        color: 'olive',
        colorVariant: 'tint',
        class: 'text-tag-olive-solid bg-tag-olive-tint',
      },
      // brown
      {
        color: 'brown',
        colorVariant: 'solid',
        class: 'text-white bg-tag-brown-solid',
      },
      {
        color: 'brown',
        colorVariant: 'tint',
        class: 'text-tag-brown-solid bg-tag-brown-tint',
      },
      // rose
      {
        color: 'rose',
        colorVariant: 'solid',
        class: 'text-white bg-tag-rose-solid',
      },
      {
        color: 'rose',
        colorVariant: 'tint',
        class: 'text-tag-rose-solid bg-tag-rose-tint',
      },
      // indigo
      {
        color: 'indigo',
        colorVariant: 'solid',
        class: 'text-white bg-tag-indigo-solid',
      },
      {
        color: 'indigo',
        colorVariant: 'tint',
        class: 'text-tag-indigo-solid bg-tag-indigo-tint',
      },
      // blue
      {
        color: 'blue',
        colorVariant: 'solid',
        class: 'text-white bg-tag-blue-solid',
      },
      {
        color: 'blue',
        colorVariant: 'tint',
        class: 'text-tag-blue-solid bg-tag-blue-tint',
      },
      // green
      {
        color: 'green',
        colorVariant: 'solid',
        class: 'text-white bg-tag-green-solid',
      },
      {
        color: 'green',
        colorVariant: 'tint',
        class: 'text-tag-green-solid bg-tag-green-tint',
      },
      // gold
      {
        color: 'gold',
        colorVariant: 'solid',
        class: 'text-white bg-tag-gold-solid',
      },
      {
        color: 'gold',
        colorVariant: 'tint',
        class: 'text-tag-gold-solid bg-tag-gold-tint',
      },
      // red
      {
        color: 'red',
        colorVariant: 'solid',
        class: 'text-white bg-tag-red-solid',
      },
      {
        color: 'red',
        colorVariant: 'tint',
        class: 'text-tag-red-solid bg-tag-red-tint',
      },
      // purple
      {
        color: 'purple',
        colorVariant: 'solid',
        class: 'text-white bg-tag-purple-solid',
      },
      {
        color: 'purple',
        colorVariant: 'tint',
        class: 'text-tag-purple-solid bg-tag-purple-tint',
      },
      // navy
      {
        color: 'navy',
        colorVariant: 'solid',
        class: 'text-white bg-tag-navy-solid',
      },
      {
        color: 'navy',
        colorVariant: 'tint',
        class: 'text-tag-navy-solid bg-tag-navy-tint',
      },
    ],
    defaultVariants: {
      color: 'default',
      colorVariant: 'solid',
      selected: false,
    },
  },
);

export type TagVariants = VariantProps<typeof tagVariants>;

export default function Tag(props: TagProps) {
  const {
    children,
    icon,
    removable,
    selected,
    onClick,
    onRemove,
    color = 'default',
    colorVariant = 'solid',
    className,
    style,
  } = props;

  const hasIcon = !!icon;
  const isRemovable = !!removable;
  const isSelected = !!selected;
  const isClickable = !!onClick;

  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={cn(
        tagVariants({ color, colorVariant, selected: isSelected }),
        className,
      )}
      style={style}
    >
      <div
        role="button"
        tabIndex={isClickable ? 0 : undefined}
        aria-disabled={!isClickable}
        onClick={onClick}
        className={cn(
          'relative flex gap-1 px-2.5',
          hasIcon && 'pl-2',
          isRemovable ? 'pr-1 rounded-l-full' : 'rounded-full',
          'before:content-[""] before:absolute before:inset-0',
          'before:pointer-events-none before:transition-colors before:duration-100',
          isClickable && 'cursor-pointer hover:before:bg-white/20',
        )}
      >
        {hasIcon && <div className="flex items-center">{icon}</div>}
        <div className="ml-auto">{children}</div>
      </div>
      {isRemovable && (
        <button
          type="button"
          aria-label="Remove"
          onClick={(event) => {
            event.stopPropagation();
            onRemove?.();
          }}
          className={cn(
            'relative inline-flex justify-center items-center',
            'pl-1 pr-2 rounded-r-full cursor-pointer',
            'transition-colors duration-100',
            'before:content-[""] before:absolute before:inset-0',
            'before:pointer-events-none before:transition-colors before:duration-100',
            'hover:before:bg-white/20',
            '[&_svg]:w-2.25 [&_svg]:h-2.25',
          )}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
Tag.displayName = 'Tag';
