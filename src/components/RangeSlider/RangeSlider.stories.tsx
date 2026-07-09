import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RangeSlider } from "./RangeSlider";

const meta: Meta<typeof RangeSlider> = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  argTypes: {
    semantic: {
      control: "select",
      options: ["action", "info", "success", "warning", "error"],
    },
    size: { control: "select", options: ["1", "2", "3"] },
  },
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

/** Controlled two-thumb value with a value-unit `minGap` — here a 06:00–22:00
 * canvas, 15-min step, kept at least 30 min apart. */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([540, 1020]);
    const fmt = (m: number) =>
      `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    return (
      <div style={{ width: 320 }}>
        <div style={{ marginBottom: 8, fontFamily: "monospace" }}>
          {fmt(value[0])}–{fmt(value[1])}
        </div>
        <RangeSlider
          semantic="success"
          min={360}
          max={1320}
          step={15}
          minGap={30}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};

/** Uncontrolled with a custom step and min gap. */
export const CustomStepAndGap: Story = {
  args: {
    semantic: "action",
    min: 0,
    max: 100,
    step: 5,
    minGap: 20,
    defaultValue: [20, 60],
  },
};

/** Semantic color variants. */
export const Semantics: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: 320 }}>
      <RangeSlider semantic="action" min={0} max={100} defaultValue={[20, 80]} />
      <RangeSlider semantic="success" min={0} max={100} defaultValue={[30, 70]} />
      <RangeSlider semantic="warning" min={0} max={100} defaultValue={[40, 60]} />
      <RangeSlider semantic="error" min={0} max={100} defaultValue={[10, 50]} />
    </div>
  ),
};

/** Disabled. */
export const Disabled: Story = {
  args: {
    semantic: "action",
    min: 0,
    max: 100,
    defaultValue: [25, 75],
    disabled: true,
  },
};
