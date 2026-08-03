# Implementation Progress: Issue #4

**Started:** 2026-08-03
**Last updated:** 2026-08-03
**Completed:** 2026-08-03
**Status:** Completed

## Completed Steps

- [x] Phase 1, Step 1: Removed sentinel and clear machinery from `Root`; retyped root props to `RadixSelectRootProps & (SemanticProps | ColorProps)`; added JSDoc on `SelectRootProps`
- [x] Phase 1, Step 2: Slimmed `SelectContextValue` to `color` only; dropped `useRef` import and the stale comment
- [x] Phase 1, Step 3: Simplified `Trigger` — removed the Backspace/Delete handler and the `setRefs` combinator; `forwardedRef` goes straight to `RadixSelect.Trigger`
- [x] Phase 1, Step 4: `Item` is now `RadixSelect.Item`; `SelectItemProps` kept as a type alias
- [x] Phase 2, Step 1: Replaced `Clearable` with `ControlledWithPlaceholder` (`useState("")` + Reset button)
- [x] Phase 2, Step 2: Added `NoneOption` story with bidirectional sentinel mapping
- [x] Phase 3, Step 1: AGENTS.md "Select value semantics" note under Key Patterns
- [x] Phase 4: Verification — see below

## Verification Results

| Check | Result |
|-------|--------|
| `npm run build` | Pass (ESM + CJS + .d.ts) |
| `npm run lint` | Pass, 0 errors (3 pre-existing warnings in DatePicker/TextArea, untouched) |
| `npm run build-storybook` | Pass |
| `npm test` | Pass (4 tests, RangeSlider) |
| `tsc --noEmit` type assertions | `onValueChange` param is exactly `string`; `undefined` rejected (verified with `@ts-expect-error` plus a negative control) |
| Exported type surface | `SelectRootProps`, `SelectTriggerProps`, `SelectContentProps`, `SelectItemProps` all still in `dist/index.d.ts` |

Manual Storybook verification (built static Storybook, driven via Chrome DevTools):

- `ControlledWithPlaceholder`: placeholder visible at `value=""`; selecting "Kassör" sets `kassor`; **Backspace and Delete no longer clear**; Reset back to `""` restores the placeholder with no remount (same DOM element identity)
- `NoneOption`: `""` renders as "Ingen"; picking a real role updates the domain value; picking "Ingen" again stays visibly "Ingen" while domain state is `""` (bidirectional mapping confirmed)
- `Default`, `WithSemantic`, `WithGroups`, `Sizes` render unchanged; no React controlled/uncontrolled warnings and no Radix errors in the console
- Storybook story index no longer contains `clearable`

## Notes

- Branch: `issue/4-forenkla-select-radix-semantik` (from `main`)
- No `agent-docs/github/` in this repo, so the project-board status update (Step 2) was skipped.
- `semantic="action"` renders no `data-accent-color` — that is intended (`action` maps to `undefined` in `src/theme/colors.ts` so it inherits `<Theme accentColor>`), not a regression. The diff confirms all semantic/color resolution paths in Root/Trigger/Content are untouched.
- No pre-commit/lint-staged/format scripts in `package.json`, so Step 9.1 was a no-op.
- Breaking on paper — should ship as a minor bump (v0.5.0 → v0.6.0). Release notes should mention that `name`/`required`/form submission now follow plain Radix semantics.
