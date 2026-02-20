import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, Flex } from "@radix-ui/themes";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    semantic: {
      control: "select",
      options: ["action", "info", "success", "warning", "error"],
    },
    size: { control: "select", options: ["1", "2", "3"] },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { semantic: "action", defaultChecked: true },
};

export const WithLabel: Story = {
  render: () => (
    <Text as="label">
      <Flex gap="2" align="center">
        <Switch semantic="action" /> Enable notifications
      </Flex>
    </Text>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch semantic="action" size="1" />
      <Switch semantic="action" size="2" />
      <Switch semantic="action" size="3" />
    </div>
  ),
};

export const Semantics: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch semantic="action" defaultChecked />
      <Switch semantic="success" defaultChecked />
      <Switch semantic="warning" defaultChecked />
      <Switch semantic="error" defaultChecked />
    </div>
  ),
};
