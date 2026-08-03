import React, { createContext, useContext } from "react";
import { Select as RadixSelect } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";
import { cn } from "../../utils";
import s from "./Select.module.css";

// Context to share the resolved color with Trigger and Content
interface SelectContextValue {
  color?: React.ComponentProps<typeof RadixSelect.Trigger>["color"];
}

const SelectContext = createContext<SelectContextValue | null>(null);

// --- Root ---

type RadixSelectRootProps = React.ComponentProps<typeof RadixSelect.Root>;

/**
 * Props for `Select.Root`. `value` and `onValueChange` pass straight through to
 * Radix — this component adds no value mapping of its own.
 *
 * Value semantics:
 * - `value=""` — **controlled** with nothing selected. The `Trigger`'s
 *   `placeholder` is shown. This is Radix's documented way to represent
 *   "no selection" in a controlled select.
 * - Omitted `value` (or `value={undefined}`) — **uncontrolled**. Use
 *   `defaultValue` to set an initial selection.
 * - Controlled consumers should clear with `""`, never `undefined`: going from
 *   a string to `undefined` on a mounted select is a controlled → uncontrolled
 *   transition that React and Radix warn about.
 *
 * `Select.Item value=""` is invalid — Radix throws, since an empty item value
 * would be indistinguishable from "no selection". To offer an explicit "None"
 * choice, pick a sentinel value in the consumer (e.g. `"none"`) and map it
 * to/from `""` in **both** the `value` prop and the `onValueChange` callback;
 * see the `NoneOption` story.
 */
export type SelectRootProps = RadixSelectRootProps & (SemanticProps | ColorProps);

const Root: React.FC<SelectRootProps> = ({
  semantic,
  color,
  children,
  ...rootProps
}) => {
  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  return (
    <SelectContext.Provider value={{ color }}>
      <RadixSelect.Root {...rootProps}>{children}</RadixSelect.Root>
    </SelectContext.Provider>
  );
};

// --- Trigger ---

type RadixTriggerProps = React.ComponentProps<typeof RadixSelect.Trigger>;
type RadixVariant = RadixTriggerProps["variant"];
type BaseTriggerProps = Omit<RadixTriggerProps, "color" | "variant"> & {
  variant?: RadixVariant | "solid";
};
export type SelectTriggerProps = BaseTriggerProps & (SemanticProps | ColorProps);

const Trigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(({
  semantic,
  color,
  className,
  variant,
  ...props
}, forwardedRef) => {
  const context = useContext(SelectContext);

  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  const resolvedColor = color ?? context?.color;

  // Handle custom "solid" variant
  const isSolid = variant === "solid";
  const radixVariant: RadixVariant = isSolid ? "surface" : variant;

  return (
    <RadixSelect.Trigger
      ref={forwardedRef}
      className={cn(s.Trigger, isSolid && s.solid, isSolid && "rt-variant-solid", semantic && s.semantic, className)}
      color={resolvedColor}
      variant={radixVariant}
      {...props}
    />
  );
});
Trigger.displayName = "Select.Trigger";

// --- Item ---

export type SelectItemProps = React.ComponentProps<typeof RadixSelect.Item>;

// --- Content ---

type RadixContentProps = React.ComponentProps<typeof RadixSelect.Content>;
type BaseContentProps = Omit<RadixContentProps, "color">;
export type SelectContentProps = BaseContentProps & (SemanticProps | ColorProps);

const Content: React.FC<SelectContentProps> = ({
  semantic,
  color,
  ...props
}) => {
  const context = useContext(SelectContext);

  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  const resolvedColor = color ?? context?.color;

  return <RadixSelect.Content color={resolvedColor} {...props} />;
};

// --- Export compound component ---

export const Select = {
  Root,
  Trigger,
  Content,
  Item: RadixSelect.Item,
  Group: RadixSelect.Group,
  Label: RadixSelect.Label,
  Separator: RadixSelect.Separator,
};
