import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: {
    size: { control: "select", options: ["1", "2", "3"] },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {},
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "2026-03-15",
  },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState("2026-01-01");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <DatePicker value={date} onChange={setDate} />
        <div style={{ fontSize: 13, color: "var(--gray-11)" }}>
          Selected: {date}
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 240 }}>
      <DatePicker size="1" defaultValue="2026-01-15" />
      <DatePicker size="2" defaultValue="2026-01-15" />
      <DatePicker size="3" defaultValue="2026-01-15" />
    </div>
  ),
};
