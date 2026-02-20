import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus, Save, Trash2 } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
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
        "pending",
      ],
    },
    variant: {
      control: "select",
      options: ["solid", "soft", "surface", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["1", "2", "3", "4"],
    },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    semantic: "action",
    children: "Save",
  },
};

export const WithIcon: Story = {
  args: {
    semantic: "action",
    icon: Save,
    text: "Save changes",
  },
};

export const IconRight: Story = {
  args: {
    semantic: "action",
    icon: Plus,
    iconPosition: "right",
    text: "Add item",
  },
};

export const Destructive: Story = {
  args: {
    semantic: "destructive",
    icon: Trash2,
    text: "Delete",
  },
};

export const Loading: Story = {
  args: {
    semantic: "action",
    icon: Save,
    loading: true,
    text: "Saving...",
  },
};

export const AsLink: Story = {
  args: {
    semantic: "action",
    href: "#example",
    text: "Go somewhere",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Button semantic="action" variant="solid">Solid</Button>
      <Button semantic="action" variant="soft">Soft</Button>
      <Button semantic="action" variant="surface">Surface</Button>
      <Button semantic="action" variant="outline">Outline</Button>
      <Button semantic="action" variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Button semantic="action" size="1">Small</Button>
      <Button semantic="action" size="2">Medium</Button>
      <Button semantic="action" size="3">Large</Button>
      <Button semantic="action" size="4">XL</Button>
    </div>
  ),
};

export const AllSemantics: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button semantic="action">action</Button>
      <Button semantic="destructive">destructive</Button>
      <Button semantic="neutral">neutral</Button>
      <Button semantic="info">info</Button>
      <Button semantic="success">success</Button>
      <Button semantic="warning">warning</Button>
      <Button semantic="error">error</Button>
      <Button semantic="pending">pending</Button>
    </div>
  ),
};
