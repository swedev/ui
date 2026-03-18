import React, { createContext, useContext, useEffect, useState } from "react";
import { TextField as RadixTextField } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";
import { cn } from "../../utils";
import s from "./TextField.module.css";

// Context to share color from Root to Slot
interface TextFieldContextValue {
  color?: React.ComponentProps<typeof RadixTextField.Root>["color"];
}

const TextFieldContext = createContext<TextFieldContextValue>({});

// --- Root ---

type BaseRootProps = Omit<React.ComponentProps<typeof RadixTextField.Root>, "color"> & {
  className?: string;
};

export type TextFieldRootProps = BaseRootProps & (SemanticProps | ColorProps);

/**
 * TextField wrapper with sensible defaults.
 * Uses local state to prevent cursor jumping on controlled inputs
 * caused by async update cycles.
 */
const Root = React.forwardRef<HTMLInputElement, TextFieldRootProps>(({
  semantic,
  color,
  value: propValue,
  className,
  onChange,
  ...props
}, ref) => {
  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  const [localValue, setLocalValue] = useState(propValue ?? "");

  useEffect(() => {
    if (propValue !== undefined) {
      setLocalValue(propValue);
    }
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <TextFieldContext.Provider value={{ color }}>
      <RadixTextField.Root
        autoComplete="off"
        color={color}
        ref={ref}
        value={localValue}
        onChange={handleChange}
        className={cn(s.Root, semantic && s.semantic, className)}
        {...props}
      />
    </TextFieldContext.Provider>
  );
});
Root.displayName = "TextField.Root";

// --- Slot ---

type SlotProps = React.ComponentProps<typeof RadixTextField.Slot>;

const Slot: React.FC<SlotProps> = (props) => {
  return <RadixTextField.Slot {...props} />;
};
Slot.displayName = "TextField.Slot";

// --- Export compound component ---

export const TextField = {
  Root,
  Slot,
};
