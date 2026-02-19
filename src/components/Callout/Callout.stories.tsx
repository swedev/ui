import type { Meta, StoryObj } from "@storybook/react-vite";
import { Clock, ShieldAlert } from "lucide-react";
import { Callout } from "./Callout";

const meta: Meta<typeof Callout> = {
  title: "Components/Callout",
  component: Callout,
  argTypes: {
    semantic: {
      control: "select",
      options: [
        "action",
        "destructive",
        "neutral",
        "info",
        "success",
        "warning",
        "error",
        "danger",
        "pending",
        "valid",
        "invalid",
      ],
    },
    layout: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    dismissible: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Info: Story = {
  args: {
    semantic: "info",
    title: "Information",
    message: "This is an informational callout.",
  },
};

export const Success: Story = {
  args: {
    semantic: "success",
    title: "Payment registered",
    message: "The membership fee has been recorded.",
  },
};

export const Warning: Story = {
  args: {
    semantic: "warning",
    title: "Fee overdue",
    message: "The membership fee was due on January 31.",
  },
};

export const Error: Story = {
  args: {
    semantic: "error",
    title: "Import failed",
    message: "Could not parse the CSV file. Check the format and try again.",
  },
};

export const Pending: Story = {
  args: {
    semantic: "pending",
    title: "Awaiting approval",
    message: "The motion is pending board review.",
  },
};

export const CustomIcon: Story = {
  args: {
    semantic: "warning",
    icon: Clock,
    title: "Expires soon",
    message: "The banking consent expires in 3 days.",
  },
};

export const NoIcon: Story = {
  args: {
    semantic: "info",
    icon: null,
    title: "Note",
    message: "A callout without an icon.",
  },
};

export const Dismissible: Story = {
  args: {
    semantic: "info",
    title: "Tip",
    message: "You can dismiss this callout.",
    dismissible: true,
  },
};

export const AllSemantics: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Callout semantic="action" message="action" />
      <Callout semantic="destructive" message="destructive" />
      <Callout semantic="neutral" message="neutral" />
      <Callout semantic="info" message="info" />
      <Callout semantic="success" message="success" />
      <Callout semantic="warning" message="warning" />
      <Callout semantic="error" message="error" />
      <Callout semantic="danger" message="danger" />
      <Callout semantic="pending" message="pending" />
      <Callout semantic="valid" message="valid" />
      <Callout semantic="invalid" message="invalid" />
    </div>
  ),
};
