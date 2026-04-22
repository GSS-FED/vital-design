import { cn } from '@/utils/cn';

export type ListItemProps = {
  $selected?: boolean;
  $disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function ListItem({
  $selected,
  $disabled,
  children,
  onClick,
  className,
}: ListItemProps) {
  return (
    <li
      onClick={onClick}
      className={cn(
        'flex items-center list-none',
        'py-1.5 px-5',
        'text-sm font-normal leading-5',
        // Color based on state
        $disabled && 'text-grayscale-500',
        !$disabled && $selected && 'text-primary-500',
        !$disabled && !$selected && 'text-grayscale-800',
        // Hover state
        !$disabled && [
          'hover:border-none hover:outline-none hover:cursor-pointer',
          'hover:bg-grayscale-100',
        ],
        // Active state
        !$disabled && 'active:bg-grayscale-200',
        className,
      )}
    >
      {children}
    </li>
  );
}
