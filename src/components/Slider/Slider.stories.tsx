import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  argTypes: {
    semantic: {
      control: "select",
      options: ["action", "info", "success", "warning", "error"],
    },
    size: { control: "select", options: ["1", "2", "3"] },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { semantic: "action", defaultValue: [50] },
};

export const Range: Story = {
  args: { semantic: "action", defaultValue: [25, 75] },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Slider semantic="action" size="1" defaultValue={[50]} />
      <Slider semantic="action" size="2" defaultValue={[50]} />
      <Slider semantic="action" size="3" defaultValue={[50]} />
    </div>
  ),
};

export const Semantics: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Slider semantic="action" defaultValue={[80]} />
      <Slider semantic="success" defaultValue={[100]} />
      <Slider semantic="warning" defaultValue={[40]} />
      <Slider semantic="error" defaultValue={[15]} />
    </div>
  ),
};
