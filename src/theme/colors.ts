import type { RadixColor, Semantic } from "./types";

/** `action` maps to `undefined` so components inherit the Radix
 * `<Theme accentColor>` — action is the brand-accent semantic and must
 * follow per-deployment branding. Status semantics keep fixed scales;
 * consumers rebrand those at the token level. */
const semanticColorMap: Record<Semantic, RadixColor | undefined> = {
  action: undefined,
  destructive: "red",
  neutral: "gray",
  info: "sky",
  success: "jade",
  warning: "amber",
  error: "red",
  danger: "red",
  none: "gray",
  pending: "purple",
  valid: "jade",
  invalid: "red",
};

export function getRadixColorForSemantic(semantic: Semantic): RadixColor | undefined {
  return semanticColorMap[semantic];
}
