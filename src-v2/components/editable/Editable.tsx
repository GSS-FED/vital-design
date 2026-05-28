'use client';

import { Input } from '@/components/input/input/Input';
import { cn } from '@/lib/utils';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
} from 'react';

const textSelectionInputTypes = new Set([
  'email',
  'password',
  'search',
  'tel',
  'text',
  'url',
]);

function moveCaretToEnd(
  node: HTMLInputElement | HTMLTextAreaElement,
) {
  if (
    node instanceof HTMLInputElement &&
    !textSelectionInputTypes.has(node.type)
  ) {
    return;
  }

  const end = node.value.length;
  node.setSelectionRange(end, end);
}

type EditableContextValue = {
  value: string;
  stagedValue: string;
  setStagedValue: (next: string) => void;
  isEditing: boolean;
  enterEdit: () => void;
  commitAndExit: () => void;
  cancelAndExit: () => void;
  disabled: boolean;
  readOnly: boolean;
  placeholder?: string;
};

const EditableContext = createContext<EditableContextValue | null>(
  null,
);

function useEditableContext() {
  const ctx = useContext(EditableContext);
  if (!ctx) {
    throw new Error(
      'Editable subcomponents must be rendered inside <Editable>',
    );
  }
  return ctx;
}

export type EditableProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange' | 'defaultValue'
> & {
  value?: string;
  defaultValue?: string;
  onCommit?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  children: ReactNode;
};

const Editable = forwardRef<HTMLDivElement, EditableProps>(
  function Editable(
    {
      value: controlledValue,
      defaultValue,
      onCommit,
      disabled = false,
      readOnly = false,
      placeholder,
      className,
      children,
      ...divProps
    },
    ref,
  ) {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(
      defaultValue ?? '',
    );
    const value = isControlled
      ? (controlledValue ?? '')
      : internalValue;

    const [isEditing, setIsEditing] = useState(false);
    const [stagedValue, setStagedValue] = useState(value);

    const enterEdit = useCallback(() => {
      if (disabled || readOnly) return;
      setStagedValue(value);
      setIsEditing(true);
    }, [disabled, readOnly, value]);

    const commitAndExit = useCallback(() => {
      setIsEditing(false);
      if (stagedValue !== value) {
        if (!isControlled) setInternalValue(stagedValue);
        onCommit?.(stagedValue);
      }
    }, [stagedValue, value, isControlled, onCommit]);

    const cancelAndExit = useCallback(() => {
      setStagedValue(value);
      setIsEditing(false);
    }, [value]);

    const ctx = useMemo<EditableContextValue>(
      () => ({
        value,
        stagedValue,
        setStagedValue,
        isEditing,
        enterEdit,
        commitAndExit,
        cancelAndExit,
        disabled,
        readOnly,
        placeholder,
      }),
      [
        value,
        stagedValue,
        isEditing,
        enterEdit,
        commitAndExit,
        cancelAndExit,
        disabled,
        readOnly,
        placeholder,
      ],
    );

    return (
      <EditableContext.Provider value={ctx}>
        <div
          ref={ref}
          data-slot="editable"
          data-editing={isEditing || undefined}
          data-disabled={disabled || undefined}
          data-readonly={readOnly || undefined}
          className={cn('relative inline-flex w-full', className)}
          {...divProps}
        >
          {children}
        </div>
      </EditableContext.Provider>
    );
  },
);

export type EditableDisplayProps = ComponentPropsWithoutRef<'button'>;

const EditableDisplay = forwardRef<
  HTMLButtonElement,
  EditableDisplayProps
>(function EditableDisplay({ className, children, ...props }, ref) {
  const {
    value,
    isEditing,
    enterEdit,
    disabled,
    readOnly,
    placeholder,
  } = useEditableContext();

  if (isEditing) return null;

  const isEmpty = value.length === 0;

  return (
    <button
      ref={ref}
      type="button"
      data-slot="editable-display"
      data-empty={isEmpty || undefined}
      disabled={disabled || readOnly}
      onClick={enterEdit}
      className={cn(
        'box-border inline-flex h-8 w-full min-w-0 items-center rounded border border-transparent bg-transparent px-2 py-1.5 text-left font-sans text-sm leading-5 text-grayscale-opacity-800 outline-none transition-[border-color,background-color,color] duration-200',
        'hover:border-grayscale-opacity-300 focus-visible:border-primary-500',
        'data-[empty]:border-grayscale-opacity-300 data-[empty]:text-grayscale-opacity-400',
        'disabled:cursor-not-allowed disabled:hover:border-transparent',
        className,
      )}
      {...props}
    >
      {children ?? (
        <span className="min-w-0 truncate">
          {isEmpty ? placeholder : value}
        </span>
      )}
    </button>
  );
});

export type EditableInputProps = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  'value' | 'defaultValue' | 'onChange' | 'appearance'
>;

type InputElement = ElementRef<typeof Input>;

const EditableInput = forwardRef<InputElement, EditableInputProps>(
  function EditableInput({ className, onKeyDown, ...props }, ref) {
    const {
      stagedValue,
      setStagedValue,
      isEditing,
      commitAndExit,
      cancelAndExit,
    } = useEditableContext();
    const innerRef = useRef<InputElement | null>(null);

    useEffect(() => {
      if (!isEditing) return;
      const node = innerRef.current;
      if (!node) return;
      node.focus();
      if (node instanceof HTMLInputElement) moveCaretToEnd(node);
    }, [isEditing]);

    if (!isEditing) return null;

    return (
      <Input
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        data-slot="editable-input"
        appearance="ghost"
        value={stagedValue}
        onChange={(event) => setStagedValue(event.target.value)}
        onBlur={commitAndExit}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            cancelAndExit();
          } else if (event.key === 'Enter') {
            event.preventDefault();
            commitAndExit();
          }
          onKeyDown?.(event);
        }}
        className={cn(
          'border-grayscale-opacity-300 transition-[border-color,background-color,color] duration-200',
          className,
        )}
        {...props}
      />
    );
  },
);

export type EditableTextareaProps = Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'value' | 'defaultValue' | 'onChange'
>;

const EditableTextarea = forwardRef<
  HTMLTextAreaElement,
  EditableTextareaProps
>(function EditableTextarea({ className, onKeyDown, ...props }, ref) {
  const {
    stagedValue,
    setStagedValue,
    isEditing,
    commitAndExit,
    cancelAndExit,
  } = useEditableContext();
  const innerRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isEditing) return;
    const node = innerRef.current;
    if (!node) return;
    node.focus();
    moveCaretToEnd(node);
  }, [isEditing]);

  if (!isEditing) return null;

  return (
    <textarea
      ref={(node) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      data-slot="editable-textarea"
      value={stagedValue}
      onChange={(event) => setStagedValue(event.target.value)}
      onBlur={commitAndExit}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          cancelAndExit();
        }
        onKeyDown?.(event);
      }}
      className={cn(
        'box-border w-full min-w-0 rounded border border-transparent bg-transparent px-2 py-1.5 font-sans text-sm leading-5 font-normal text-grayscale-opacity-800 outline-none transition-colors duration-200',
        'placeholder:text-grayscale-opacity-400 hover:border-grayscale-opacity-500 focus-visible:border-primary-500',
        'aria-invalid:border-destructive-500',
        className,
      )}
      {...props}
    />
  );
});

export { Editable, EditableDisplay, EditableInput, EditableTextarea };
