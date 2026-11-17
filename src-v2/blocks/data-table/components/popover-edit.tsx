'use client';

import { Avatar } from '@/components/avatar/Avatar';
import { Calendar } from '@/components/calendar/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover/Popover';
import { Tag } from '@/components/tag/Tag';
import { CheckSolidIcon } from '@/icons/CheckSolidIcon';
import { cn } from '@/lib/utils';
import { type ComponentProps, type ReactNode, useState } from 'react';

type AvatarColor = ComponentProps<typeof Avatar>['color'];

export type PersonOption = {
  id: string;
  name: string;
  color: AvatarColor;
};
export type TagOption = { id: string; label: string };

/**
 * A cell that opens an editor in a popover. The cell shows `children`;
 * `editor` renders the popover body and gets `close` for editors that
 * commit on one pick.
 */
export function PopoverEditCell({
  label,
  children,
  editor,
}: {
  /** Accessible name of the cell button, e.g. `狀態 待覆核`. */
  label: string;
  children: ReactNode;
  editor: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        aria-label={label}
        data-slot="popover-edit-trigger"
        className="inline-flex h-11 w-full min-w-0 items-center rounded-none border border-transparent px-3 text-left outline-none focus-visible:border-primary-500 data-[popup-open]:border-primary-500"
      >
        {children}
      </PopoverTrigger>
      <PopoverContent
        data-slot="popover-edit-content"
        className="w-auto p-1.5"
        align="start"
      >
        {editor(() => setOpen(false))}
      </PopoverContent>
    </Popover>
  );
}

function OptionCheck({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-4 shrink-0 place-content-center rounded-xs border border-grayscale-opacity-300 bg-white text-white transition-colors duration-200',
        checked && 'border-primary-500 bg-primary-500',
      )}
    >
      {checked ? (
        <CheckSolidIcon className="size-4 shrink-0" />
      ) : null}
    </span>
  );
}

const OPTION =
  'flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-grayscale-opacity-800 outline-none select-none hover:bg-grayscale-opacity-150 focus-visible:bg-grayscale-opacity-150';

function toggle(value: readonly string[], id: string) {
  return value.includes(id)
    ? value.filter((item) => item !== id)
    : [...value, id];
}

/** Several people. Stays open; every click commits. */
export function PeopleEditor({
  value,
  options,
  onCommit,
}: {
  value: readonly string[];
  options: readonly PersonOption[];
  onCommit: (next: string[]) => void;
}) {
  return (
    <ul
      role="listbox"
      aria-multiselectable="true"
      className="flex w-56 flex-col gap-0.5"
    >
      {options.map((person) => {
        const checked = value.includes(person.id);
        return (
          <li key={person.id}>
            <button
              type="button"
              role="option"
              aria-selected={checked}
              onClick={() => onCommit(toggle(value, person.id))}
              className={OPTION}
            >
              <OptionCheck checked={checked} />
              <Avatar
                size="xs"
                name={person.name}
                fallback={person.name.slice(0, 1)}
                color={person.color}
              />
              {person.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Several tags. Stays open; every click commits. */
export function TagsEditor({
  value,
  options,
  onCommit,
}: {
  value: readonly string[];
  options: readonly TagOption[];
  onCommit: (next: string[]) => void;
}) {
  return (
    <ul
      role="listbox"
      aria-multiselectable="true"
      className="flex w-56 flex-col gap-0.5"
    >
      {options.map((tag) => {
        const checked = value.includes(tag.id);
        return (
          <li key={tag.id}>
            <button
              type="button"
              role="option"
              aria-selected={checked}
              onClick={() => onCommit(toggle(value, tag.id))}
              className={OPTION}
            >
              <OptionCheck checked={checked} />
              <Tag color="default">{tag.label}</Tag>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

/** One date, as YYYY/MM/DD. Picking the selected day again clears it. */
export function DateEditor({
  value,
  onCommit,
}: {
  value: string;
  onCommit: (next: string) => void;
}) {
  const selected = value ? new Date(value) : undefined;
  return (
    <Calendar
      mode="single"
      selected={selected}
      defaultMonth={selected}
      onSelect={(date) => onCommit(date ? formatDate(date) : '')}
    />
  );
}
