> **English version:** [README.en.md](README.en.md)

# @swedev/ui

Delat, theme-bart komponentbibliotek for swedev-projekt (Styrla, OpenVera, Timla).

Byggt pa Radix Themes med semantiska wrappers, Lucide React-ikoner och Tailwind CSS.

## Installera

```bash
npm install @swedev/ui
```

Peer dependencies:

```bash
npm install react react-dom @radix-ui/themes lucide-react
```

## Anvandning

```tsx
import { Button, Badge, Callout } from "@swedev/ui";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

function App() {
  return (
    <Theme accentColor="teal" grayColor="slate">
      <Callout semantic="info" title="Valkomna" message="Kom igang." />
      <Badge semantic="success">Aktiv</Badge>
      <Button semantic="action" icon={Save}>Spara</Button>
    </Theme>
  );
}
```

## Semantiska props

Komponenter tar `semantic` istallet for `color` for konsekvent betydelse i hela UI:t:

`action` · `destructive` · `neutral` · `info` · `success` · `warning` · `error` · `danger` · `pending` · `valid` · `invalid`

```tsx
<Badge semantic="success">Betald</Badge>
<Badge semantic="warning">Forsenad</Badge>
<Badge semantic="pending">Vantelista</Badge>
```

## Komponenter

| Komponent | Bas | Semantic |
|-----------|-----|----------|
| Badge | Radix Badge | ja |
| Button | Radix Button | ja |
| Callout | Radix Callout | ja |
| Checkbox | Radix Checkbox | ja |
| DatePicker | Radix Popover + custom | - |
| Dropdown | Radix DropdownMenu | per item |
| Pagination | Custom | - |
| ProgressBar | Radix Progress | ja |
| Select | Radix Select | - |
| Slider | Radix Slider | ja |
| Switch | Radix Switch | ja |
| Table | Radix Table | - |
| TextArea | Radix TextArea | ja |
| TextField | Radix TextField | ja |
| ToggleButton | Radix SegmentedControl | - |

## Storybook

```bash
npm run dev       # Starta Storybook pa port 6006
npm run build     # Bygg paketet (tsup + tailwind)
```

## Theming

Wrappa din app i Radix `<Theme>` for att satta branding per deployment:

```tsx
import { Theme } from "@radix-ui/themes";

<Theme accentColor="teal" grayColor="slate">
  {/* Alla komponenter arver temat */}
</Theme>
```

Detta gor det mojligt att brand:a per organisation — varje forening eller foretag ser ett enhetligt UI i sina egna farger.

## Licens

MIT
