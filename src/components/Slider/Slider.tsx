import React from "react";
import { Slider as RadixSlider } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

type RadixSliderProps = ComponentProps<typeof RadixSlider>;

type BaseSliderProps = Omit<RadixSliderProps, "color">;

export type SliderProps = BaseSliderProps & (SemanticProps | ColorProps);

export const Slider: React.FC<SliderProps> = ({
  semantic,
  color,
  ...rest
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;

  return <RadixSlider color={finalColor} {...rest} />;
};
