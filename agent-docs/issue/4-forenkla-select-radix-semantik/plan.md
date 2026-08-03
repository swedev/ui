# Implementation Plan: Förenkla Select: Radix-semantik för value, ta bort clear-maskineriet

## Summary

Simplify `Select` to plain Radix semantics for `value`. Remove the `__empty__` sentinel mapping (which made `""` behave as a real selected value and suppressed the placeholder), remove the clear machinery (Backspace/Delete → `onValueChange(undefined)`, the `selectKey` remount hack, and the `undefined`-typed callback), and let `value`/`onValueChange` pass straight through to Radix. Add stories showing the two idiomatic patterns (controlled field with placeholder via `useState("")`, and a "None" option via a consumer-side sentinel value), document the semantics in JSDoc and AGENTS.md.

This is a breaking change on paper (`Item value=""` and Backspace-clear are removed, `onValueChange` narrows to `(value: string) => void`), but an audit of all known consumers (openvera, timla, ~35+ call sites) found zero users of either feature — every consumer actively works around the current semantics.

## Triage Info

> Decision-support metadata for this issue.

| Field | Value |
|-------|-------|
| **Blocked by** | None |
| **Blocks** | Downstream consumer cleanup in openvera/timla (untracked follow-up issues, to be created in those repos after release) |
| **Related issues** | swedev/openvera#59 (external/private repo — placeholder trap discovered there) |
| **Scope** | 3 files across `src/components/Select/` and `AGENTS.md` |
| **Risk** | Low (breaking change on paper, mitigated by the consumer audit showing zero users of the removed features) |
| **Complexity** | Low |
| **Safe for junior** | Yes |
| **Conflict risk** | Low (no other open plans in `agent-docs/issue/`) |

### Triage Notes

- No blockers, no parent issue, no project-board config in this repo (`agent-docs/github/` does not exist), no other open plans.
- No in-repo consumers of `Select` outside its own folder — the change is fully contained to the Select component plus docs.
- The removed behaviors are technically breaking, so this should ship in a **minor** release (repo is at v0.5.0 → v0.6.0). Version bump itself is handled at release time, not in this plan.
- Consumer follow-up (removing `value={x || undefined}`, `v ?? fallback`, `if (v)` guards in openvera/timla) is explicitly out of scope — separate issues in those repos after release.

## Analysis

Current state of `src/components/Select/Select.tsx`:

1. **Sentinel mapping** (lines 8–9, 45–52, 144–147): `Root` maps `value === ""` to `"__empty__"` before passing to Radix, and maps it back in `handleValueChange`. `Item` does the same for `value=""` items. Consequence: `""` counts as a *selected* value, so the Radix placeholder never shows for `value=""` — the trap that made openvera write `value={x || undefined}` at multiple call sites.
2. **Clear machinery**:
   - `clearValue` in Root calls `onValueChange?.(undefined)` (lines 54–56), forcing the callback type `(value: string | undefined) => void` (line 26).
   - Trigger listens for Backspace/Delete and calls `context.clearValue` (lines 116–121).
   - `selectKey = value === undefined ? "cleared" : "selected"` (line 59) remounts Radix Root when the value becomes `undefined` — a hack based on the (incorrect) belief that Radix "doesn't support unselecting". Note this key only distinguishes `undefined` vs defined, so it remounts on the *first* transition either way.
   - `triggerRef` lives in context and is written by Trigger's `setRefs` combinator (lines 104–114) but **never read anywhere** — it's dead residue of the wingframe clear/refocus design and goes away with the rest.
3. **Misleading comments**: line 8 ("Radix Select doesn't allow empty string values") — Radix *Root* accepts `value=""` fine and shows the placeholder; it's `Item` that rejects `value=""` (with its own clear error message). Line 58 ("Radix doesn't support unselecting") — controlled `value=""` is the documented way to show the placeholder.
4. **Consumer audit** (from the issue): zero occurrences of `Item value=""`; zero intentional uses of clear-to-`undefined`; every controlled callback guards against `undefined`; openvera fights the placeholder suppression with `value={x || undefined}`; latent `Number(undefined) → NaN` bug pattern exists in wingframe's diverged copy.
5. **`""` vs `undefined` are not equivalent** (important for the JSDoc/docs wording): `value=""` = *controlled* with nothing selected (placeholder shows); omitted `value`/`value={undefined}` = *uncontrolled*; switching a mounted Select from a string to `undefined` is a controlled→uncontrolled transition that React/Radix warn against. Controlled consumers should clear with `""`, never `undefined`.
6. **Form-related breaking surface**: removing the sentinel also normalizes `name`/`required`/form-submission behavior to plain Radix semantics (an empty value now submits as empty and fails `required`). This is desirable and has no known users, but belongs in the release notes.

