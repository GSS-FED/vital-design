---
name: use-vital-design
description: "Use when composing UI from Vital Design v2: installing registry components, building app UI with them, or restyling an existing app onto Vital Design."
allowed-tools: Read, Write, Edit, Bash
---

# Use Vital Design

Guide for assembling Vital Design in a **consumer** app (copied registry components, not the library source tree).

## Invariants

1. **Consumer imports.** Import each primitive and icon from the exact file the CLI wrote (typically `@/components/ui/Button`, `@/components/icons/SearchIcon`).

   ```typescript
   import { SearchIcon } from '@/components/icons/SearchIcon';
   ```

2. **Icon slots.** Icons are Button/SplitButton children marked with `data-icon`.

   ```tsx
   <Button>
     <SearchIcon data-icon="inline-start" />
     Search
   </Button>
   ```

3. **Token color.** Layout/chrome uses token utilities (`bg-primary-500`, `text-grayscale-opacity-900`, `border-grayscale-opacity-200`) merged with `cn(...)`. Button/SplitButton **color** is the primitive `theme` prop (`primary`, `default`, `success`, …). Ghost without `theme` is primary; pass `theme="default"` for a quiet action.

## Workflow

### 1. Host

The app must be a shadcn consumer of this registry:

- `components.json` has `"@vital-design": "https://vittal.design/r/{name}.json"`
- The global CSS file the app loads starts with `@import 'tailwindcss';` and `@import 'tw-animate-css';`
- Bundler resolves `@/` to the source root

If any are missing, establish the host in this order. Match the bundler and CSS path the app already uses. A Vite plugin plus `src/index.css` is only the Vite shape.

1. Install Tailwind with the package manager matching the lockfile. `tw-animate-css` must be installed here so the CSS import resolves before the first registry add (`vital-theme` depends on it too).

   | Lockfile                  | shadcn runner              |
   | ------------------------- | -------------------------- |
   | `bun.lock` or `bun.lockb` | `bunx --bun shadcn@latest` |
   | `pnpm-lock.yaml`          | `pnpm dlx shadcn@latest`   |
   | `yarn.lock`               | `yarn dlx shadcn@latest`   |
   | `package-lock.json`       | `npx shadcn@latest`        |

   Vite (`vite.config.ts`):

   | Lockfile                  | Install                                                            |
   | ------------------------- | ------------------------------------------------------------------ |
   | `bun.lock` or `bun.lockb` | `bun add -D tailwindcss @tailwindcss/vite tw-animate-css`          |
   | `pnpm-lock.yaml`          | `pnpm add -D tailwindcss @tailwindcss/vite tw-animate-css`         |
   | `yarn.lock`               | `yarn add -D tailwindcss @tailwindcss/vite tw-animate-css`         |
   | `package-lock.json`       | `npm install -D tailwindcss @tailwindcss/vite tw-animate-css`      |

   Add the plugin and an OS-independent `@/` alias (`fileURLToPath` avoids POSIX path assumptions in Node and Bun ESM configs):

   ```ts
   import tailwindcss from '@tailwindcss/vite';
   import { URL, fileURLToPath } from 'node:url';

   // plugins: [tailwindcss(), react()]
   // resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }
   ```

   PostCSS (Next.js and other PostCSS apps) — do not install `@tailwindcss/vite`:

   | Lockfile                  | Install                                                               |
   | ------------------------- | --------------------------------------------------------------------- |
   | `bun.lock` or `bun.lockb` | `bun add -D tailwindcss @tailwindcss/postcss tw-animate-css`          |
   | `pnpm-lock.yaml`          | `pnpm add -D tailwindcss @tailwindcss/postcss tw-animate-css`         |
   | `yarn.lock`               | `yarn add -D tailwindcss @tailwindcss/postcss tw-animate-css`         |
   | `package-lock.json`       | `npm install -D tailwindcss @tailwindcss/postcss tw-animate-css`      |

   ```js
   // postcss.config.js (or .cjs / .mjs, matching the project)
   export default {
     plugins: {
       '@tailwindcss/postcss': {},
     },
   };
   ```

   If `@/` does not already resolve for the typechecker, add `paths` to the tsconfig that includes the source. Do not set `baseUrl` (deprecated since TS 6). Point the target at the source root (`./src/*`, `./app/*`, or `./*`):

   ```json
   { "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
   ```

   The current Vite template's root `tsconfig.json` is a solution file (`"files": []` and `references` only). `tsc -b` typechecks `src` with `tsconfig.app.json`, and `paths` on the solution file are not applied. Put the block in `tsconfig.app.json`. A project whose single tsconfig already includes the source (typical Next.js) puts the block in that file. The Vite `resolve.alias` above stays either way: it is what the dev server and the production bundle use.

