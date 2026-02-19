import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
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
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: "Write meeting notes...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue:
      "Punkt 4: Styrelsen beslutade att hoja medlemsavgiften till 600 kr fran nasta ar.",
    rows: 4,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <TextArea variant="classic" placeholder="Classic" />
      <TextArea variant="surface" placeholder="Surface" />
      <TextArea variant="soft" placeholder="Soft" />
    </div>
  ),
};

export const Error: Story = {
  args: {
    semantic: "error",
    placeholder: "This field has an error",
  },
};
