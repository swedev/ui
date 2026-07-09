import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkles, X } from "lucide-react";
import { SegmentedControl } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  argTypes: {
    size: { control: "select", options: ["1", "2", "3"] },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

/** Text-only, controlled. */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("aktiva");
    return (
      <SegmentedControl
        {...args}
        value={value}
        onValueChange={setValue}
        items={[
          { value: "alla", label: "Alla" },
          { value: "aktiva", label: "Aktiva" },
          { value: "arkiverade", label: "Arkiverade" },
        ]}
      />
    );
  },
};

/** With leading icons. */
export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState("want");
    return (
      <SegmentedControl
        value={value}
        onValueChange={setValue}
        items={[
          { value: "want", label: "Vill jobba", icon: Sparkles },
          { value: "cannot", label: "Kan inte", icon: X },
        ]}
      />
    );
  },
};

/** With trailing count chips (filter-tab style). */
export const WithCounts: Story = {
  render: () => {
    const [value, setValue] = useState("aktiva");
    return (
      <SegmentedControl
        value={value}
        onValueChange={setValue}
        items={[
          { value: "alla", label: "Alla", count: 12 },
          { value: "aktiva", label: "Aktiva", count: 10 },
          { value: "arkiverade", label: "Arkiverade", count: 2 },
        ]}
      />
    );
  },
};

/** Sizes 1–3. */
export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState("b");
    const items = [
      { value: "a", label: "Ett" },
      { value: "b", label: "Två" },
      { value: "c", label: "Tre" },
    ];
    return (
      <div className="flex flex-col gap-4">
        <SegmentedControl size="1" value={value} onValueChange={setValue} items={items} />
        <SegmentedControl size="2" value={value} onValueChange={setValue} items={items} />
        <SegmentedControl size="3" value={value} onValueChange={setValue} items={items} />
      </div>
    );
  },
};
