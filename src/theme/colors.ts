import type { RadixColor, Semantic } from "./types";

const semanticColorMap: Record<Semantic, RadixColor> = {
  action: "blue",
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

export function getRadixColorForSemantic(semantic: Semantic): RadixColor {
  return semanticColorMap[semantic];
}
