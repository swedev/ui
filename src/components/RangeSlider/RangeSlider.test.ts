import { describe, expect, it } from "vitest";
import { minStepsForGap } from "./RangeSlider";

describe("minStepsForGap", () => {
  it("converts value-unit gap to whole steps (15-min step, 30-min gap → 2)", () => {
    expect(minStepsForGap(30, 15)).toBe(2);
  });

  it("ceils so the gap is always honored for non-multiples", () => {
    expect(minStepsForGap(20, 15)).toBe(2); // 20/15 = 1.33 → 2 steps (30 ≥ 20)
    expect(minStepsForGap(31, 15)).toBe(3); // 31/15 = 2.07 → 3 steps
  });

  it("handles an exact multiple and a step of 1", () => {
    expect(minStepsForGap(45, 15)).toBe(3);
    expect(minStepsForGap(5, 1)).toBe(5);
  });

  it("returns 0 for non-positive inputs", () => {
    expect(minStepsForGap(0, 15)).toBe(0);
    expect(minStepsForGap(30, 0)).toBe(0);
    expect(minStepsForGap(-30, 15)).toBe(0);
  });
});
