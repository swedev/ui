import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    placeholder: "Select date...",
  },
};

export const WithValue: Story = {
  args: {
    value: new Date(2026, 2, 15),
    placeholder: "Select date...",
  },
};

export const Controlled: Story = {
  render: () => {
    const ControlledDemo = () => {
      const [date, setDate] = useState<Date | null>(new Date(2026, 0, 1));
      return (
        <div className="flex flex-col gap-2">
          <DatePicker
            value={date}
            onChange={setDate}
            placeholder="Select date..."
          />
          <span className="text-[13px] text-[var(--gray-11)]">
            Selected: {date ? date.toISOString().slice(0, 10) : "(none)"}
          </span>
        </div>
      );
    };
    return <ControlledDemo />;
  },
};

export const Disabled: Story = {
  args: {
    value: new Date(2026, 0, 15),
    disabled: true,
    placeholder: "Select date...",
  },
};
