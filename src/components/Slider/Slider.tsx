import React from "react";
import type { SliderProps as RadixSliderProps } from "@radix-ui/themes";
import { Slider as RadixSlider } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type BaseSliderProps = Omit<RadixSliderProps, "color"> & {
  className?: string;
};

export type SliderProps = BaseSliderProps & (SemanticProps | ColorProps);

export const Slider: React.FC<SliderProps> = ({
  semantic,
  color,
  className,
  ...restProps
}) => {
  if (semantic) {
    color = getRadixColorForSemantic(semantic);
  }

  return (
    <RadixSlider
      color={color}
      className={className}
      {...restProps}
    />
  );
};
