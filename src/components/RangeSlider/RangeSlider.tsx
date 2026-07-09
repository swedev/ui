import React from "react";
import type { SliderProps as RadixSliderProps } from "@radix-ui/themes";
import { Slider as RadixSlider } from "@radix-ui/themes";
import { getRadixColorForSemantic } from "../../theme/colors";
import type { ColorProps, SemanticProps } from "../../theme/types";

/**
 * Radix Slider takes `minStepsBetweenThumbs` (a count of *steps*), but callers
 * think in value units — "keep the thumbs at least 30 minutes apart" with a
 * 15-minute step → 2 steps. Ceil so the gap is honored even when `minGap` isn't
 * an exact multiple of `step`. Exported for unit testing.
 */
export function minStepsForGap(minGap: number, step: number): number {
  if (!(minGap > 0) || !(step > 0)) return 0;
  return Math.ceil(minGap / step);
}

type BaseRangeSliderProps = Omit<
  RadixSliderProps,
  "color" | "value" | "defaultValue" | "onValueChange"
> & {
  className?: string;
  /** Controlled two-thumb value. */
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  /** Minimum span between the two thumbs, in value units (converted to
   * `minStepsBetweenThumbs` internally). */
  minGap?: number;
};

export type RangeSliderProps = BaseRangeSliderProps & (SemanticProps | ColorProps);

/**
 * Two-thumb range slider — a thin, keyboard/ARIA-accessible wrapper over Radix
 * Slider (which supplies the pointer, keyboard and touch handling). Adds only a
 * `[from, to]` typed value and a value-unit `minGap`; the appearance is Radix's
 * default, matching {@link Slider}.
 */
export const RangeSlider: React.FC<RangeSliderProps> = ({
  semantic,
  color,
  value,
  defaultValue,
  onValueChange,
  minGap,
  step = 1,
  ...rest
}) => {
  const finalColor = semantic ? getRadixColorForSemantic(semantic) : color;
  const minStepsBetweenThumbs =
    minGap !== undefined ? minStepsForGap(minGap, step) : undefined;

  return (
    <RadixSlider
      color={finalColor}
      step={step}
      minStepsBetweenThumbs={minStepsBetweenThumbs}
      onValueChange={onValueChange as ((value: number[]) => void) | undefined}
      {...(value !== undefined ? { value } : {})}
      {...(defaultValue !== undefined ? { defaultValue } : {})}
      {...rest}
    />
  );
};
