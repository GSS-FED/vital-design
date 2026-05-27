'use client';

import { type ReactNode, useState } from 'react';

export function TitleActions({
  rawMarkdown,
  registryUrl,
}: {
  rawMarkdown?: string;
  registryUrl?: string;
}) {
  if (!rawMarkdown && !registryUrl) return null;

  return (
    <div className="not-prose -mt-2 mb-6 flex flex-wrap items-center gap-2">
      {rawMarkdown ? (
        <CopyButton value={rawMarkdown} label="Copy Markdown">
          <CopyIcon className="size-3.5" />
        </CopyButton>
      ) : null}
      {registryUrl ? (
        <CopyButton value={registryUrl} label="Copy registry URL">
          <ChainIcon className="size-3.5" />
        </CopyButton>
      ) : null}
    </div>
  );
}

function CopyButton({
  value,
  label,
  children,
}: {
  value: string;
  label: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="inline-flex h-7 items-center gap-1.5 rounded-md border border-grayscale-opacity-200 bg-white px-2.5 text-xs font-medium text-grayscale-opacity-800 shadow-sm transition-colors hover:bg-grayscale-100"
    >
      {copied ? <CheckIcon className="size-3.5" /> : children}
      {copied ? 'Copied' : label}
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
