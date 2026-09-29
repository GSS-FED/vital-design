---
name: lint-design-decision
description: >
  Use when triaging `pnpm run lint:design` / `lint:design:audit` findings
  (@shadcn/lint: no-restyle, no-raw-colors, no-unknown-classes,
  require-static-classes) and deciding whether to change code or change the
  lint policy (contracts / ignoreImports / allow). Triggered by "lint:design
  warnings", "no-restyle", "should this be a contract or a fix", "shadcn lint
  說這裡不行", "要改 code 還是改 config".
allowed-tools: Read, Edit, Bash
---

# Lint Design Decision

A `no-restyle` finding does not mean "fix this". It asks: **may a caller change
this part of the component?** The answer is either code (the override is wrong)
or policy (the override is legitimate and the config should say so). The lint
enforces the policy. People decide it.

## Config layers

| Layer                    | File                                 | Holds                                                                                                                                              | Shipped                                                                          |
| ------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Code quality             | `.oxlintrc.json`                     | Rules migrated from ESLint, type-aware checks                                                                                                      | No                                                                               |
| **Design system policy** | `vital-design.lint.json`             | Rules + options only. No paths, no `settings`, no repo-only classes                                                                                | **Yes**, registry item `vital-design-lint` (docs: Getting Started → Design Lint) |
| Repo wiring              | `.oxlintrc.shadcn.json` (+ `-audit`) | `jsPlugins`, `extends` the policy, `settings.shadcn.ui`, ignore patterns, area overrides, repo-only extras (`not-prose`, calibration `no-restyle`) | No                                                                               |

Where a decision goes:

- **Policy:** it holds for every consumer. Today that's tier 1 only: token
  rules (`no-raw-colors`, `no-unknown-classes`).
- **Repo wiring:**
  - paths
  - classes from our own docs stack
  - anything still being calibrated, including every `no-restyle` contract
    until it's promoted
- **Overriding a policy rule in the repo:** turn it `"off"` or re-declare it
  with full options. Never override only the severity, because that drops
  the policy's options.
- **Promoting to the policy:** a rule or contract moves there only after it's
  near-silent on our blocks _and_ calibrated on a real consumer app (tier 2).
  Adding to the policy changes what consumers get on reinstall, so treat it
  as a release note.

## Area policy (current config)

| Area                                | Config                        | Rules                                           | Meaning                                                  |
| ----------------------------------- | ----------------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| `src-v2/components/**` (kit source) | `.oxlintrc.shadcn.json`       | `no-unknown-classes`, `no-raw-colors` (error)   | Components own their skin                                |
| `src-v2/blocks/**`                  | same                          | same                                            | Blocks are **presets**. Restyling kit parts is their job |
| docs previews and `*.stories.tsx`   | same                          | + `no-restyle`, `require-static-classes` (warn) | Teaching surfaces. Warnings map what callers override    |
| blocks (`lint:design:audit`)        | `.oxlintrc.shadcn-audit.json` | `no-restyle`                                    | Non-gating. Look for patterns, not for code to fix       |

## Decision order

Go through these checks in order and stop at the first match. Present a
classification table to the user **before** editing anything.

1. **Error: unknown class or raw color → code.**
   Swap to an exact existing token or utility (`gray-200` → `border`,
   `break-anywhere` → `wrap-anywhere`). Never add tokens. If no exact token
   exists, list it as an open token question.