Radix Themes' `Select.Root` props already type `value?: string` and `onValueChange?: (value: string) => void`, so after removing the interception we can use Radix's own prop types directly instead of Omit-and-redeclare.

The `Clearable` story demonstrates the Backspace behavior being removed and must be replaced.

## Implementation Steps

### Phase 1: Simplify `Select.tsx`

1. Remove the sentinel and clear machinery from `Root`
   - Delete `EMPTY_VALUE_SENTINEL` (lines 8–9) and the misleading comment.
   - Delete `radixValue` mapping, `handleValueChange`, `clearValue`, and `selectKey` (lines 45–59); pass `value` and `onValueChange` straight through to `RadixSelect.Root` (no `key` prop).
   - Retype root props: replace `BaseRootProps` (Omit + redeclare) with Radix's own props — `export type SelectRootProps = RadixSelectRootProps & (SemanticProps | ColorProps);`. This gives `onValueChange?: (value: string) => void` with no `undefined` leakage.
   - Add JSDoc on `SelectRootProps` (or on `Root`): `value=""` = controlled with nothing selected, placeholder shows (Radix documented behavior); omitted `value`/`undefined` = uncontrolled; controlled consumers clear with `""`, not `undefined` (avoids a controlled→uncontrolled transition). An explicit "None" option is done with a consumer-chosen sentinel value mapped to/from `""` in the consumer's `value` prop and callback (see the `NoneOption` story).
   - Files to modify: `src/components/Select/Select.tsx`
2. Slim the context
   - Remove `clearValue` and `triggerRef` from `SelectContextValue` — context keeps only `color` (still needed so Trigger/Content inherit Root's semantic/color). Update the now-stale "Context to share color and clear function" comment and drop the unused `useRef`/`useContext` imports as applicable (lint enforces unused-import removal).
   - Files to modify: `src/components/Select/Select.tsx`
3. Simplify `Trigger`
   - Remove the `onKeyDown` destructure, `handleKeyDown` (Backspace/Delete listener), and the `setRefs` ref-combinator; forward `forwardedRef` directly to `RadixSelect.Trigger`.
   - Everything else (semantic/color resolution, `solid` variant handling, classNames) stays as is.
   - Files to modify: `src/components/Select/Select.tsx`
4. Revert `Item` to plain Radix
   - Delete the wrapper component and its sentinel mapping; in the `Select` namespace export, set `Item: RadixSelect.Item`.
   - Keep the exported type name for compatibility: `export type SelectItemProps = React.ComponentProps<typeof RadixSelect.Item>;` (the `interface` with redeclared `value: string` goes away). Radix itself throws a clear error for `Item value=""`, so no guard is needed on our side.
   - `src/components/Select/index.ts` needs no changes (same export names).
   - Files to modify: `src/components/Select/Select.tsx`

### Phase 2: Stories

1. Replace the `Clearable` story (demonstrates removed Backspace behavior) with `ControlledWithPlaceholder`
   - `useState("")`-controlled Root; show that the placeholder is visible when value is `""` and that selecting works — the pattern that used to be broken. Include a small "Reset" button setting the state back to `""` to show the placeholder returning.
   - Files to modify: `src/components/Select/Select.stories.tsx`
2. Add a `NoneOption` story
   - A sentinel item mapped in **both directions** so that picking "Ingen" stays visibly selected as "Ingen" while the domain state holds `""`:
     ```tsx
     const NONE_VALUE = "none";
     const [value, setValue] = useState("");
     <Select.Root
       value={value === "" ? NONE_VALUE : value}
       onValueChange={(next) => setValue(next === NONE_VALUE ? "" : next)}
     >
       <Select.Item value={NONE_VALUE}>Ingen</Select.Item>
       ...
     </Select.Root>
     ```
     (One-directional mapping would snap back to the placeholder on selecting "Ingen".) Note in the story description that the sentinel must not collide with a real domain value. Display the resolved domain state under the select like the old Clearable story did.
   - Files to modify: `src/components/Select/Select.stories.tsx`

### Phase 3: Documentation

1. AGENTS.md note under Key Patterns
   - Add a short "Select value semantics" note: `value`/`onValueChange` pass straight through to Radix; `value=""` = controlled, nothing selected, placeholder shows; omitted `value` = uncontrolled; clear controlled selects with `""`, not `undefined`; `Item value=""` is invalid (Radix throws); a "None" option is a consumer sentinel value mapped to/from `""` (see `NoneOption` story).
   - Files to modify: `AGENTS.md`

### Phase 4: Verification

1. `npm run build` and `npm run lint` — the build type-checks `src/` (stories are excluded via `tsconfig.json`) and validates the public type surface; lint catches leftover unused imports (`useRef`) and references.
2. `npm run build-storybook` — type/build coverage for the stories, which the library build excludes.
3. `npm run dev` (Storybook) — manually verify: Default placeholder; ControlledWithPlaceholder (placeholder shows at `""`, returns after Reset); NoneOption bidirectional mapping; **Backspace/Delete on the trigger no longer clears**; a consumer-supplied `onKeyDown` and a forwarded trigger `ref` still work; WithSemantic/WithGroups/Sizes unchanged.
4. `npm test` — existing suite (only RangeSlider tests today). The issue does not ask for new tests; adding an interaction test for placeholder/keyboard behavior is optional follow-up, not in scope here.

## Files Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/components/Select/Select.tsx` | Modify | Remove sentinel + clear machinery; pass-through Radix semantics; JSDoc; plain Radix `Item` |
| `src/components/Select/Select.stories.tsx` | Modify | Replace `Clearable` with `ControlledWithPlaceholder`; add `NoneOption` |
| `AGENTS.md` | Modify | Note on Select value semantics and the "None" pattern |

## Codebase Areas

List the primary directories/areas this plan touches (for conflict detection):
- `src/components/Select/`
- `AGENTS.md` (root docs)

## Design Decisions

> Non-trivial choices made during planning. Feedback welcome; otherwise implementation proceeds with these.

### 1. Root props: reuse Radix types vs keep Omit-and-redeclare
**Options:** A) `SelectRootProps = RadixSelectRootProps & (SemanticProps | ColorProps)` — use Radix's `value`/`onValueChange` types directly. B) Keep the `Omit<..., "value" | "onValueChange">` + redeclare shape with narrowed types.
**Decision:** A
**Rationale:** With no interception left there is nothing to redeclare; Radix already types `onValueChange` as `(value: string) => void`, which is exactly the target signature. Less code, and the types stay correct if Radix evolves.

