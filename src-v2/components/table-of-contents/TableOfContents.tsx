'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  FocusEvent,
  MouseEvent,
} from 'react';

export type TableOfContentsLevel = 1 | 2 | 3;

export type TableOfContentsItem = {
  id: string;
  label: string;
  level?: TableOfContentsLevel;
  href?: string;
};

export type TableOfContentsProps = Omit<
  ComponentPropsWithoutRef<'nav'>,
  'defaultValue' | 'onChange'
> & {
  items: TableOfContentsItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  side?: 'left' | 'right';
  expanded?: boolean;
};

const tickWidth: Record<TableOfContentsLevel, string> = {
  1: 'w-6',
  2: 'w-4',
  3: 'w-2',
};

const labelLevel: Record<TableOfContentsLevel, string> = {
  1: 'pt-1 text-sm leading-5 font-medium',
  2: 'pl-3 text-[13px] leading-5 font-medium',
  3: 'pl-6 text-xs leading-4 font-normal',
};

const TableOfContents = forwardRef<
  ElementRef<'nav'>,
  TableOfContentsProps
>(function TableOfContents(
  {
    items,
    value: controlledValue,
    defaultValue,
    onValueChange,
    side = 'right',
    expanded,
    'aria-label': ariaLabel = 'Table of contents',
    className,
    ...navProps
  },
  ref,
) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeId = isControlled ? controlledValue : internalValue;

  const isRight = side === 'right';
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const isExpandControlled = expanded !== undefined;
  const open = isExpandControlled ? expanded : hovered || focused;

  const interactionProps = isExpandControlled
    ? {}
    : {
        onPointerEnter: () => setHovered(true),
        onPointerLeave: () => setHovered(false),
        onFocus: () => setFocused(true),
        onBlur: (event: FocusEvent<HTMLElement>) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocused(false);
          }
        },
      };

  const select = (item: TableOfContentsItem, event: MouseEvent) => {
    if (event.defaultPrevented) return;
    if (!isControlled) setInternalValue(item.id);
    onValueChange?.(item.id);
  };

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      data-slot="table-of-contents"
      data-side={side}
      data-state={open ? 'open' : 'closed'}
      className={cn(
        'relative w-fit font-sans',
        isRight ? 'py-2 pl-4' : 'py-2 pr-4',
        className,
      )}
      {...navProps}
      {...interactionProps}
    >
      <ol data-slot="toc-rail" className="flex w-6 flex-col">
        {items.map((item) => {
          const level = item.level ?? 1;
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={item.href ?? `#${item.id}`}
                aria-label={item.label}
                aria-current={active ? 'location' : undefined}
                data-slot="toc-rail-link"
                data-active={active ? '' : undefined}
                data-level={level}
                onClick={(event) => select(item, event)}
                className={cn(
                  'flex w-full py-1 rounded-[1px] outline-none focus-visible:shadow-focus-primary',
                  isRight ? 'justify-end' : 'justify-start',
                )}
              >
                <span
                  aria-hidden
                  data-slot="toc-tick"
                  className={cn(
                    'block h-0.5 rounded-[1px] transition-colors',
                    tickWidth[level],
                    active
                      ? 'bg-primary-500'
                      : 'bg-grayscale-opacity-300',
                  )}
                />
              </a>
            </li>
          );
        })}
      </ol>
      <div
        aria-hidden
        data-slot="toc-panel"
        data-state={open ? 'open' : 'closed'}
        style={{ width: 232, maxHeight: 556 }}
        className={cn(
          'absolute top-0 z-10 flex-col overflow-hidden rounded bg-white px-4 py-3 shadow-emphasis',
          open ? 'flex' : 'hidden',
          isRight ? 'right-0' : 'left-0',
        )}
      >
        <ol
          data-slot="toc-panel-list"
          className="flex flex-1 flex-col gap-2 overflow-y-auto"
        >
          {items.map((item) => {
            const level = item.level ?? 1;
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={item.href ?? `#${item.id}`}
                  tabIndex={-1}
                  data-slot="toc-panel-item"
                  data-active={active ? '' : undefined}
                  data-level={level}
                  onClick={(event) => select(item, event)}
                  className={cn(
                    'block wrap-break-word',
                    labelLevel[level],
                    active
                      ? 'text-primary-500'
                      : 'text-grayscale-opacity-800',
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
        <div
          aria-hidden
          data-slot="toc-panel-fade"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-linear-to-t from-white to-transparent"
        />
      </div>
    </nav>
  );
});

export { TableOfContents };
