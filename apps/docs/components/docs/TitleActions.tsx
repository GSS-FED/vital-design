'use client';

import { type ReactNode, useState } from 'react';

const copyLabels = {
  en: {
    markdown: 'Copy Markdown',
    registry: 'Copy registry URL',
    copied: 'Copied',
  },
  'zh-tw': {
    markdown: '複製 Markdown',
    registry: '複製 registry URL',
    copied: '已複製',
  },
} as const;

// Fetches the page's .md file (scripts/markdown.ts) on click. Passing the
// pending text to ClipboardItem keeps the click's user activation in
// Safari, which rejects writeText after an await.
function copyMarkdown(markdownUrl: string) {
  const text = fetch(markdownUrl).then((res) => {
    if (!res.ok) throw new Error(`${markdownUrl}: ${res.status}`);
    return res.text();
  });
  return navigator.clipboard.write([
    new ClipboardItem({ 'text/plain': text }),
  ]);
}

export function TitleActions({
  markdownUrl,
  registryUrl,
  locale = 'en',
}: {
  markdownUrl: string;
  registryUrl?: string;
  locale?: keyof typeof copyLabels;
}) {
  const labels = copyLabels[locale];

  return (
    <div className="not-prose -mt-2 mb-6 flex flex-wrap items-center gap-2">
      <CopyButton
        copy={() => copyMarkdown(markdownUrl)}
        label={labels.markdown}
        copiedLabel={labels.copied}
      >
        <CopyIcon className="size-3.5" />
      </CopyButton>
      {registryUrl ? (
        <CopyButton
          copy={() => navigator.clipboard.writeText(registryUrl)}
          label={labels.registry}
          copiedLabel={labels.copied}
        >
          <ChainIcon className="size-3.5" />
        </CopyButton>
      ) : null}
    </div>
  );
}

function CopyButton({
  copy,
  label,
  copiedLabel,
  children,
}: {
  copy: () => Promise<void>;
  label: string;
  copiedLabel: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        void copy().then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="inline-flex h-7 items-center gap-1.5 rounded-md border border-grayscale-opacity-200 bg-background px-2.5 text-xs font-medium text-grayscale-opacity-800 shadow-sm transition-colors hover:bg-grayscale-100"
    >
      {copied ? <CheckIcon className="size-3.5" /> : children}
      {copied ? copiedLabel : label}
    </button>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ChainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
