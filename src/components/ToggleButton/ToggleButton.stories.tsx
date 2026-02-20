import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { List, LayoutGrid, Table2, Clock } from "lucide-react";
import { ToggleButton } from "./ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  title: "Components/ToggleButton",
  component: ToggleButton,
  argTypes: {
    active: { control: "boolean" },
    semantic: {
      control: "select",
      options: ["action", "info", "success", "warning", "error"],
    },
    variant: {
      control: "select",
      options: ["solid", "soft", "surface", "outline", "ghost"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  args: {
    semantic: "action",
    active: true,
    text: "Active",
  },
};

export const Inactive: Story = {
  args: {
    semantic: "action",
    active: false,
    text: "Inactive",
  },
};

export const WithIcon: Story = {
  args: {
    semantic: "action",
    active: true,
    icon: List,
    text: "List view",
  },
};

const ViewToggleDemo = () => {
  const [view, setView] = useState<"list" | "grid" | "table">("list");
  return (
    <div className="flex gap-1">
      <ToggleButton
        semantic="action"
        active={view === "list"}
        icon={List}
        text="List"
        onClick={() => setView("list")}
      />
      <ToggleButton
        semantic="action"
        active={view === "grid"}
        icon={LayoutGrid}
        text="Grid"
        onClick={() => setView("grid")}
      />
      <ToggleButton
        semantic="action"
        active={view === "table"}
        icon={Table2}
        text="Table"
        onClick={() => setView("table")}
      />
    </div>
  );
};

export const ViewToggleGroup: Story = {
  render: () => <ViewToggleDemo />,
};