2. In the global CSS file the app entry already imports, replace any competing framework import with the two lines below, then remove that framework's package (e.g. `bun remove bootstrap bootstrap-icons`). Do not add a second stylesheet. Overlay components (`Dialog`, `DropdownMenu`, `Select`, `Popover`, `Combobox`, `Tooltip`) use `animate-in` / `fade-in` / `zoom-in` from `tw-animate-css`.

   ```css
   @import 'tailwindcss';
   @import 'tw-animate-css';
   ```

3. Write `components.json` by hand, which keeps the run non-interactive. Set `tailwind.css` to the file from step 2. shadcn writes theme tokens into that path; a file the app never loads leaves every token utility unset. Vite apps that import `src/index.css` use that path. Next.js App Router uses `app/globals.css`.

   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "default",
     "rsc": false,
     "tsx": true,
     "tailwind": {
       "config": "",
       "css": "src/index.css",
       "baseColor": "slate",
       "cssVariables": true
     },
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils",
       "ui": "@/components/ui",
       "lib": "@/lib",
       "hooks": "@/hooks"
     },
     "registries": {
       "@vital-design": {
         "url": "https://vittal.design/r/{name}.json",
         "style": "default"
       }
     }
   }
   ```

   Replace `"css"` before saving. The value above is for a Vite app that imports `src/index.css`. Next.js App Router uses `app/globals.css`.

4. Let the first registry `add` create `src/lib/utils.ts` when it is missing. Re-read it: the registry copy exports `cn` and can differ from a hand-written `clsx` / `tailwind-merge` helper. Leave an existing `utils.ts` in place unless you mean to replace it (see Provision).

**Done when**: `components.json` has the `@vital-design` registry, `tailwind.css` is the stylesheet the app loads and that file begins with both imports, the bundler plugin matches Vite or PostCSS, `@/` resolves from the source root, and `@/lib/utils` resolves after the first add.

### 2. Recipe

Match the request to [composition-guide.md](./composition-guide.md). For props, slots, or variants the guide does not list, fetch `https://vittal.design/r/{name}.json` (source of truth). The HTML doc page is client-rendered and often empty over plain HTTP; use a browser only for rendered examples.

The icon set is small (a few dozen glyphs), so list what is published before mapping any icon, instead of guessing names from another icon library:

```bash
curl -s https://vittal.design/r/registry.json | python3 -c "import json,sys; print(' '.join(i['name'] for i in json.load(sys.stdin)['items']))"
```

Map each old glyph to a listed name (dismiss is `icon-close`, reveal is `icon-eye` / `icon-eye-slash`). A glyph with no match becomes a text label or CSS shape inside the Vital component.

When restyling an app built on Bootstrap, also read [migrating-from-bootstrap.md](./migrating-from-bootstrap.md).

**Done when**: recipe is named and every required primitive and icon is listed.

### 3. Provision

Install missing primitives with the shadcn runner from the Host table:

```bash
<runner> add --yes @vital-design/<name> [@vital-design/<name> …]
```

