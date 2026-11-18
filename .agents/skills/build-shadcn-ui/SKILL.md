---
name: build-shadcn-ui
description: "Builds, refactors, or reviews Vital Design src-v2 components to match the library's shadcn-style architecture: Base UI wrappers, compound components, React 19 ref props, data-slot contracts, CvaProps variant types, registry-ready imports, Tailwind v4 tokens, and docs/stories/tests."
---

# Build Shadcn UI

Build Vital Design components as registry-ready primitives first. Prefer thin, composable wrappers over product-specific widgets.

## Workflow

1. Read the closest existing component before editing.
   - Base UI wrappers: `src-v2/components/select/Select.tsx`, `src-v2/components/combobox/Combobox.tsx`, `src-v2/components/dialog/Dialog.tsx`.
   - Compound layout: `src-v2/components/button/button-group/ButtonGroup.tsx`, `src-v2/components/input/input-group/InputGroup.tsx`.
   - Native navigation with `render` composition: `src-v2/components/breadcrumb/Breadcrumb.tsx`, `src-v2/components/pagination/Pagination.tsx`.
   - Command/list internals: `src-v2/components/command/Command.tsx`, `src-v2/components/autocomplete/Autocomplete.tsx`.

2. Pick the primitive boundary.
   - Use `@base-ui/react` for interactive primitives when available.
   - Keep the public component as a styled wrapper around Base UI parts.

3. Shape the public API.
   - Start from `ComponentPropsWithoutRef<typeof BaseX.Part>` and omit only props you must own.
   - Accept `ref` directly from props (`ref?: Ref<ComponentRef<typeof BaseX.Part>>` or `Ref<HTML...Element>`); do not use `forwardRef` or deprecated `ElementRef`.
   - Do not invent state props unless the component owns real behavior.
   - Keep compatibility props only when they protect existing usage; map them to native/base attrs.

4. Build compound parts.
   - Export the root and each public part with named exports.
   - Add stable `data-slot` on every exported DOM surface: `select-trigger`, `combobox-item`, etc.
   - Never passthrough triggers (`const X = Base.Trigger`); wrap like `DialogTrigger`.
   - Provider / state Root / bare Portal may omit slot (see `.agents/RULES.md` Tier 3).
   - Style descendants through `data-slot`, not role selectors.
   - Keep semantic/native elements: clickable controls are buttons; layout text stays spans/divs.

5. Manage state ownership.
   - Keep one source of truth for each state value.
   - Controlled and uncontrolled modes should call change handlers once per real change.
   - Avoid effects that reset controlled state on initial mount.
   - Do not swallow keyboard events when the required handler is missing.

6. Keep registry constraints.
   - Work in `src-v2/`, not legacy `src/`.
   - Use full icon imports, never icon barrels in component source.
   - Use `cn()` and Tailwind/design tokens. Do not add design tokens.
   - Avoid `any`.
   - If adding registry entries, use `/add-registry`; do not edit generated `registry.json` or `public/r/` by hand.

7. Update support files when the API changes.
   - Component test.
   - Docs examples (`examples/*.tsx`, see the add-docs skill) and MDX.
   - `<Name>.vrt.test.tsx` when an opened or interacted state changes.
   - Registry source only when explicitly adding/updating registry.

## Review Checklist

- API follows Base UI prop forwarding where possible.
- Exported DOM surfaces have stable `data-slot` names; triggers are wrapped, not passthrough.
- Class selectors do not depend on roles that can change.
- Search/open/value state has a single owner.
- Keyboard behavior has tests for open, close, back, clear, selection, and disabled/error states.
- Docs examples match the actual exported props.
- Public variant props use `CvaProps<VariantProps<typeof xVariants>>`; do not export raw helpers such as `buttonVariants`.
- Focused tests pass, then `pnpm run build` when types or exports changed.

## Commands

```bash
pnpm exec vitest run src-v2/components/<component>/<Component>.test.tsx
pnpm run lint
pnpm run lint:design
pnpm run build
```

## Final
Build like shadcn. Ship like Vital.
meaning: copyable, composable, boring API; but default UI, density, tokens, and presets feel like Vital Design.
