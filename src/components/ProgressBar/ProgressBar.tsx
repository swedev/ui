import React from "react";
import { Progress } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type RadixProgressProps = ComponentProps<typeof Progress>;

type BaseProgressBarProps = Omit<RadixProgressProps, "color"> & {
  value: number;
  max?: number;
};

export type ProgressBarProps = BaseProgressBarProps &
  (SemanticProps | ColorProps);

export const ProgressBar: React.FC<ProgressBarProps> = ({
  semantic,
  color,
  value,
  max = 100,
  ...rest
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  return <Progress color={finalColor} value={value} max={max} {...rest} />;
};