`--yes` skips the confirmation prompt and leaves existing files unchanged. The `@vital-design/` prefix is required so `registryDependencies` resolve.

Do not pass `--overwrite` on a normal add. It rewrites every differing file in the install set, including dependencies (a customized `Button.tsx` is replaced when a later add pulls `button` in). On a case-insensitive volume, `components/ui/Button.tsx` is the same file as an existing shadcn `button.tsx`.

If a registry-owned `src/lib/utils.ts` is what blocks a non-interactive add, rerun that one command with `--overwrite`, then restore every other previously existing file from version control before continuing.

After `add`, re-read every generated import. If generated code names a missing icon path, provision that icon from the registry, correct the import to its consumer path, and report the registry mismatch upstream.

A registry add can append Vital's `@theme inline` token definitions after existing CSS, so an earlier `@apply bg-grayscale-…` fails because Tailwind has not yet seen that utility. Keep token-dependent `@apply` after the tokens, or use the CSS variable in early global rules (`background: var(--grayscale-100)`).

**Done when**: every listed primitive file exists in the consumer tree.

### 4. Assemble

- Named export: `export function <BlockName>(props: <BlockName>Props)`
- `className?: string` passed through `cn(...)`
- Callbacks optional (`onSearch?: (query: string) => void`)
- Layout classes from the recipe

**Navigation links** stay links. A text link is the router `<Link>` with token utilities. A button-styled link is `LinkButton` from `@/components/ui/Button`:

```tsx
<LinkButton variant="text" render={<Link href="/settings" />}>
  Settings
</LinkButton>
```

`Button` with `nativeButton={false} render={<Link href="…" />}` adds `role="button"` and drops the link role. Do not use it for navigation.

**DropdownMenuTrigger** takes its visible control through `render`:

```tsx
<DropdownMenuTrigger
  render={
    <Button variant="ghost" theme="default">
      EN
    </Button>
  }
/>
```

**Action with a menu** (split button): `SplitButton` has no built-in menu, so compose `ButtonGroup` + `Button` + `DropdownMenu`:

```tsx
<ButtonGroup>
  <Button onClick={markAllDone}>Mark all done</Button>
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button size="icon-md" aria-label="More actions">
          <ChevronDownIcon data-icon="inline-end" />
        </Button>
      }
    />
    <DropdownMenuContent>
      <DropdownMenuItem onClick={clearCompleted}>
        Clear completed
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</ButtonGroup>
```

**`Select`** takes `items` (`{ label, value }[]`) so the closed trigger shows the selected label rather than the raw value.

**`DropdownMenuItem`** closes on pick (use for commands). `DropdownMenuRadioItem` / `CheckboxItem` stay open; for bound values use `Select` / `Combobox`.

**Vital `Checkbox`** is controlled with `checked` (`boolean`) and `onCheckedChange` (`(checked: boolean) => void`). Mixed state is a separate prop, `indeterminate` (`boolean`); `aria-checked` is then `"mixed"`. Do not pass `'indeterminate'` as `checked`.

```tsx
<Checkbox
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onCheckedChange={(checked) => setFieldValue('done', checked)}
/>
```

**Done when**: a fully typed component file is in the project directory and compiles.

### 5. Verify

Re-read every file this run created or edited against Invariants 1–3. Run the production build before the test suite: it validates generated imports, Tailwind compilation, and strictly-typed i18n keys for new copy that unit tests may not load. Then update any tests whose contracts moved.

**Done when**: each invariant holds, the production build succeeds, and the test suite passes.

## Pointers

- Recipes and registry ids: [composition-guide.md](./composition-guide.md)
- Catalog: `https://vittal.design/llms.txt`
- Item source/API: `https://vittal.design/r/{name}.json`
- Rendered docs (browser): `https://vittal.design/docs/components/{name}`
- Tailwind setup: `https://vittal.design/docs/getting-started/tailwind-setup`
