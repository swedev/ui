> **Svensk version:** [README.md](README.md)

# @swedev/ui

Shared, themeable UI component library for swedev projects (Styrla, OpenVera, Timla).

Built on Radix Themes with semantic wrappers, Lucide React icons, and Tailwind CSS.

## Install

```bash
npm install @swedev/ui
```

Peer dependencies:

```bash
npm install react react-dom @radix-ui/themes lucide-react
```

## Usage

```tsx
import { Button, Badge, Callout } from "@swedev/ui";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

function App() {
  return (
    <Theme accentColor="teal" grayColor="slate">
      <Callout semantic="info" title="Welcome" message="Getting started." />
      <Badge semantic="success">Active</Badge>
      <Button semantic="action" icon={Save}>Save</Button>
    </Theme>
  );
}
```

## Semantic props

Components accept `semantic` instead of `color` for consistent meaning across the UI:

`action` · `destructive` · `neutral` · `info` · `success` · `warning` · `error` · `danger` · `pending` · `valid` · `invalid`

```tsx
<Badge semantic="success">Paid</Badge>
<Badge semantic="warning">Overdue</Badge>
<Badge semantic="pending">Waitlist</Badge>
```

## Components

| Component | Base | Semantic |
|-----------|------|----------|
| Badge | Radix Badge | yes |
| Button | Radix Button | yes |
| Callout | Radix Callout | yes |
| Checkbox | Radix Checkbox | yes |
| DatePicker | Radix Popover + custom | - |
| Dropdown | Radix DropdownMenu | per item |
| Pagination | Custom | - |
| ProgressBar | Radix Progress | yes |
| Select | Radix Select | - |
| Slider | Radix Slider | yes |
| Switch | Radix Switch | yes |
| Table | Radix Table | - |
| TextArea | Radix TextArea | yes |
| TextField | Radix TextField | yes |
| ToggleButton | Radix SegmentedControl | - |

## Storybook

```bash
npm run dev       # Start Storybook on port 6006
npm run build     # Build package (tsup + tailwind)
```

## Theming

Wrap your app in Radix `<Theme>` to set branding per deployment:

```tsx
import { Theme } from "@radix-ui/themes";

<Theme accentColor="teal" grayColor="slate">
  {/* All components inherit the theme */}
</Theme>
```

This enables per-organization branding — each association or company sees a consistent UI in their own colors.

## License

MIT
