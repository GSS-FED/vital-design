'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { useEffect, useState } from 'react';

type Manager = 'pnpm' | 'npm' | 'yarn' | 'bun';
const MANAGERS: Manager[] = ['pnpm', 'npm', 'yarn', 'bun'];
const STORAGE_KEY = 'vital-design:pm';

export function CodeBlockCommand({
  __npm__,
  __pnpm__,
  __yarn__,
  __bun__,
}: {
  __npm__?: string;
  __pnpm__?: string;
  __yarn__?: string;
  __bun__?: string;
}) {
  const commands: Record<Manager, string | undefined> = {
    pnpm: __pnpm__,
    npm: __npm__,
    yarn: __yarn__,
    bun: __bun__,
  };

  const [active, setActive] = useState<Manager>('pnpm');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && MANAGERS.includes(stored as Manager)) {
      setActive(stored as Manager);
    }
  }, []);

  const select = (next: Manager) => {
    setActive(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = commands[active] ?? '';

  return (
    <div className="not-prose my-4 overflow-hidden rounded-xl border border-grayscale-opacity-200 bg-white">
      <BaseTabs.Root
        value={active}
        onValueChange={(v) => select(v as Manager)}
      >
        <div className="flex items-center justify-between gap-2 border-b border-grayscale-opacity-200 bg-grayscale-100 px-3 py-1.5">
          <BaseTabs.List className="flex items-center gap-1 text-xs">
            {MANAGERS.map((m) => (
              <BaseTabs.Tab
                key={m}
                value={m}
                disabled={!commands[m]}
                className="cursor-pointer rounded-md px-2 py-1 font-mono text-grayscale-opacity-700 transition-colors hover:text-grayscale-opacity-900 data-[active]:bg-white data-[active]:text-grayscale-opacity-900 data-[active]:shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                {m}
              </BaseTabs.Tab>
            ))}
          </BaseTabs.List>
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(value).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              });
            }}
            className="inline-flex h-6 items-center rounded-md px-2 text-xs font-medium text-grayscale-opacity-700 transition-colors hover:bg-white hover:text-grayscale-opacity-900"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </BaseTabs.Root>
      <pre className="overflow-auto px-4 py-3 font-mono text-[13px] leading-6 text-grayscale-opacity-900">
        <code>{value}</code>
      </pre>
    </div>
  );
}