### 2. `Item`: thin wrapper vs direct Radix re-export
**Options:** A) Keep a wrapper `Item` component with `SelectItemProps` interface. B) Re-export `RadixSelect.Item` directly in the namespace, keep `SelectItemProps` as a type alias for compatibility.
**Decision:** B
**Rationale:** The wrapper existed only for the sentinel mapping. Radix itself rejects `Item value=""` with a clear error message, so no guard adds value. Matches the existing pattern of re-exporting `Group`/`Label`/`Separator` directly. Keeping the `SelectItemProps` type export avoids breaking type-only imports.

### 3. Remove `triggerRef` from context
**Options:** A) Keep the context `triggerRef` and Trigger's ref-combinator. B) Remove them.
**Decision:** B
**Rationale:** `triggerRef` is written but never read anywhere in the codebase — it is dead residue of the wingframe clear/refocus design. Removing it also deletes the manual `setRefs` combinator; `forwardRef` continues to serve external consumers.

### 4. Replace vs keep the `Clearable` story
**Options:** A) Keep `Clearable` retargeted to new behavior. B) Replace with `ControlledWithPlaceholder` + add `NoneOption`.
**Decision:** B
**Rationale:** The story's premise (Backspace clears) is removed, and the issue explicitly asks for the two new stories. A story named "Clearable" would misadvertise behavior that no longer exists.

## Verification Checklist

- [ ] `Select.Root value=""` shows the placeholder (no sentinel; Radix default behavior)
- [ ] `value`/`onValueChange` pass through untouched; `onValueChange` is typed `(value: string) => void`
- [ ] Backspace/Delete on the trigger no longer changes the value; consumer `onKeyDown` and forwarded trigger `ref` still work
- [ ] The `key` remount hack is structurally gone; controlled clearing is done with `""` (not `undefined`) and shows the placeholder without remount
- [ ] `EMPTY_VALUE_SENTINEL`, `clearValue`, `selectKey`, `triggerRef`, the stale context comment, and the misleading comments (old lines 8 and 58) are gone
- [ ] `Select.Item` is Radix's own component; `Item value=""` throws Radix's error
- [ ] `SelectRootProps`, `SelectTriggerProps`, `SelectContentProps`, `SelectItemProps` still exported from `src/components/Select/index.ts`
- [ ] JSDoc on root props documents `""` (controlled, placeholder) vs omitted/`undefined` (uncontrolled) and the "None" pattern
- [ ] Stories: `ControlledWithPlaceholder` and `NoneOption` (bidirectional mapping) present; `Clearable` removed; remaining stories unaffected
- [ ] AGENTS.md has the Select value-semantics note
- [ ] `npm run build`, `npm run lint`, `npm run build-storybook`, and `npm test` pass; Storybook renders all Select stories