2. **The override patches a kit bug → fix the kit.**
   Common signs:

   - Radix attributes under Base UI (`data-[state=open]` → `data-popup-open`).
   - Parity gaps with a sibling component (e.g. RadioGroupItem missing
     Checkbox's hover ring).

   Fix it in the component, add a test assertion, delete the override. Use a
   separate `fix(<scope>)` commit.

3. **The override duplicates a kit default → delete it.**
   Diff it against the component's `cn()` / `cva()` classes and resolved
   tokens. Examples: `bg-white` = `bg-background`; Checkbox already dims
   disabled+checked; PopoverContent already has `shadow-emphasis`.
4. **An existing variant or size matches → use it.**
   E.g. Toolbar `border-b border-grayscale-opacity-200` → `variant="outline"`.
5. **The component is headless (no skin, just `cn(className)`) → policy:
   `settings.shadcn.ignoreImports`.**
   Styling it is how it's meant to be used (e.g. Collapsible).
6. **The caller legitimately owns this dimension → policy: a contract.**
   Examples: status tone, text-transform, density/gap, container padding.
   Use the narrowest entry that works: class > class group > category.
7. **A reused product look → leave it in the block or preset.**
   Read the component's docs **Boundary** first. Only propose a kit variant
   when the Boundary says the look belongs to the primitive _and_ design asks
   for it. Duplication across blocks is **not** evidence. See the reverted
   `feat(sidebar): cloud variant`.
8. **Unsure → leave the warning.**
   Record it as an open design question. Do not suppress it, and do not add a
   variant to make it go away.

Only 2–4 change code without discussion. Changes from 5–7 edit lint config;
AGENTS.md forbids changing Oxlint config unprompted, so get the user's OK first.

## Config mechanics (verified on @shadcn/lint 0.2.0)

- **Allow entries:**

  - a category: `layout`, `color`, `typography`, `spacing`, `shape`,
    `effects`, `motion`
  - a class group, e.g. `bg-color`, `gap`, `text-transform`, `p`, `px`,
    `rounded`
  - a class or pattern: `capitalize`, `size-*`

  Groups are separate: `p` ≠ `px`.

- **A contract replaces `allow` instead of adding to it.** Always restate
  `layout`. When several contracts match, **only the last applies**, so order
  specific after general.
- **Contracts must be repeated in each override.** Setting only a severity
  (`"warn"`) resets the options. The full `no-restyle` options live in three
  places: `.oxlintrc.shadcn.json` rules, its `*.stories.tsx` override, and
  `.oxlintrc.shadcn-audit.json`. Update all three, then check they match:
  `node -e 'const a=require("./.oxlintrc.shadcn.json"),b=require("./.oxlintrc.shadcn-audit.json"),o=x=>JSON.stringify(x);console.log(o(a.rules["shadcn/no-restyle"])===o(a.overrides[1].rules["shadcn/no-restyle"]),o(a.rules["shadcn/no-restyle"])===o(b.overrides[0].rules["shadcn/no-restyle"]))'`
- **`deny`** removes entries from an allow list, e.g.
  `allow: ["layout","typography"], deny: ["font-*"]`.
- **Recognition settings** (`ignoreImports`, `componentImports`) go under
  `settings.shadcn`. Oxlint does not inherit `settings` through `extends`, so
  the audit config repeats them.
- **Agent-facing text:** `message` works per contract and per category, with
  placeholders `{{variants}}`, `{{sizes}}`, `{{around}}`, `{{file}}`.
  `settings.shadcn.note` appends to every finding.
- **Theme discovery** reads `src-v2/styles/globals.css`, which imports the
  gitignored `tokens/generated.css`. The npm scripts run `tokens:build:css`
  first.
- **`lint:design:audit` counts are nondeterministic** (0.2.0). Identical
  runs on blocks returned 195–425 findings, even with `--threads 1`.
  `lint:design` on previews and stories is stable. Never compare audit
  counts between runs as before/after evidence; diff the specific findings
  or take the max of several runs.

### Trial a policy without touching the repo config

```bash
node -e '
const c=require("./.oxlintrc.shadcn.json");
const r=c.rules["shadcn/no-restyle"][1];
r.contracts.push({pattern:"^ProgressSegment$",allow:["layout","bg-color"]});
c.overrides[1].rules["shadcn/no-restyle"][1]=r;   // stories override
require("fs").writeFileSync(".oxlintrc.tmp.json",JSON.stringify(c));' \
&& pnpm exec oxlint -c .oxlintrc.tmp.json --disable-nested-config src-v2 apps/docs/components \
 | grep -E "warning shadcn|error shadcn" ; rm .oxlintrc.tmp.json
```

A misspelled category or group produces a config error on line 1 and pauses
the rule for that file. Check that no such error appears.

## Precedents

| Finding                                                                                           | Decision                                                                                                                                                                                    | Step |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `SidebarMenuButton data-popup-open:bg-*` in previews                                              | Kit bug (Radix attr) → fixed in Sidebar                                                                                                                                                     | 2    |
| `RadioGroupItem group-hover:border/ring`                                                          | Kit parity gap → fixed in RadioGroup                                                                                                                                                        | 2    |
| `SidebarInset bg-white`, Checkbox disabled opacity, Label default color, TimePicker shadow        | Duplicate → deleted                                                                                                                                                                         | 3    |
| Toolbar hand-written bottom border                                                                | `variant="outline"`                                                                                                                                                                         | 4    |
| `CollapsibleContent` styling                                                                      | Headless → `ignoreImports`                                                                                                                                                                  | 5    |
| `ProgressSegment bg-success-500…`                                                                 | Caller owns tone → contract `bg-color`                                                                                                                                                      | 6    |
| `ProgressSegments gap-*`                                                                          | Caller owns density → contract `gap`                                                                                                                                                        | 6    |
| `capitalize` on Button / DialogTitle / SheetTitle                                                 | Content casing → contract `text-transform`                                                                                                                                                  | 6    |
| 32 identical overrides across sidebar-cloud blocks                                                | Preset look → stays in blocks; the cloud variant was reverted                                                                                                                               | 7    |
| Shipping `no-restyle` to consumers (425 findings on our own blocks; proposed contracts cleared 6) | Not yet. Tier 1 ships token rules only; `no-restyle` stays in repo wiring                                                                                                                   | —    |
| Table container frame (`rounded`/`border`/`bg`/`shadow` via `containerClassName`)                 | Page owns the frame → `^Table$` contract with exact groups (repo wiring). **Policy candidate**: the model for tier-2 contracts. Note: lint can't tell `containerClassName` from `className` | 6    |
| Hand-built checkbox row recoloring disabled Label                                                 | Use `Field` + `FieldLabel`; disabled look = kit `opacity-50`                                                                                                                                | 3–4  |
| Caption-styled `Label` in NumberInput scrub area                                                  | Plain `Label`; a secondary label size would be a Label variant, not a caller override                                                                                                       | 3    |
| FieldLabel `py-1.5` + `!w-* !flex-none` in horizontal Field                                       | Kit gap: label-column rows (direct FieldLabel + FieldContent) now fixed-width and aligned to `min-h-8`; caller sets only width                                                              | 2    |
| `#f8f8f9`, `rgba(35,35,50,0.06)`, motion arbitrary values                                         | Open token questions (no exact token)                                                                                                                                                       | 1    |

Add a row whenever a new decision is made, so the next triage reuses it.

## Output format

Before editing, report one table grouped by step:

```
| Step | Warning (file:line) | Why | Proposed action | Code or config |
```

Then apply only what the user approves. Use these commit types:

- `fix(<component>)` for kit bugs, with a test
- `docs:` for preview and story cleanup
- `chore:` for lint policy (contracts, ignoreImports)

Finally, re-run `pnpm run lint:design`, `pnpm run lint`, `pnpm docs:lint`,
tsc, and the affected tests.
