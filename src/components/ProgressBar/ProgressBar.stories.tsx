import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    semantic: {
      control: "select",
      options: ["action", "info", "success", "warning", "error", "pending"],
    },
    size: { control: "select", options: ["1", "2", "3"] },
    showText: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 65, semantic: "action" },
};

export const Complete: Story = {
  args: { value: 100, semantic: "success" },
};

export const WithText: Story = {
  args: { value: 75, semantic: "action", showText: true },
};

export const CustomText: Story = {
  args: { value: 42, semantic: "info", showText: true, text: "42 of 100 items" },
};

export const AllSemantics: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ProgressBar semantic="action" value={80} />
      <ProgressBar semantic="info" value={60} />
      <ProgressBar semantic="success" value={100} />
      <ProgressBar semantic="warning" value={40} />
      <ProgressBar semantic="error" value={15} />
      <ProgressBar semantic="pending" value={50} />
    </div>
  ),
};
