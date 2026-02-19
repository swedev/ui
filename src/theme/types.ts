import type { ButtonProps as RadixButtonProps } from "@radix-ui/themes";
import type { LucideIcon } from "lucide-react";

export type Semantic =
  | "action"
  | "destructive"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "danger"
  | "none"
  | "pending"
  | "valid"
  | "invalid";

export type RadixColor = Exclude<RadixButtonProps["color"], undefined>;

export type Color = Semantic | RadixColor;

export type SemanticProps = {
  semantic: Semantic;
  color?: never;
};

export type ColorProps = {
  semantic?: never;
  color?: RadixColor;
};

export type IconProp = LucideIcon;
