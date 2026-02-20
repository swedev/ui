import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Clock } from "lucide-react";
import { Callout } from "./Callout";
import { Button } from "../Button/Button";

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

export const CustomIcon: Story = {
  args: {
    semantic: "warning",
    icon: <Clock size={18} />,
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
    semantic: "success",
    children: "The thing you did was successful",
    dismissible: true,
  },
};

export const VerticalNeutral: Story = {
  args: {
    semantic: "neutral",
    variant: "soft",
    layout: "vertical",
    title: "No files found",
    message: "Upload files by using the form on the right.",
    className: "w-[400px]",
  },
};

export const VerticalWithActions: Story = {
  args: {
    semantic: "warning",
    layout: "vertical",
    message: "There is something you need to pay attention to. Make sure you know what you are doing.",
    className: "w-[400px]",
    actions: (
      <div className="flex gap-2 justify-end">
        <Button variant="outline">Ignore</Button>
        <Button semantic="action">Take Action</Button>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Callout semantic="info" variant="surface">Surface variant</Callout>
      <Callout semantic="info" variant="soft">Soft variant</Callout>
      <Callout semantic="info" variant="outline">Outline variant</Callout>
    </div>
  ),
};

export const AllSemantics: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
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
