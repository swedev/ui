import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleButton } from "./ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  title: "Components/ToggleButton",
  component: ToggleButton,
  argTypes: {
    size: { control: "select", options: ["1", "2", "3"] },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  args: {
    defaultValue: "list",
    options: [
      { value: "list", label: "List" },
      { value: "grid", label: "Grid" },
    ],
  },
};

export const ThreeOptions: Story = {
  args: {
    defaultValue: "all",
    options: [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
};

export const ViewModes: Story = {
  args: {
    defaultValue: "table",
    options: [
      { value: "table", label: "Table" },
      { value: "cards", label: "Cards" },
      { value: "timeline", label: "Timeline" },
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ToggleButton
        size="1"
        defaultValue="a"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ]}
      />
      <ToggleButton
        size="2"
        defaultValue="a"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ]}
      />
      <ToggleButton
        size="3"
        defaultValue="a"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ]}
      />
    </div>
  ),
};
