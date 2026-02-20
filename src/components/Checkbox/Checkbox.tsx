import React from "react";
import type { CheckboxProps as RadixCheckboxProps } from "@radix-ui/themes";
import { Checkbox as RadixCheckbox } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type BaseCheckboxProps = Omit<RadixCheckboxProps, "color"> & {
  className?: string;
};

export type CheckboxProps = BaseCheckboxProps & (SemanticProps | ColorProps);

export const Checkbox: React.FC<CheckboxProps> = ({
  semantic,
  color,
  className,
  ...restProps
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  return (
    <RadixCheckbox
      color={finalColor}
      className={className}
      {...restProps}
    />
  );
};
