import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
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
    variant: {
      control: "select",
      options: ["solid", "soft", "surface", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    semantic: "info",
    children: "Info",
  },
};

export const Success: Story = {
  args: {
    semantic: "success",
    children: "Paid",
  },
};

export const Warning: Story = {
  args: {
    semantic: "warning",
    children: "Overdue",
  },
};

export const Pending: Story = {
  args: {
    semantic: "pending",
    children: "Waitlist",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge semantic="success" variant="solid">Solid</Badge>
      <Badge semantic="success" variant="soft">Soft</Badge>
      <Badge semantic="success" variant="surface">Surface</Badge>
      <Badge semantic="success" variant="outline">Outline</Badge>
    </div>
  ),
};

export const AllSemantics: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge semantic="action">action</Badge>
      <Badge semantic="destructive">destructive</Badge>
      <Badge semantic="neutral">neutral</Badge>
      <Badge semantic="info">info</Badge>
      <Badge semantic="success">success</Badge>
      <Badge semantic="warning">warning</Badge>
      <Badge semantic="error">error</Badge>
      <Badge semantic="danger">danger</Badge>
      <Badge semantic="pending">pending</Badge>
      <Badge semantic="valid">valid</Badge>
      <Badge semantic="invalid">invalid</Badge>
    </div>
  ),
};
