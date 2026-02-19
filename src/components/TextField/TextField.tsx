import React from "react";
import { TextField as RadixTextField } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type RadixTextFieldRootProps = ComponentProps<typeof RadixTextField.Root>;

type BaseTextFieldProps = Omit<RadixTextFieldRootProps, "color"> & {
  icon?: LucideIcon;
  slotRight?: React.ReactNode;
};

export type TextFieldProps = BaseTextFieldProps & (SemanticProps | ColorProps);

export const TextField: React.FC<TextFieldProps> = ({
  semantic,
  color,
  icon: Icon,
  slotRight,
  ...rest
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  return (
    <RadixTextField.Root color={finalColor} {...rest}>
      {Icon && (
        <RadixTextField.Slot>
          <Icon size={14} />
        </RadixTextField.Slot>
      )}
      {slotRight && (
        <RadixTextField.Slot side="right">{slotRight}</RadixTextField.Slot>
      )}
    </RadixTextField.Root>
  );
};
