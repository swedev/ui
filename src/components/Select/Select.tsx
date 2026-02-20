import React, { createContext, useContext, useRef } from "react";
import { Select as RadixSelect } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";
import { cn } from "../../utils";
import s from "./Select.module.css";

// Radix Select doesn't allow empty string values, so we use a sentinel
const EMPTY_VALUE_SENTINEL = "__empty__";

// Context to share color and clear function
interface SelectContextValue {
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  color?: React.ComponentProps<typeof RadixSelect.Trigger>["color"];
  clearValue?: () => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

// --- Root ---

type RadixSelectRootProps = React.ComponentProps<typeof RadixSelect.Root>;

type BaseRootProps = Omit<RadixSelectRootProps, "value" | "onValueChange"> & {
  value?: string;
  onValueChange?: (value: string | undefined) => void;
};

export type SelectRootProps = BaseRootProps & (SemanticProps | ColorProps);

const Root: React.FC<SelectRootProps> = ({
  semantic,
  color,
  value,
  onValueChange,
  children,
  ...rootProps
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  // Convert empty string to sentinel for Radix
  const radixValue = value === "" ? EMPTY_VALUE_SENTINEL : value;

  // Convert sentinel back to empty string for callback
  const handleValueChange = (newValue: string) => {
    const externalValue = newValue === EMPTY_VALUE_SENTINEL ? "" : newValue;
    onValueChange?.(externalValue);
  };

  const clearValue = () => {
    onValueChange?.(undefined);
  };

  // Key forces remount when value becomes undefined (Radix doesn't support unselecting)
  const selectKey = value === undefined ? "cleared" : "selected";

  return (
    <SelectContext.Provider value={{ triggerRef, color, clearValue }}>
      <RadixSelect.Root
        key={selectKey}
        value={radixValue}
        onValueChange={handleValueChange}
        {...rootProps}
      >
        {children}
      </RadixSelect.Root>
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
  onKeyDown,
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

  // Combine forwarded ref with context ref
  const setRefs = (el: HTMLButtonElement | null) => {
    if (context?.triggerRef) {
      (context.triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
    }
    if (typeof forwardedRef === "function") {
      forwardedRef(el);
    } else if (forwardedRef) {
      forwardedRef.current = el;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      context?.clearValue?.();
    }
    onKeyDown?.(e);
  };

  return (
    <RadixSelect.Trigger
      ref={setRefs}
      className={cn(s.Trigger, isSolid && s.solid, isSolid && "rt-variant-solid", semantic && s.semantic, className)}
      color={resolvedColor}
      variant={radixVariant}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
});
Trigger.displayName = "Select.Trigger";

// --- Item (with sentinel handling) ---

type RadixItemProps = React.ComponentProps<typeof RadixSelect.Item>;

export interface SelectItemProps extends Omit<RadixItemProps, "value"> {
  value: string;
}

const Item: React.FC<SelectItemProps> = ({ value, ...props }) => {
  const radixValue = value === "" ? EMPTY_VALUE_SENTINEL : value;
  return <RadixSelect.Item value={radixValue} {...props} />;
};

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
  Item,
  Group: RadixSelect.Group,
  Label: RadixSelect.Label,
  Separator: RadixSelect.Separator,
};
