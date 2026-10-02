'use client';

import { Avatar } from '@/components/avatar/Avatar';
import { Calendar } from '@/components/calendar/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger as VitalPopoverTrigger,
} from '@/components/popover/Popover';
import { CheckIcon } from '@/icons/CheckIcon';
import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import {
  PERSON_OPTIONS,
  type PersonOption,
  TAG_OPTIONS,
  type TagOption,
} from './data';

type EditorPayload =
  | {
      kind: 'person';
      value: string | null;
      onCommit: (next: string | null) => void;
    }
  | {
      kind: 'tags';
      value: string[];
      onCommit: (next: string[]) => void;
    }
  | {
      kind: 'date';
      value: string | null;
      onCommit: (next: string | null) => void;
    };

function EditorBody({
  payload,
  close,
}: {
  payload: EditorPayload;
  close: () => void;
}) {
  switch (payload.kind) {
    case 'person':
      return (
        <PersonEditor
          value={payload.value}
          onCommit={(next) => {
            payload.onCommit(next);
            close();
          }}
        />
      );
    case 'tags':
      return (
        <TagsEditor
          value={payload.value}
          onCommit={(next) => {
            payload.onCommit(next);
          }}
        />
      );
    case 'date':
      return (
        <DateEditor
          value={payload.value}
          onCommit={(next) => {
            payload.onCommit(next);
            close();
          }}
        />
      );
  }
}

function PersonEditor({
  value,
  onCommit,
}: {
  value: string | null;
  onCommit: (next: string | null) => void;
}) {
  return (
    <ul role="listbox" className="flex w-56 flex-col gap-0.5 p-1.5">
      <li>
        <button
          type="button"
          onClick={() => onCommit(null)}
          className={cn(
            'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-grayscale-opacity-500 hover:bg-grayscale-opacity-150',
            value === null && 'bg-grayscale-opacity-150',
          )}
        >
          <Avatar fallback="?" size="xs" color="default" />
          未指派
        </button>
      </li>
      {PERSON_OPTIONS.map((person) => (
        <li key={person.id}>
          <button
            type="button"
            onClick={() => onCommit(person.id)}
            className={cn(
              'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-grayscale-opacity-800 hover:bg-grayscale-opacity-150',
              value === person.id && 'bg-grayscale-opacity-150',
            )}
          >
            <Avatar
              fallback={person.name.slice(0, 1)}
              size="xs"
              color={person.color}
            />
            {person.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function TagsEditor({
  value,
  onCommit,
}: {
  value: string[];
  onCommit: (next: string[]) => void;
}) {
  const toggle = (id: string) => {
    const next = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
    onCommit(next);
  };

  return (
    <ul
      role="listbox"
      aria-multiselectable="true"
      className="flex w-56 flex-col gap-0.5 p-1.5"
    >
      {TAG_OPTIONS.map((tag) => {
        const checked = value.includes(tag.id);
        return (
          <li key={tag.id}>
            <button
              type="button"
              role="option"
              aria-selected={checked}
              data-slot="tags-editor-option"
              data-selected={checked ? '' : undefined}
              onClick={() => toggle(tag.id)}
              className={cn(
                'flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-grayscale-opacity-800 outline-none select-none',
                'transition-colors duration-200 hover:bg-grayscale-opacity-150 focus-visible:bg-grayscale-opacity-150',
              )}
            >
              <span
                aria-hidden="true"
                data-slot="tags-editor-option-checkbox"
                className={cn(
                  'grid size-4 shrink-0 place-content-center rounded-xs border border-grayscale-opacity-300 bg-white text-white transition-colors duration-200',
                  checked && 'border-primary-500 bg-primary-500',
                )}
              >
                {checked ? <CheckIcon className="size-2.5" /> : null}
              </span>
              <span className="inline-flex rounded-full bg-grayscale-700 px-2.5 font-sans text-xs leading-5 text-white">
                {tag.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function DateEditor({
  value,
  onCommit,
}: {
  value: string | null;
  onCommit: (next: string | null) => void;
}) {
  const selected = value ? new Date(value) : undefined;
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={(date) => {
        onCommit(date ? formatDate(date) : null);
      }}
    />
  );
}

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

export type PopoverEditTriggerProps = ComponentPropsWithoutRef<
  typeof VitalPopoverTrigger
> & {
  payload: EditorPayload;
};

export const PopoverEditTrigger = forwardRef<
  HTMLButtonElement,
  PopoverEditTriggerProps
>(function PopoverEditTrigger(
  { payload, className, children, ...props },
  ref,
) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <VitalPopoverTrigger
        ref={ref}
        type="button"
        data-slot="popover-edit-trigger"
        className={cn(
          'box-border inline-flex h-8 w-full items-center rounded border border-transparent bg-transparent px-2 py-1 text-left font-sans text-sm leading-5 text-grayscale-opacity-800 outline-none transition-colors duration-200',
          'hover:border-grayscale-opacity-300 focus-visible:border-primary-500',
          'data-[popup-open]:border-primary-500',
          className,
        )}
        {...props}
      >
        {children}
      </VitalPopoverTrigger>
      <PopoverContent
        data-slot="editable-popover"
        className="p-0"
        sideOffset={4}
      >
        <EditorBody payload={payload} close={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
});

export type {
  EditorPayload,
  PersonOption as PersonEditorOption,
  TagOption as TagEditorOption,
};
