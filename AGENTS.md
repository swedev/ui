# @swedev/ui — Agent Guide

Shared UI component library. Radix Themes + semantic wrappers + Lucide icons.

## Architecture

- `src/theme/` — type system, color mappings, icon mappings
- `src/components/` — one folder per component, each with `.tsx`, `.stories.tsx`, `index.ts`
- `src/index.ts` — barrel export of all components and theme utilities

## Key Patterns

### Semantic props (discriminated union)

Components that support color take either `semantic` or `color`, never both:

```typescript
type SemanticProps = { semantic: Semantic; color?: never };
type ColorProps = { semantic?: never; color?: RadixColor };
type ComponentProps = BaseProps & (SemanticProps | ColorProps);
```

The `semantic` value is mapped to a Radix color via `getRadixColorForSemantic()` in `src/theme/colors.ts`.

### Wrapper strategy

- **Wrap** when adding semantic props or composition (Callout, Badge, Button, Checkbox, Switch, TextField, TextArea, Slider, ProgressBar)
- **Compound component** for multi-part components (Table, Select, Dropdown) — re-export Radix sub-components as namespace
- **Custom** for components without a Radix equivalent (DatePicker, Pagination)

### Icons

Lucide React. Components that take icons use the `LucideIcon` type (component reference, not JSX):

```tsx
import { Save } from "lucide-react";
<Button icon={Save}>Save</Button>   // correct
<Button icon={<Save />}>Save</Button>  // wrong
```

Callout auto-selects a default icon based on `semantic` via `getDefaultIconForSemantic()` in `src/theme/icons.ts`.

### Adding a component

1. Create `src/components/Name/Name.tsx`, `Name.stories.tsx`, `index.ts`
2. Follow existing pattern: Omit conflicting props from Radix, add semantic union
3. Export from `src/components/index.ts` and `src/index.ts`
4. Verify: `npm run build` and `npm run dev` (Storybook)

## Build

- **tsup** — ESM + CJS + .d.ts, externals: react, react-dom, @radix-ui/themes, lucide-react
- **Storybook 10** — Vite-based, stories colocated with components

## Dependencies

All UI deps are **peer dependencies** — the consuming project provides them:

- `react` ^19
- `react-dom` ^19
- `@radix-ui/themes` ^3
- `lucide-react` ^0.400

## Commands

```bash
npm run build          # tsup → dist/
npm run dev            # Storybook on port 6006
npm run build-storybook # Static Storybook build
npm test               # vitest
```
