import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    semantic: {
      control: "select",
      options: ["action", "info", "success", "warning", "error"],
    },
    size: { control: "select", options: ["1", "2", "3"] },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { semantic: "action", defaultChecked: true },
};

export const WithLabel: Story = {
  args: { semantic: "action", label: "Enable notifications" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch semantic="action" size="1" label="Small" />
      <Switch semantic="action" size="2" label="Medium" />
      <Switch semantic="action" size="3" label="Large" />
    </div>
  ),
};

export const Semantics: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch semantic="action" label="Action" defaultChecked />
      <Switch semantic="success" label="Success" defaultChecked />
      <Switch semantic="warning" label="Warning" defaultChecked />
      <Switch semantic="error" label="Error" defaultChecked />
    </div>
  ),
};
