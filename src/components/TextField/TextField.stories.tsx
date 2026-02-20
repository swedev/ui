import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search, Mail, User } from "lucide-react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField.Root> = {
  title: "Components/TextField",
  component: TextField.Root,
  argTypes: {
    semantic: {
      control: "select",
      options: ["action", "info", "success", "warning", "error"],
    },
    variant: { control: "select", options: ["classic", "surface", "soft"] },
    size: { control: "select", options: ["1", "2", "3"] },
  },
};

export default meta;
type Story = StoryObj<typeof TextField.Root>;

export const Default: Story = {
  args: { placeholder: "Enter text..." },
};

export const WithIcon: Story = {
  render: () => (
    <TextField.Root placeholder="Search members...">
      <TextField.Slot>
        <Search size={14} />
      </TextField.Slot>
    </TextField.Root>
  ),
};

export const Email: Story = {
  render: () => (
    <TextField.Root type="email" placeholder="name@example.com">
      <TextField.Slot>
        <Mail size={14} />
      </TextField.Slot>
    </TextField.Root>
  ),
};

export const WithSlots: Story = {
  render: () => (
    <TextField.Root placeholder="Full name">
      <TextField.Slot>
        <User size={14} />
      </TextField.Slot>
    </TextField.Root>
  ),
};

export const Error: Story = {
  render: () => (
    <TextField.Root
      semantic="error"
      placeholder="Invalid email"
      defaultValue="not-an-email"
    >
      <TextField.Slot>
        <Mail size={14} />
      </TextField.Slot>
    </TextField.Root>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <TextField.Root variant="classic" placeholder="Classic" />
      <TextField.Root variant="surface" placeholder="Surface" />
      <TextField.Root variant="soft" placeholder="Soft" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <TextField.Root size="1" placeholder="Small">
        <TextField.Slot><Search size={12} /></TextField.Slot>
      </TextField.Root>
      <TextField.Root size="2" placeholder="Medium">
        <TextField.Slot><Search size={14} /></TextField.Slot>
      </TextField.Root>
      <TextField.Root size="3" placeholder="Large">
        <TextField.Slot><Search size={16} /></TextField.Slot>
      </TextField.Root>
    </div>
  ),
};
