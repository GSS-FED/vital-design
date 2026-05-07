import type { ReactNode } from 'react';

type ColorEntry = {
  name: string;
  value?: string;
  utility?: string;
};

export function ColorSwatch({ name, value, utility }: ColorEntry) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-grayscale-200 bg-white p-3">
      <div
        className="size-10 shrink-0 rounded-md border border-grayscale-300/60"
        style={{ background: `var(${name})` }}
      />
      <div className="min-w-0 flex-1">
        <div className="font-mono text-xs text-grayscale-900">
          {name}
        </div>
        {value ? (
          <div className="font-mono text-xs text-grayscale-600">
            {value}
          </div>
        ) : null}
        {utility ? (
          <div className="font-mono text-[11px] text-grayscale-500">
            {utility}
          </div>
        ) : null}
      </div>
    </div>
  );
}

type ColorPaletteProps = {
  tokens: ColorEntry[];
  columns?: 2 | 3 | 4 | 5;
};

export function ColorPalette({
  tokens,
  columns = 5,
}: ColorPaletteProps) {
  const cols =
    columns === 5
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
      : columns === 4
        ? 'grid-cols-2 sm:grid-cols-4'
        : columns === 3
          ? 'grid-cols-2 sm:grid-cols-3'
          : 'grid-cols-2';
  return (
    <div className={`not-prose my-4 grid gap-2 ${cols}`}>
      {tokens.map((token) => (
        <ColorSwatch key={token.name} {...token} />
      ))}
    </div>
  );
}

type AvatarSwatchEntry = {
  name: string;
  color: string;
  border: string;
  bg: string;
};

export function AvatarPalette({
  tokens,
}: {
  tokens: AvatarSwatchEntry[];
}) {
  return (
    <div className="not-prose my-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {tokens.map((token) => (
        <div
          key={token.name}
          className="flex items-center gap-3 rounded-md border border-grayscale-200 bg-white p-3"
        >
          <div
            className="flex size-10 items-center justify-center rounded-full border text-sm font-semibold"
            style={{
              background: `var(${token.bg})`,
              borderColor: `var(${token.border})`,
              color: `var(${token.color})`,
            }}
          >
            Aa
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-grayscale-800">
              {token.name}
            </div>
            <div className="font-mono text-[11px] text-grayscale-500">
              --avatar-{token.name}-*
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

type TagSwatchEntry = {
  name: string;
  solid: string;
  tint: string;
};

export function TagPalette({ tokens }: { tokens: TagSwatchEntry[] }) {
  return (
    <div className="not-prose my-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {tokens.map((token) => (
        <div
          key={token.name}
          className="flex items-center gap-3 rounded-md border border-grayscale-200 bg-white p-3"
        >
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium"
            style={{
              background: `var(${token.tint})`,
              color: `var(${token.solid})`,
            }}
          >
            Tag
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-grayscale-800">
              {token.name}
            </div>
            <div className="font-mono text-[11px] text-grayscale-500">
              --tag-{token.name}-*
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

type RadiusEntry = {
  name: string;
  value: string;
  utility?: string;
};

export function RadiusPalette({ tokens }: { tokens: RadiusEntry[] }) {
  return (
    <div className="not-prose my-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {tokens.map((token) => (
        <div
          key={token.name}
          className="flex flex-col items-center gap-2 rounded-md border border-grayscale-200 bg-white p-4"
        >
          <div
            className="size-16 border border-primary-300 bg-primary-100"
            style={{ borderRadius: `var(${token.name})` }}
          />
          <div className="text-center">
            <div className="font-mono text-xs text-grayscale-900">
              {token.name}
            </div>
            <div className="font-mono text-[11px] text-grayscale-600">
              {token.value}
            </div>
            {token.utility ? (
              <div className="font-mono text-[11px] text-grayscale-500">
                {token.utility}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

type ShadowEntry = {
  name: string;
  utility?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function ShadowPalette({ tokens }: { tokens: ShadowEntry[] }) {
  return (
    <div className="not-prose my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tokens.map((token) => (
        <div
          key={token.name}
          className="flex flex-col items-center gap-3 rounded-md bg-grayscale-100 p-6"
        >
          <div
            className="size-20 rounded-md bg-white"
            style={{ boxShadow: `var(${token.name})` }}
          />
          <div className="text-center">
            <div className="font-mono text-xs text-grayscale-900">
              {token.name}
            </div>
            {token.utility ? (
              <div className="font-mono text-[11px] text-grayscale-500">
                {token.utility}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

type GradientEntry = {
  name: string;
};

export function GradientPalette({
  tokens,
}: {
  tokens: GradientEntry[];
}) {
  return (
    <div className="not-prose my-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {tokens.map((token) => (
        <div
          key={token.name}
          className="flex flex-col gap-2 rounded-md border border-grayscale-200 bg-white p-3"
        >
          <div
            className="h-20 w-full rounded-md"
            style={{ backgroundImage: `var(${token.name})` }}
          />
          <div className="font-mono text-xs text-grayscale-900">
            {token.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TokenSection({
  title,
  description,
  children,
}: {
  title?: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="my-6">
      {title ? (
        <h3 className="text-base font-semibold text-grayscale-900">
          {title}
        </h3>
      ) : null}
      {description ? (
        <p className="mt-1 text-sm text-grayscale-700">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
