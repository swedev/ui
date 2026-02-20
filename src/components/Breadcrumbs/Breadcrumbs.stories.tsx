import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home, Settings, User } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { text: "Home", href: "#" },
      { text: "Settings", href: "#" },
      { text: "Profile" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { text: "Home", href: "#", icon: Home },
      { text: "Settings", href: "#", icon: Settings },
      { text: "Profile", icon: User },
    ],
  },
};
