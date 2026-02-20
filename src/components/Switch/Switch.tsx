import React from "react";
import type { SwitchProps as RadixSwitchProps } from "@radix-ui/themes";
import { Switch as RadixSwitch } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type BaseSwitchProps = Omit<RadixSwitchProps, "color"> & {
  className?: string;
};

export type SwitchProps = BaseSwitchProps & (SemanticProps | ColorProps);

export const Switch: React.FC<SwitchProps> = ({
  semantic,
  color,
  className,
  ...restProps
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  return (
    <RadixSwitch
      color={finalColor}
      className={className}
      {...restProps}
    />
  );
};
