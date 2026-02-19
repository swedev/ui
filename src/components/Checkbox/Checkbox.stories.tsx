import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    semantic: {
      control: "select",
      options: ["action", "info", "success", "warning", "error"],
    },
    size: { control: "select", options: ["1", "2", "3"] },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { semantic: "action", defaultChecked: true },
};

export const WithLabel: Story = {
  args: { semantic: "action", label: "Accept terms and conditions" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox semantic="action" size="1" label="Small" />
      <Checkbox semantic="action" size="2" label="Medium" />
      <Checkbox semantic="action" size="3" label="Large" />
    </div>
  ),
};

export const Semantics: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox semantic="action" label="Action" defaultChecked />
      <Checkbox semantic="success" label="Success" defaultChecked />
      <Checkbox semantic="warning" label="Warning" defaultChecked />
      <Checkbox semantic="error" label="Error" defaultChecked />
    </div>
  ),
};
