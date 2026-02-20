import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";
import { LabelledCheckbox } from "./LabelledCheckbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    semantic: {
      control: "select",
      options: ["action", "info", "success", "warning", "error"],
    },
    size: { control: "select", options: ["1", "2", "3"] },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { semantic: "action", defaultChecked: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox semantic="action" size="1" />
      <Checkbox semantic="action" size="2" />
      <Checkbox semantic="action" size="3" />
    </div>
  ),
};

export const WithLabel: StoryObj<typeof LabelledCheckbox> = {
  render: () => (
    <LabelledCheckbox semantic="action" label="Accept terms and conditions" />
  ),
};

export const LabelledSizes: StoryObj<typeof LabelledCheckbox> = {
  render: () => (
    <div className="flex flex-col gap-3">
      <LabelledCheckbox semantic="action" size="1" label="Small" />
      <LabelledCheckbox semantic="action" size="2" label="Medium" />
      <LabelledCheckbox semantic="action" size="3" label="Large" />
    </div>
  ),
};

export const LabelledSemantics: StoryObj<typeof LabelledCheckbox> = {
  render: () => (
    <div className="flex flex-col gap-3">
      <LabelledCheckbox semantic="action" label="Action" defaultChecked />
      <LabelledCheckbox semantic="success" label="Success" defaultChecked />
      <LabelledCheckbox semantic="warning" label="Warning" defaultChecked />
      <LabelledCheckbox semantic="error" label="Error" defaultChecked />
    </div>
  ),
};
