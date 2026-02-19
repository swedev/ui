import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search, Mail, User } from "lucide-react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
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
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: { placeholder: "Enter text..." },
};

export const WithIcon: Story = {
  args: { icon: Search, placeholder: "Search members..." },
};

export const Email: Story = {
  args: {
    icon: Mail,
    type: "email",
    placeholder: "name@example.com",
  },
};

export const WithName: Story = {
  args: {
    icon: User,
    placeholder: "Full name",
  },
};

export const Error: Story = {
  args: {
    semantic: "error",
    icon: Mail,
    placeholder: "Invalid email",
    defaultValue: "not-an-email",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <TextField variant="classic" placeholder="Classic" />
      <TextField variant="surface" placeholder="Surface" />
      <TextField variant="soft" placeholder="Soft" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <TextField size="1" placeholder="Small" icon={Search} />
      <TextField size="2" placeholder="Medium" icon={Search} />
      <TextField size="3" placeholder="Large" icon={Search} />
    </div>
  ),
};
