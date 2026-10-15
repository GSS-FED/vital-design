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
- Global CSS starts with `@import 'tailwindcss'`
- Bundler resolves `@/` to the source root

If any are missing, establish the host in this order:

1. Install Tailwind with the package manager matching the lockfile:

   | Lockfile                  | Install Tailwind                   | shadcn runner              |
   | ------------------------- | ---------------------------------- | -------------------------- |
   | `bun.lock` or `bun.lockb` | `bun add -D @tailwindcss/vite`     | `bunx --bun shadcn@latest` |
   | `pnpm-lock.yaml`          | `pnpm add -D @tailwindcss/vite`    | `pnpm dlx shadcn@latest`   |
   | `yarn.lock`               | `yarn add -D @tailwindcss/vite`    | `yarn dlx shadcn@latest`   |
   | `package-lock.json`       | `npm install -D @tailwindcss/vite` | `npx shadcn@latest`        |

   For Vite, add the plugin and an OS-independent `@/` alias (`fileURLToPath` avoids POSIX path assumptions in Node and Bun ESM configs):

   ```ts
   import tailwindcss from '@tailwindcss/vite';
   import { URL, fileURLToPath } from 'node:url';

   // plugins: [tailwindcss(), react()]
   // resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }
   ```

   Add `paths` to `tsconfig.json` without `baseUrl` (deprecated since TS 6):

   ```json
   { "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
   ```

2. Replace any competing CSS framework import with `@import 'tailwindcss';` at the beginning of the global CSS file, then remove its package (e.g. `bun remove bootstrap bootstrap-icons`).

3. Write `components.json` by hand, which keeps the run non-interactive:

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

4. Let the first registry `add` create `src/lib/utils.ts` and its dependency. Treat that file as registry-owned: re-read it afterwards, since it can replace an existing helper and differ from a hand-written `clsx` / `tailwind-merge` one.

**Done when**: `components.json` has the `@vital-design` registry, the CSS file begins with `@import 'tailwindcss'`, the Vite alias is independent of the working directory and slash style, and `@/lib/utils` resolves after the first add.

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
<runner> add --overwrite --yes @vital-design/<name> [@vital-design/<name> …]
```

`--overwrite` keeps the run non-interactive when `utils.ts` already exists. The `@vital-design/` prefix is required so `registryDependencies` resolve.

After `add`, re-read every generated import. If generated code names a missing icon path, provision that icon from the registry, correct the import to its consumer path, and report the registry mismatch upstream.

A registry add can append Vital's `@theme inline` token definitions after existing CSS, so an earlier `@apply bg-grayscale-…` fails because Tailwind has not yet seen that utility. Keep token-dependent `@apply` after the tokens, or use the CSS variable in early global rules (`background: var(--grayscale-100)`).

**Done when**: every listed primitive file exists in the consumer tree.

### 4. Assemble

- Named export: `export function <BlockName>(props: <BlockName>Props)`
- `className?: string` passed through `cn(...)`
- Callbacks optional (`onSearch?: (query: string) => void`)
- Layout classes from the recipe

**Navigation links** stay router `<Link>` elements styled with token utilities, keeping the `link` role that navigation and tests rely on. `Button` with `nativeButton={false} render={<Link href="…" />}` renders the element with `role="button"`; reserve it for an action that happens to navigate.

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

**Vital `Checkbox`** is controlled via `checked` + `onCheckedChange` (`boolean | 'indeterminate'`) and reports state through `aria-checked`.

```tsx
<Checkbox
  checked={values.done}
  onCheckedChange={(checked) =>
    setFieldValue('done', checked === true)
  }
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
