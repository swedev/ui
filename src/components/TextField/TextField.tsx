import React, { createContext, useContext } from "react";
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

const Root = React.forwardRef<HTMLInputElement, TextFieldRootProps>(({
  semantic,
  color,
  className,
  ...props
}, ref) => {
  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  return (
    <TextFieldContext.Provider value={{ color }}>
      <RadixTextField.Root
        autoComplete="off"
        color={color}
        ref={ref}
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
