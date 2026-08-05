# Changelog

All notable changes to `@swedev/ui` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (0.x: breaking changes bump the minor version).

## [0.7.0] — 2026-08-05

### Fixed
- **Select:** the trigger honors consumer width utilities (`w-full` etc.) — Radix's unlayered `all: unset` reset no longer silently defeats them; the trigger hands `width` back to the layered cascade with `width: revert-layer` (#7).
- **Select:** the trigger skin now actually applies in consumer apps that import Radix's stylesheet unlayered — rules moved out of `@layer swedev`, same fix as Button in 0.4.0 (#7).

### Added
- **Select:** TextField-family polish — an open trigger shows the same `--focus-8` ring a focused TextField gets, and the chevron is softened to the placeholder tone (#7).
- **Button:** deliberate disabled look that survives warm/tinted backgrounds — visible border (`gray-a6`), quiet surface (`gray-a2`) and legible text (`gray-a11`) instead of Radix dropping both contrast axes at once (#8).

### Removed
- **Breaking (Button/Select):** the compact box chrome — Radix's own size scale (height, padding, gap, ghost box) now applies to Button and `Select.Trigger`. The old chrome flattened the scale (`size="3"` rendered at the same 32px height as `size="2"`). The consumer-overridable `--swedev-button-padding-x/y` tokens from 0.4.0 are gone; consumers own button geometry via their own unlayered `.rt-Button` rules.

## [0.6.0] — 2026-08-03

### Changed
- **Select** simplified to plain Radix value semantics: `value`/`onValueChange` pass straight through to Radix, so a controlled `value=""` shows the placeholder (#4, #6).
- `Select.Root`'s `onValueChange` is now typed `(value: string) => void` — the callback never receives `undefined`.

### Removed
- **Breaking (Select):** the internal `__empty__` sentinel — `<Select.Item value="">` is no longer supported; use a custom sentinel value (e.g. `"none"`) mapped in the consumer's callback for an active "None" option.
- **Breaking (Select):** Backspace/Delete on the trigger no longer clears the value.
- **Breaking (Select):** form behavior is normalized to plain Radix — an empty value submits as empty and fails `required`.

## [0.5.0] — 2026-07-09

### Added
- **SegmentedControl** primitive with stories.
- **RangeSlider** primitive with stories and tests.

## [0.4.0] — 2026-07-07

### Added
- **Badge:** new `dot` prop (status dot in the badge's own color).
- **Button:** consumer-overridable `--swedev-button-padding-x/y` tokens; ghost buttons alias Radix's `--button-ghost-padding-*` to the same tokens so ghosts get the same box as other variants.

### Changed
- **Modal:** cleaner chrome — no tinted header/footer bands, panel-solid background, radius token, 18px/700 title, footer with border-top and flex-end.
- **LabelledCheckbox:** `items-start` + `1lh` checkbox-root height — the box centers on the first text line, multiline labels wrap below it.
- Box rules that compete with Radix's own button/checkbox CSS moved out of `@layer swedev` (Radix ships unlayered CSS, which always beats layered) — wins via documented import order instead.

### Fixed
- **Pagination:** ellipsis color uses `var(--gray-9)` instead of `text-gray-400` (theming leak).

## [0.3.0] — 2026-07-07

### Changed
- The `action` semantic maps to `undefined` so components inherit `<Theme accentColor>` (per-deployment branding). Consumers that want the old blue set `accentColor="blue"`.
- **DatePicker:** rdp accent/today/range vars alias Radix accent tokens, applied on `.rdp-root` outside `@layer` (rdp's stylesheet is unlayered and the popover portals out of the wrapper).

### Fixed
- **Callout** tolerates `undefined` color (guarded default-icon lookup).
- **Pagination:** ellipsis color theming leak (`var(--gray-9)`).

## [0.2.0] — 2026-03-18

### Fixed
- **LabelledCheckbox:** wrap label in `<span>` with `leading-4` for proper flex alignment.
- **ToggleButton:** className merge order so `activeProps` can override active styles.
- **TextField/TextArea:** local state buffer prevents cursor jumping in controlled inputs.
- **Button:** `React.isValidElement()` instead of fragile manual icon detection.

### Added
- **Breadcrumbs:** `disabled` prop on `BreadcrumbItem`.
- **Badge:** `text` prop as alternative to `children`.
- **Callout:** separate message/children rendering, dynamic icon sizing.

## [0.1.1] — 2026-03-07

### Fixed
- `lucide-react` peer version range.

## [0.1.0] — 2026-03-07

### Added
- First npm publish: Radix Themes wrappers with semantic props, Lucide React icons, CSS modules with `@layer` cascade, Vite library build, and Storybook. Components: Badge, Breadcrumbs, Button, Callout, Checkbox, DatePicker, Dropdown, Pagination, ProgressBar, Select, Slider, Switch, Table, TextArea, TextField, ToggleButton.

[0.7.0]: https://github.com/swedev/ui/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/swedev/ui/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/swedev/ui/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/swedev/ui/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/swedev/ui/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/swedev/ui/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/swedev/ui/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/swedev/ui/releases/tag/v0.1.0
